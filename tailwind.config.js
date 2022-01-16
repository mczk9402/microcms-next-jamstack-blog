const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  important: true,
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.bg-dot': {
          backgroundImage:
            'repeating-linear-gradient(0deg,rgba(242, 242, 242, 0.25) 0px 1px,transparent 1px 2px),repeating-linear-gradient(90deg, rgba(242, 242, 242, 0.25) 0px 1px, transparent 1px 2px)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
