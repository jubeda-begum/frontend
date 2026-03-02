/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(222.2 47.4% 11.2%)',
        muted: 'hsl(210 40% 96.1%)',
        'muted-foreground': 'hsl(215.4 16.3% 46.9%)',
        primary: {
          DEFAULT: 'hsl(221.2 83.2% 53.3%)',
          foreground: 'hsl(210 40% 98%)'
        },
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',
          foreground: 'hsl(210 40% 98%)'
        },
        card: 'hsl(0 0% 100%)',
        'card-foreground': 'hsl(222.2 47.4% 11.2%)',
        border: 'hsl(214.3 31.8% 91.4%)'
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

