const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Starting build process...\n');

// Step 1: Clean build directory
console.log('📁 Cleaning build directory...');
const buildDir = path.join(__dirname, 'public', 'build');
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir, { recursive: true });

// Step 2: Build Tailwind CSS
console.log('🎨 Building Tailwind CSS...');
try {
  execSync('npx tailwindcss -i ./src/global.css -o ./public/build/bundle.css --minify', {
    stdio: 'inherit'
  });
  console.log('✅ Tailwind CSS build complete!\n');
} catch (error) {
  console.error('❌ Tailwind CSS build failed:', error.message);
  process.exit(1);
}

// Step 3: Build Svelte app with Rollup
console.log('⚡ Building Svelte application...');
try {
  execSync('rollup -c', {
    stdio: 'inherit'
  });
  console.log('✅ Svelte build complete!\n');
} catch (error) {
  console.error('❌ Svelte build failed:', error.message);
  process.exit(1);
}

console.log('🎉 Build completed successfully!');
console.log('📦 Output files:');
console.log('   - public/build/bundle.js');
console.log('   - public/build/bundle.css');
console.log('\n💡 Run "npm run electron" to start the app');