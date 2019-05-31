import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import history from "connect-history-api-fallback";
import proxy from "http-proxy-middleware";
import express from "express";
import { create as browserSyncFactory } from "browser-sync";

const production = !process.env.ROLLUP_WATCH;
const api = "/api";
const proxyTarget = "https://mfelten.dynv6.net/services/ci/";
const dist = "public";

export default {
	input: 'src/main.mjs',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: `${dist}/bundle.js`
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write(`${dist}/bundle.css`);
			}
		}),

		resolve(),
		commonjs(),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};


if (!production) {
	function browsersync() {
		const browserSync = browserSyncFactory();
		const app = express();

		app.use(
			api,
			proxy({
				target: proxyTarget,
				changeOrigin: true,
				logLevel: "debug"
			})
		);

		browserSync.init({
			server: dist,
			watch: true,
			middleware: [app, history()]
		});
	}

	setTimeout(() => {
		browsersync();
	}, 500);
}