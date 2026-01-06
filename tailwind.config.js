/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./index.tsx"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1e3a8a', // Deep blue from Layout.tsx
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#f3f4f6', // Light gray background
                    foreground: '#1f2937',
                },
                foreground: '#1f2937', // Dark gray text
                border: '#e5e7eb', // Light border
            },
            borderRadius: {
                lg: '0.5rem',
            },
        },
    },
    plugins: [],
}
