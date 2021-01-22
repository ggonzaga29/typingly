module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            background: "#222831",
            primary: "#dddddd",
            secondary: "#99D17B",
            // tertiary: "#F52F57",
            // fourth: "#CEFF1A",
            correct: "#30475e",
            wrong: "#f05454",
            next: "#0075F2"
        },
        fontFamily: {
            mono: [
                'Source Code Pro',
                'ui-monospace',
                'SFMono-Regular',
                'Menlo',
                'Monaco',
                'Consolas',
                '"Liberation Mono"',
                '"Courier New"',
                'monospace',
              ]
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
