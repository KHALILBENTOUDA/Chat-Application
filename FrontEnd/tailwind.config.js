/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },

      fontFamily: {
        'custom': ['PlusJakartaSans-VariableFont_wght', 'sans-serif'],
      },

      colors: {
        'full': ' rgba(59 130 246 / var(--tw-text-opacity)',
        'grn':'#8752f7',
        'lgrn':'#b849eb',
        'wive':'#181F2B',
        'bls':'rgb(53, 189, 242)',
        'Top':'#848786',
        'kfif':'#F6F8FA',
        'tex':'#212020ab',
        'ble':'#00E4E3',
        'lite_grn':'#9c6ce880',
        'cardColor':'rgb(255, 255, 255, 0.64)',
        'bodyColor':'#f0f5f9',
        'cardColor':'#f9fbfc',
        'notifi':'#b849eb11',
        'notifi2':'#b849eb3a',
        'app':'#e1e3fd'
       
      },

      keyframes:{
        maveRight:{
          '0%':{transform:'translateX(0)',},
          '50%':{transform:'translateX(15px)'},
          '0%':{transform:'translateX(0)'}
        }

      },
      animation:{
        maveRight:'maveRight 1.5s ease-in-out infinite'
      }

    },

  },
  plugins: [],
}