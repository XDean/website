const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            ...colors,
            p: '#fafafa',
            s: '#f1f1f5',
        },
        textColor: {
            ...colors,
            p: '#112d4e',
            s: '#696969',
        },
        flexGrow: {
            DEFAULT: 1,
            '0': 0,
            '1': 1,
            '2': 2,
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
