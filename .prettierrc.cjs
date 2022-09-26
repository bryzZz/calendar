module.exports = {
    printWidth: 100,
    trailingComma: 'none',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    jsxSingleQuote: true,
    arrowParens: 'always',
    useTabs: false,
    plugins: [require('prettier-plugin-tailwindcss')],
    tailwindConfig: './tailwind.config.cjs'
};
