module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            background: "#586994",
            primary: "#FFF1E6",
            secondary: "#7D869C",
            tertiary: "#F52F57",
            fourth: "#CEFF1A"
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
