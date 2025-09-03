<script lang="ts">
  import type { Resource } from '../lib/resources';
  
  export let resource: Resource;
  
  let isFavorite: boolean = false;
  
  function openLink() {
    if (window.electronAPI && window.electronAPI.openExternal) {
      window.electronAPI.openExternal(resource.url);
    } else {
      window.open(resource.url, '_blank');
    }
  }
  
  function toggleFavorite() {
    isFavorite = !isFavorite;
    // TODO: Persist favorites to local storage
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200 dark:border-gray-700">
  {#if resource.thumbnail}
    <div class="h-32 bg-gradient-to-br from-indigo-400 to-purple-500 relative">
      <img 
        src={resource.thumbnail} 
        alt={resource.title}
        class="w-full h-full object-cover"
        on:error={(e) => e.currentTarget.style.display = 'none'}
      />
    </div>
  {:else}
    <div class="h-32 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
      <svg class="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
  {/if}
  
  <div class="p-4">
    <div class="flex items-start justify-between mb-2">
      <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
        {resource.title}
      </h3>
      <button
        on:click={toggleFavorite}
        class="ml-2 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Toggle favorite"
      >
        <svg class="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
    
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
      {resource.description}
    </p>
    
    <div class="flex flex-wrap gap-1 mb-3">
      {#each resource.tags.slice(0, 3) as tag}
        <span class="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
          {tag}
        </span>
      {/each}
      {#if resource.tags.length > 3}
        <span class="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
          +{resource.tags.length - 3}
        </span>
      {/if}
    </div>
    
    <button
      on:click={openLink}
      class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
    >
      <span>Visit Resource</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </button>
  </div>
</div>

<style>
  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>