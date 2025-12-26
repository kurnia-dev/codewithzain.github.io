/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#135bec",
        "primary-dark": "#0f4bc4",
        "background-light": "#ffffff",
        "background-offset": "#f8f9fc",
        "background-dark": "#111722",
        "surface-light": "#ffffff",
        "surface-dark": "#192233",
        "surface-hover": "#f3f4f6",
        "border-light": "#e5e7eb",
        "border-dark": "#232f48",
        "text-primary": "#111827",
        "text-secondary": "#4b5563",
        "text-tertiary": "#9ca3af",
        "text-secondary-dark": "#92a4c9",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem", 
        "lg": "0.5rem", 
        "xl": "0.75rem", 
        "full": "9999px"
      },
    },
  },
}