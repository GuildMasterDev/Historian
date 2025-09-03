import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import sveltePreprocess from 'svelte-preprocess';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'electron-dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    postcss({
      extract: 'public/build/bundle.css',
      minimize: production,
      config: {
        path: './postcss.config.js'
      }
    }),
    svelte({
      preprocess: sveltePreprocess({
        typescript: {
          tsconfigFile: './tsconfig.json'
        },
        postcss: true
      }),
      compilerOptions: {
        dev: !production
      },
      emitCss: true
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production
    }),
    !production && serve(),
    !production && livereload('public'),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};