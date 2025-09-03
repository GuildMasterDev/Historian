const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting development server...\n');

// Start Tailwind CSS watcher
console.log('👁️  Watching Tailwind CSS...');
const tailwindProcess = spawn('npm', ['run', 'watch:css'], {
  stdio: 'inherit',
  shell: true
});

// Give Tailwind a moment to start, then start Rollup
setTimeout(() => {
  console.log('👁️  Watching Svelte/TypeScript files...');
  const rollupProcess = spawn('rollup', ['-c', '-w'], {
    stdio: 'inherit',
    shell: true
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping development server...');
    tailwindProcess.kill();
    rollupProcess.kill();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    tailwindProcess.kill();
    rollupProcess.kill();
    process.exit(0);
  });
}, 2000);

console.log('\n💡 Development server is running!');
console.log('📝 Edit files in src/ to see changes');
console.log('🔄 Both CSS and JS will auto-reload\n');