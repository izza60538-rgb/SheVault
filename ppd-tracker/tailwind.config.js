/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                sage: {
                    50: '#f4f7f4',
                    100: '#e3ebe3',
                    200: '#c5d6c5',
                    300: '#9eb89e',
                    400: '#7a9e7a',
                    500: '#5c805c', // Primary Sage
                    600: '#466646',
                    700: '#395239',
                },
                lavender: {
                    50: '#fbf7fa',
                    100: '#f5ecf3',
                    200: '#ebdae8',
                    300: '#decce6', // Soft Lavender
                    400: '#c4a6d1',
                    500: '#a882b5',
                    600: '#8c6396',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
