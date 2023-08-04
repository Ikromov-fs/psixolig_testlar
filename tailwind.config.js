module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sx: "320px",
        xs: "375px",
        sm: "576px",
        ss: "650px",
        md: "768px",
        mmd: "800px",
        lg: "992px",
        xl: "1200px",
        xxl: "1536px",
      },
    },
  },
  plugins: [],
};
