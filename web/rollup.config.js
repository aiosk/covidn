import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
// import url from '@rollup/plugin-url';
import { terser } from "rollup-plugin-terser";

const plugins = [
  resolve(),
  commonjs(),
  // url(),
  babel({ babelHelpers: "bundled" }),
];
if (!!process.env.BUILD && process.env.BUILD == "prod") {
  plugins.push(terser());
}

export default {
  input: "src/js/app.js",
  output: {
    file: "dist/js/app.js",
    format: "iife",
  },
  plugins,
};
