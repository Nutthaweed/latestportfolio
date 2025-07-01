/** @type {import("prettier").Config} */
const options = {
  plugins: ['prettier-plugin-astro'],
  astroAllowShorthand: true,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
}

module.exports = options
