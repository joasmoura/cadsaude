export default {
    methods: {
      setMoeda (valor = 0) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
      }
    }
  }