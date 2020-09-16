module.exports = {
  purge: ["./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      spacing: {
        xs: "0.0625rem",
        "xs+": "0.94rem",
        28: "7.5rem",
        43: "10.82rem",
        72: "18rem",
        80: "20rem",
        88: "22rem",
        "1/11": "9%",
        "1/4": "25%",
      },
      height: {
        "screen-90": "90vh",
      },
      minWidth: {
        "1/4": "25%",
        "3/4": "75%",
      },
      maxWidth: {
        "xs-": "14rem",
        "xs--": "12rem",
        "xs+": "21rem",
        "3/4": "75%",
        "3/5": "60%",
      },
      inset: {
        22: "22px",
      },
      fontSize: {
        md: "1.0625rem",
      },
      borderWidth: {
        6: "6px",
      },
      transitionProperty: {
        input: "top, font-size",
      },
      boxShadow: {
        custom: "0px 1px 11px 0px rgba(0,0,0,0.75)",
        "modal-shadow": "0px 1px 22px 0px rgba(0,0,0,0.85)",
        "shadow-outline2": "0 0 0 3px rgba(0,0,0, 0.5);",
        "dropdown-shadow":
          "0 2px 5px 0 rgba(0,0,0,.26),0 2px 10px 0 rgba(0,0,0,.16);",
        "cancel-button":
          "0 1px 1px 0 rgba(0,0,0,.06),0 2px 5px 0 rgba(0,0,0,.2)",
      },
      colors: {
        "body-gradient-1": "#dddbd1",
        "body-gradient-2": "#d2dbdc",
        "green-messenger": "#aeffb1",
        "green-header": "rgb(0, 191, 165)",
        "green-title": "#009688",
        "green-room-info-admin": "rgba(7,188,76,0.7)",
        "green-link": "#07bc4c",
        "green-border": "#4adf83",
        "darker-gray": "#666c",
        "gray-sidebar-body": "#ededed",
        "red-danger": "#df3333",
        azure: "#e1f5feeb",
        "chat-box-user-message": "#dcf8c6",
        "other-users-message-from": "#35cd96",
        "exit-button-green": "#05cd51",
      },
      backgroundOpacity: {
        85: 0.85,
      },
      zIndex: {
        51: "51",
        52: "52",
        53: "53",
        60: "60",
        "-10": "-10",
      },
    },
    customForms: (theme) => ({
      default: {
        select: {},
        input: {
          "&:focus": {
            boxShadow: "0 0 0 1px rgba(66,153,253,0.5)",
          },
        },
        textarea: {
          "&:focus": {
            boxShadow: "0 0 0 1px rgba(66,153,253,0.5)",
          },
        },
        checkbox: {
          "&:focus": {
            boxShadow: "0 0 0 1px rgba(66,153,253,0.5)",
          },
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
    opacity: ["responsive", "group-hover"],
    translate: ["responsive", "group-hover"],
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
