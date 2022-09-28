/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            title: '#ebeded',
            text: '#434141',
            'text-alt': '#797575',
            primary: '#212020',
            accent: 'tomato',

            additional: '#93b1ff',
            additional7: 'rgba(147, 177, 255, 0.7)'
        },
        extend: {}
    },
    plugins: []
};
