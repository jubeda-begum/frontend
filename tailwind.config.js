/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        card: 'hsl(var(--background))',
        'card-foreground': 'hsl(var(--foreground))',
        border: 'hsl(var(--border))'
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem'
      },
      keyframes: {
        'score-drop': {
          '0%, 100%': { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-4px)' },
          '40%': { transform: 'translateY(4px)' },
          '60%': { transform: 'translateY(-2px)' },
          '80%': { transform: 'translateY(2px)' }
        }
      },
      animation: {
        'score-drop': 'score-drop 0.8s ease-in-out'
      }
    }
  },
  plugins: []
};

