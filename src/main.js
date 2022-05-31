import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store/index.js'
import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import api from './configs/api'
import VueAxios from 'vue-axios'
import { defineRule } from 'vee-validate'
import Maska from 'maska'


// Criando regras de verificação para serem usados dos formulários através da diretiva rules
defineRule('required', value => {
  if (!value || value.length <= 0) {
    return 'Este campo é obrigatório'
  }
  return true
})

defineRule('min', (value, [limit]) => {
    if (value.length < limit) {
      return `Mínimo de  ${limit} carácteres`
    }
    return true
})

defineRule('total', (value, [limit]) => {
    if (value.length != limit) {
      return `Deve ter ${limit} carácteres`
    }
    return true
})

defineRule('max', (value, [limit]) => {
    if (value.length > limit) {
      return `Máximo de  ${limit} carácteres`
    }
    return true
})

defineRule('maxValue', (value, [limit]) => {
    if (parseFloat(value) > parseFloat(limit)) {
      return `Máximo de ${limit}`
    }
    return true
})

defineRule('minValue', (value, [limit]) => {
    if (parseFloat(value) < parseFloat(limit)) {
      return `Mínimo de ${limit}`
    }
    return true
})

defineRule('verifyCpf', async (value) => {
  const newValue = value.replace(/[^0-9]/g, '')

    if (newValue.length < 11) {
      return 'CPF incorreto'
    } else if (newValue.length === 11) {
      const res = await api.get(`/profissionais?cpf=${newValue}`)
      if (res.data.length) {
        return 'CPF já cadastrado'
      }
    }
    return true
})

defineRule('verifyCell', async (value) => {
  const newValue = value.replace(/[^0-9]/g, '')

    if (newValue.length < 11) {
      return 'Número de celular incorreto'
    }
    return true
})

const app = createApp(App)
    app.use(store)
    app.use(Vuex)
    app.use(VueAxios, api)
    app.use(Maska)
    app.mount('#app')
import 'bootstrap/dist/js/bootstrap.js'
