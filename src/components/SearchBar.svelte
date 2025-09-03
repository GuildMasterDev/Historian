<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher<{ search: string }>();
  
  let searchValue: string = '';
  
  function handleInput() {
    dispatch('search', searchValue);
  }
  
  function clearSearch() {
    searchValue = '';
    dispatch('search', '');
  }
</script>

<div class="relative">
  <div class="relative">
    <input
      type="text"
      bind:value={searchValue}
      on:input={handleInput}
      placeholder="Search history resources..."
      class="w-64 pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
    />
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    {#if searchValue}
      <button
        on:click={clearSearch}
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <svg class="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    {/if}
  </div>
</div>