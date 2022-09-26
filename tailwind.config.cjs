/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            text: '#434141',
            placeholder: 'rgba(0, 0, 0, 0.5)',
            additional: '#93b1ff',
            additional7: 'rgba(147, 177, 255, 0.7)',
            'bg-calendar': '#ebeded',
            'bg-calendar-header': '#c2c2c2',
            red: 'tomato'
        },
        extend: {}
    },
    plugins: []
};
