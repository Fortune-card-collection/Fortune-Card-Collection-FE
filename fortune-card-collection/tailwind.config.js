/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blacks: "#1e1e1e",
        gray: {
          white: "#F7F7F7",
          light: "#DDDDDD",
          deepDark: "#333333",
          dark: "#444444",
          medium: "#888888",
          morelight: "#999999",
        },
        primary: {
          white: "#F0F0F0",
          yellow: "#FEE500",
          blue: "#3DA8F5",
          highlight: "#D4AF37",
        },
        secondary: {
          blue: {
            light: "#60A5FA",
          },
        },
        neutral: {
          gray: {
            100: "#DCDCE6",
            200: "#8D99A7",
            300: "#F4F9FC",
          },
        },
        login: {
          button: "#3C1E1E",
        },
        select: {
          center: {
            border: "#D3AF37",
          },
        },
        selectstar: {
          gradient: {
            start: "#1E293B",
            middle: "#0F172A",
            end: "#020617",
            smallmiddle: "#1E3A8A",
          },
          select: {
            text: "#DBEAFE",
          },
          color: "#F2EE80",
        },
        resultstar: {
          text: {
            default: "#6b7280",
          },
        },
        input: {
          border: "#F9F9F9",
          button: "#318ACC",
        },
        quote: {
          border: "#475569",
          line: "#94A3B8",
        },
      },
      fontSize: {
        h1: "24px",
        h2: "24px",
        h3: "24px",
        h4: "24px",
        h5: "24px",

        b1: "16px",
        b2: "15px",
        b3: "14px",

        l1: "24px",
        l2: "18px",
        l3: "16px",
        l4: "14px",
      },
      boxShadow: {
        shadow1: "0px 1px 2px rgba(0,0,0,0.05)",
        shadow2:
          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
        shadow3:
          "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
        shadow4:
          "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
        shadow5: "0 25px 50px -12px rgba(0,0,0,0.25)",
        shadowinner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
        custom1: "0px 0px 60px rgba(0,0,0,0.5)",
        custom2: "0px 0px 15px rgba(255,215,0,0.6)",
        custom3: "0px 20px 50px rgba(0,0,0,0.5)",
        custom4: "0px 0px 25px rgba(212,175,55,0.6)",
      },
    },
  },
  plugins: [],
};

