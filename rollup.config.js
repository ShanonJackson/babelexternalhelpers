import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import path from "path";
import commonjs from "rollup-plugin-commonjs";

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];
export default {
	input: ['src/index.ts'],
	preserveModules: false,
	output: [{
		dir: 'dist',
		sourcemapPathTransform: relativePath => {
			return path.relative('src', relativePath)
		},
		format: 'cjs',
		sourcemap: false
	}],
	external: [
		...Object.keys(pkg.peerDependencies || {}),
		...Object.keys(pkg.dependencies || {}),
	],
	plugins: [
		commonjs({
			include: "node_modules/**"
		}),
		resolve({ extensions }),
		babel({
			babelHelpers: "runtime",
			extensions,
			include: ["src/**/*"],
			exclude: "node_modules/**",
			presets: [
				["@babel/preset-env", {
					"targets": {"chrome": "58", "ie": "11"},
					"useBuiltIns": false
				}],
				"@babel/preset-react",
				"@babel/preset-typescript"
			],
			plugins: [
				["@babel/plugin-transform-runtime", {
					"absoluteRuntime": false,
					"corejs": false,
					"helpers": true,
					"regenerator": true,
					"useESModules": false,
					"version": "^7.8.3"
				}],
				"@babel/plugin-proposal-class-properties",
				"@babel/plugin-transform-classes",
				["@babel/plugin-proposal-optional-chaining", {
					"loose": true
				}]
			]
		})
	],

}
