import { error } from "console"
import { symbol } from "d3"
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      'header': ['1.5rem', {
        lineHeight: '2rem',
        letterSpacing: '-0.01em',
        fontWeight: '500',
      }],
      'title': ['1.25rem', {
        lineHeight: '1.5rem',
        letterSpacing: '-0.01em',
        fontWeight: '500',
      }],
      'subtitle': ['1.125rem', {
        lineHeight: '1.5rem',
        letterSpacing: '-0.01em',
        fontWeight: '500',
      }],
      'body': ['1rem', {
        lineHeight: '1.5rem',
        fontWeight: '400',
      }],
      'body-500': ['1rem', {
        lineHeight: '1.5rem',
        fontWeight: '500',
      }],
      'link': ['0.875rem', {
        lineHeight: '1.25rem',
        fontWeight: '500',
      }],
      'sec': ['0.875rem', {
        lineHeight: '1rem',
        fontWeight: '400',
      }],
      'caption': ['0.813rem', {
        lineHeight: '1rem',
        fontWeight: '500',
      }],
      'symbol-caption': ['0.8rem', {
        lineHeight: '1rem',
        fontWeight: '500',
      }],
    },
    extend: {
      colors: {
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          background: "hsl(var(--primary-background))",
          body: "hsla(var(--primary-body))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          background: "hsl(var(--secondary-background))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
          background: "hsl(var(--tertiary-background))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        text: {
          primary: "hsla(var(--text-primary))",
          body: "hsla(var(--text-body))",
          secondary: "hsla(var(--text-secondary))",
          tertiary: "hsla(var(--text-tertiary))",
          brand: "hsla(var(--text-brand))",
          invert: "hsla(var(--text-invert))",
          interactive: {
            disabled: "hsla(var(--text-disabled))",
            active: "hsla(var(--text-interactive-active))",
            error: "hsla(var(--text-interactive-error))",
            valid: "hsla(var(--text-interactive-valid))",
          },
        },
        border: {
          DEFAULT: "hsla(var(--border))",
          primary: "hsla(var(--border-primary))",
          secondary: "hsla(var(--border-secondary))",
          interactive: {
            hover: "hsla(var(--border-interactive-hover))",
            selected: "hsla(var(--border-interactive-selected))",
            focus: "hsla(var(--border-interactive-focus))",
            disabled: "hsla(var(--border-interactive-disabled))",
            active: "hsla(var(--border-interactive-active))",
            error: "hsla(var(--border-interactive-error))",
            valid: "hsla(var(--border-interactive-valid))",
          },
        },
        background: {
          DEFAULT: "hsla(var(--background))",
          primary: "hsla(var(--background-primary))",
          secondary: "hsla(var(--background-secondary))",
          tertiary: "hsla(var(--background-tertiary))",
          white: "hsla(var(--background-white))",
          interactive: {
            hover: "hsla(var(--background-interactive-hover))",
            selected: "hsla(var(--background-interactive-selected))",
            pressed: "hsla(var(--background-interactive-pressed))",
            disabled: "hsla(var(--background-interactive-disabled))",
            active: "hsla(var(--background-interactive-active))",
            error: "hsla(var(--background-interactive-error))",
            valid: "hsla(var(--background-interactive-valid))",
          },
          button: {
            brand: {
              DEFAULT: "hsla(var(--background-button-brand))",
              hover: "hsla(var(--background-button-brand-hover))",
              pressed: "hsla(var(--background-button-brand-pressed))",
              disabled: "hsla(var(--background-button-brand-disabled))",
            }
          },
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        symbol: 'IBM Plex Mono, ui-mono', // Adds a new `font-display` class
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config