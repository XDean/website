const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const myColor = {
    0: {0: colors.white, ...colors.coolGray},
    1: {0: colors.white, ...colors.blue},
    2: {0: colors.white, ...colors.green},
}

module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        extend: {
            colors: myColor,
            textColor: myColor,
            minWidth: {
                ...defaultTheme.spacing,
            },
            maxWidth: {
                ...defaultTheme.spacing,
            }
        },
        flexGrow: {
            DEFAULT: 1,
            '0': 0,
            '1': 1,
            '2': 2,
        },
    },
    variants: {
        extend: {
            zIndex: ['hover', 'active'],
            scale: ['active']
        },
    },
    plugins: [],
}
