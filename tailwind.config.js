module.exports = {
  purge: [],
  theme: {
    extend: {
      spacing: {
        "72": "18rem",
        "80": "20rem",
      },
    },
    customForms: (theme) => ({
      default: {
        select: {},
        checkbox: {
          height: theme("spacing.6"),
          width: theme("spacing.6"),
          iconColor: theme("colors.white"),
        },
        radio: {
          height: theme("spacing.6"),
          width: theme("spacing.6"),
        },
      },
    }),
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
