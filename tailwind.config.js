const {colors} = require('tailwindcss/defaultTheme')

module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            p: '#f9f7f7',
            s: '#dbe2ef',
        },
        textColor: {
            p: '#112d4e',
            s: '#696969',
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
