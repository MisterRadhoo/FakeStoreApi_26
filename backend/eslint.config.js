const js = require("@eslint/js");
const globals = require("globals");
const n = require("eslint-plugin-n");

module.exports = [
  js.configs.recommended,
  n.configs["flat/recommended"],
  {
    ignores: ["node_modules/**", "logs/**", "public/**", "mockData/**"],
  },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.node,
    },
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "^(err|val|res|next|req)$" }],
      "spaced-comment": "off",
      "no-console": "off",
      "consistent-return": "off",
      "func-names": "off",
      "object-shorthand": "off",
      "no-process-exit": "off",
      "no-param-reassign": "off",
      "no-return-await": "off",
      // can use identifier with _ , ex: _id, _next...
      "no-underscore-dangle": "off",
      "class-methods-use-this": "off",
      "no-undef": "error",
      "prefer-destructuring": ["off", { object: true, array: false }],
      "n/no-unpublished-require": "off",
    },
  },

  {
    files: ["src/**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
];
