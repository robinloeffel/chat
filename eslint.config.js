import sweet from "eslint-config-sweet";
import svelte from "eslint-plugin-svelte";
import ts from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...sweet,
  ...svelte.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    },
    rules: {
      // disables
      "@typescript-eslint/init-declarations": "off",
      "unicorn/prevent-abbreviations": "off",
      "no-underscore-dangle": "off",

      // svelte
      "svelte/no-dom-manipulating": "error",
      "svelte/no-dupe-on-directives": "error",
      "svelte/no-dupe-use-directives": "error",
      "svelte/no-target-blank": "error",
      "svelte/no-raw-special-elements": "error",
      "svelte/no-useless-children-snippet": "error",
      "svelte/no-useless-mustaches": "error",
      "svelte/button-has-type": "error",
      "svelte/prefer-const": "error",
      "svelte/block-lang": [
        "error",
        {
          script: "ts",
          style: "scss"
        }
      ],
      "svelte/indent": "error",
      "svelte/first-attribute-linebreak": "error",
      "svelte/html-closing-bracket-new-line": "error",
      "svelte/html-closing-bracket-spacing": "error",
      "svelte/html-quotes": "error",
      "svelte/html-self-closing": "error",
      "svelte/mustache-spacing": "error",
      "svelte/no-extra-reactive-curlies": "error",
      "svelte/no-spaces-around-equal-signs-in-attribute": "error",
      "svelte/prefer-class-directive": "error",
      "svelte/prefer-style-directive": "error",
      "svelte/shorthand-attribute": "error",
      "svelte/shorthand-directive": "error",
      "svelte/sort-attributes": "error",
      "svelte/spaced-html-comment": "error"
    }
  }
];
