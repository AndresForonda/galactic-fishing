module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#39FF14', // Verde neón principal
        secondary: '#9AFF9A', // Verde claro secundario
        background: '#000000', // Negro puro
        accent: '#FFFF00', // Amarillo alerta
        danger: '#FF5555', // Rojo alerta/peligro
        info: '#7DF9FF', // Azul neón para ayudas
        border: '#2F4F4F', // Gris oscuro terminal
      },
    },
  },
  content: ['./index.html', './src/**/*.{ts,tsx}'],
}
