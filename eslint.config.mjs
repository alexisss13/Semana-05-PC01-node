import js from '@eslint/js'
import globals from 'globals'
import prettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import json from '@eslint/json'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, prettier: eslintPluginPrettier },
    extends: ['js/recommended', prettier],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        bootstrap: 'readonly',
        showToast: 'readonly',
      },
    },
    rules: {
      'prettier/prettier': ['warn'],
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
])
