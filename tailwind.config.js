const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            ...colors,
            p: '#f9f7f7',
            s: '#f7f5f5',
        },
        textColor: {
            ...colors,
            p: '#112d4e',
            s: '#696969',
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
