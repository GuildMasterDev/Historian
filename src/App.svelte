<script lang="ts">
  import { onMount } from 'svelte';
  import SearchBar from './components/SearchBar.svelte';
  import CategorySection from './components/CategorySection.svelte';
  import { loadResources, type Category } from './lib/resources';

  let categories: Category[] = [];
  let filteredCategories: Category[] = [];
  let searchTerm: string = '';
  let isDarkMode: boolean = false;

  onMount(async () => {
    categories = await loadResources();
    filteredCategories = categories;
    
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    isDarkMode = savedDarkMode === 'true';
    updateDarkMode();
  });

  function handleSearch(event: CustomEvent<string>) {
    searchTerm = event.detail.toLowerCase();
    
    if (searchTerm === '') {
      filteredCategories = categories;
    } else {
      filteredCategories = categories.map(category => ({
        ...category,
        resources: category.resources.filter(resource =>
          resource.title.toLowerCase().includes(searchTerm) ||
          resource.description.toLowerCase().includes(searchTerm) ||
          resource.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        )
      })).filter(category => category.resources.length > 0);
    }
  }

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode.toString());
    updateDarkMode();
  }

  function updateDarkMode() {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
</script>

<main class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
  <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <svg class="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Historian</h1>
        </div>
        
        <div class="flex items-center space-x-4">
          <SearchBar on:search={handleSearch} />
          
          <button
            on:click={toggleDarkMode}
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {#if isDarkMode}
              <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
            {:else}
              <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            {/if}
          </button>
        </div>
      </div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {#if filteredCategories.length === 0}
      <div class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No resources found</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your search terms.
        </p>
      </div>
    {:else}
      <div class="space-y-8">
        {#each filteredCategories as category}
          <CategorySection {category} />
        {/each}
      </div>
    {/if}
  </div>

  <footer class="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <p class="text-center text-sm text-gray-500 dark:text-gray-400">
        Historian &copy; 2025 - MIT Licensed
      </p>
    </div>
  </footer>
</main>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
  
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>