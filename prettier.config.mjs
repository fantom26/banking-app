/** @type {import("prettier").Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const prettierConfig = {
  arrowParens: 'always',
  semi: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './app/[locale]/globals.css'
}

export default prettierConfig
