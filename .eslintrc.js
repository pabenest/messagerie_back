module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['prettier', '@typescript-eslint', 'unused-imports', 'simple-import-sort', 'typescript-sort-keys'],
  extends: [
    'eslint:recommended',
    // default rules for import
    "plugin:import/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    // include prettier config which avoid conflict
    "prettier",
    // disable conflicting rules with plugin (not config!)
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
  },
  rules: {
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/order": "off",
    "import/no-default-export": "error",
    "import/no-extraneous-dependencies": "off",
    "import/no-internal-modules": "off",
    "import/newline-after-import": "error",
    "import/export": "off",
    "import/no-useless-path-segments": "warn",
    "import/no-absolute-path": "warn",
    "import/no-named-as-default": "off",
    "import/consistent-type-specifier-style": ["error", "prefer-inline"],
    "import/no-duplicates": ["error", { "prefer-inline": true }],
    "sort-import": "off",
    "prettier/prettier": [
      "error",
      {
        tabWidth: 2,
        trailingComma: "all",
        printWidth: 120,
        singleQuote: false,
        parser: "typescript",
        arrowParens: "avoid",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/sort-type-constituents": "warn",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error",
    "@typescript-eslint/no-namespace": "off",
    // handled by tsc already
    "import/no-unresolved": "off",
  }
};
