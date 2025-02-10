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
        animation: {
            'drawer-slide-in': 'slide-in 600ms forwards',
            'drawer-slide-out': 'slide-out 600ms forwards', // forwards is needed here otherwise after it slides off screen it flickers. Forwards keyword ensures that the component stays at its final state.
        },
        keyframes: {
            'slide-in': {
                from: {
                    transform: 'translateX(24rem)',
                },
                to: {
                    transform: 'translateX(0)',
                },
            },
            'slide-out': {
                from: {
                    transform: 'translateX(0)',
                },
                to: {
                    transform: 'translateX(24rem)',
                },
            },
        },
    },
    plugins: [],
};
