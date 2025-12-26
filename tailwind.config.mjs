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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'rgb(55 65 81)',
            lineHeight: '1.75',
            fontSize: '1.125rem',
            h1: {
              color: 'rgb(17 24 39)',
              fontWeight: '800',
              fontSize: '2.25rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h2: {
              color: 'rgb(17 24 39)',
              fontWeight: '700',
              fontSize: '1.875rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              color: 'rgb(17 24 39)',
              fontWeight: '600',
              fontSize: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            code: {
              color: 'rgb(19 91 236)',
              backgroundColor: 'rgb(243 244 246)',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'rgb(17 24 39)',
              color: 'rgb(229 231 235)',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflow: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0',
            },
            blockquote: {
              borderLeftColor: 'rgb(19 91 236)',
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              color: 'rgb(75 85 99)',
            },
            a: {
              color: 'rgb(19 91 236)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            'a:hover': {
              color: 'rgb(15 75 196)',
            },
          },
        },
        invert: {
          css: {
            color: 'rgb(209 213 219)',
            h1: {
              color: 'rgb(255 255 255)',
            },
            h2: {
              color: 'rgb(255 255 255)',
            },
            h3: {
              color: 'rgb(255 255 255)',
            },
            code: {
              color: 'rgb(96 165 250)',
              backgroundColor: 'rgb(31 41 55)',
            },
            pre: {
              backgroundColor: 'rgb(31 41 55)',
            },
            blockquote: {
              borderLeftColor: 'rgb(96 165 250)',
              color: 'rgb(156 163 175)',
            },
            a: {
              color: 'rgb(96 165 250)',
            },
            'a:hover': {
              color: 'rgb(147 197 253)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}