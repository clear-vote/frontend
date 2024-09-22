import { error } from "console"
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
    extend: {
      colors: {
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
          primary: "hsl(var(--text-primary))",
          body: "hsl(var(--text-body))",
          secondary: "hsl(var(--text-secondary))",
          tertiary: "hsl(var(--text-tertiary))",
          brand: "hsl(var(--text-brand))",
          interactive: {
            disabled: "hsl(var(--text-disabled))",
            active: "hsl(var(--text-interactive-active))",
            error: "hsl(var(--text-interactive-error))",
            valid: "hsl(var(--text-interactive-valid))",
          },
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          primary: "hsl(var(--border-primary))",
          secondary: "hsl(var(--border-secondary))",
          interactive: {
            hover: "hsl(var(--border-interactive-hover))",
            selected: "hsl(var(--border-interactive-selected))",
            focus: "hsl(var(--border-interactive-focus))",
            disabled: "hsl(var(--border-interactive-disabled))",
            active: "hsl(var(--border-interactive-active))",
            error: "hsl(var(--border-interactive-error))",
            valid: "hsl(var(--border-interactive-valid))",
          },
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          primary: "hsl(var(--background-primary))",
          secondary: "hsl(var(--background-secondary))",
          tertiary: "hsl(var(--background-tertiary))",
          interactive: {
            hover: "hsl(var(--background-interactive-hover))",
            selected: "hsl(var(--background-interactive-selected))",
            pressed: "hsl(var(--background-interactive-pressed))",
            disabled: "hsl(var(--background-interactive-disabled))",
            active: "hsl(var(--background-interactive-active))",
            error: "hsl(var(--background-interactive-error))",
            valid: "hsl(var(--background-interactive-valid))",
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
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config