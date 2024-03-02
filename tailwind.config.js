/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: { 
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        primary: {
          light: "var(--primary-light)",
          main: "var(--primary-main)",
          dark: "var(--primary-dark)",
        },
        secondary: {
          main: "var(--secondary-main)",
          light: "var(--secondary-light)",
        },
        status: {
          pending: "rgb(250 204 21)",
          progress: "rgb(74 222 128)",
          reject: "rgb(248 113 113)",
          verify : "rgb(5, 150, 105)",
          generate: "rgb(251 146 60)",
          done: "rgb(34 211 238)",
          cancelled : "rgb(0 0 0)"
        },
      },
      backgroundImage: {
        "form-bg": "url('src/assets/images/FormbgImg.png')",
      },
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        expand: {
          "0%": {
            innerWidth: "70px",
          },
          "100%": {
            innerWidth: "270px",
          },
        },
        translate: {
          "0%": {
            transform: "translateX(-50px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
