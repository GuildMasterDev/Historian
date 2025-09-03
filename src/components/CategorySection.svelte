<script lang="ts">
  import ResourceCard from './ResourceCard.svelte';
  import type { Category } from '../lib/resources';
  
  export let category: Category;
  
  let isExpanded: boolean = true;
</script>

<section class="mb-8">
  <button
    on:click={() => isExpanded = !isExpanded}
    class="w-full flex items-center justify-between mb-4 group"
  >
    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
      <span class="mr-2">{category.icon}</span>
      {category.name}
      <span class="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
        ({category.resources.length})
      </span>
    </h2>
    <svg
      class="w-5 h-5 text-gray-500 transform transition-transform {isExpanded ? 'rotate-180' : ''}"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  {#if isExpanded}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each category.resources as resource}
        <ResourceCard {resource} />
      {/each}
    </div>
  {/if}
</section>