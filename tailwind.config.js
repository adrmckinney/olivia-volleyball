/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                merriweather: ['Merriweather', 'serif'],
                'open-sans': ['Open Sans', 'sans-serif'],
                'playfair-display': ['Playfair Display', 'serif'],
                roboto: ['Roboto', 'sans-serif'],
                georgia: ['Georgia', 'serif'],
                lato: ['Lato', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
            screens: {
                '3xl': '1600px',
            },
        },
    },
    plugins: [],
};
