/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors:{
        'primary': '#050206', // gray
        'secondary': '#B38B59', //skin
        'tertiary': '#050206',  //black
        'background': '#FFFFFF', //white
      },
      backgroundImage: {
        // 'diagonal-gradient': 'linear-gradient(45deg, #113E21, #B38B59, #F0F0F0)',
        // 'radial-gradient': 'radial-gradient(circle, #113E21, #B38B59, #F0F0F0)',
        // 'vertical-gradient': 'linear-gradient(to bottom, #113E21, #B38B59, #F0F0F0)',
        // 'repeating-gradient': 'repeating-linear-gradient(45deg, #113E21, #B38B59 20%, #F0F0F0 40%)',
        // 'angular-gradient': 'conic-gradient(from 180deg, #113E21, #B38B59, #F0F0F0)',
        // 'multi-stop-gradient': 'linear-gradient(to right, #113E21 20%, #B38B59 60%, #F0F0F0)',

        'circular-gradient': 'linear-gradient(45deg ,#FFFFFF,#B38B59, #050206 )',




      },
    },
  },
  plugins: [],
}