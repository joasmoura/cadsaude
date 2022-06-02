<template>
  <BaseStep titulo="Sobre o profissional" subtitulo="Dados do profissional" :img="'/src/assets/imgs/bg1.png'">
    <Form @submit="onSubmit" v-slot="{ errors }">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome completo*</label>
        <Field type="text" name="nome" id="nome" v-model="form.nome" class="form-control" placeholder="Digite o nome completo" :class="errors.nome ? 'is-invalid' : ''" rules="required|min:3|max:48"/>
        <div class="invalid-feedback">{{ errors.nome }}</div>
      </div>

      <div class="mb-3">
        <label for="cpf" class="form-label">CPF*</label>
        <Field type="text" name="cpf" id="cpf" v-model="form.cpf" v-maska="'###.###.###-##'" class="form-control w-75" placeholder="CPF" :class="errors.cpf ? 'is-invalid' : ''" rules="required|verifyCpf"/>
        <div class="invalid-feedback">{{ errors.cpf }}</div>
      </div>

      <div class="mb-3">
        <label for="celular" class="form-label">Celular*</label>
        <Field type="text" name="celular" id="celular" v-model="form.celular" v-maska="'(##) # ####-####'" class="form-control w-75" placeholder="(00) 0 0000-0000" :class="errors.celular? 'is-invalid' : ''" rules="required|verifyCell"/>
        <div class="invalid-feedback">{{ errors.celular }}</div>
      </div>
      
      <div class="row">
          <div class="col col-md-6 mb-3">
            <label for="estado" class="form-label">Estado*</label>
            <Field as="select" name="estado" id="estado" :disabled="carregandoEstados" v-model="form.estado" class="form-select" :class="errors.estado ? 'is-invalid' : ''" rules="required" @change="getCidades">
              <option value="">Selecione</option>
              <option v-for="(est, i) in $store.state.estados" :key="i" :value="est.id">{{est.nome}}</option>
            </Field>
            <div class="invalid-feedback">{{ errors.estado }}</div>
          </div>

          <div class="col col-md-6 mb-3">
            <label for="cidade" class="form-label">Cidade*</label>
            <Field as="select" name="cidade" id="cidade" :disabled="carregandoCidades" v-model="form.cidade" class="form-select" :class="errors.cidade ? 'is-invalid' : ''" rules="required">
              <option value="">Selecione</option>
              <option v-for="(cid, i) in this.$store.state.cidades" :key="i" :value="cid.id">{{cid.nome}}</option>
            </Field>
            <div class="invalid-feedback">{{ errors.cidade }}</div>
          </div>
      </div>
      <Next :step="step"/>
    </Form>
  </BaseStep>
</template>

<script>
import Next from '../Cadastro/next.vue'
import BaseStep from '../Cadastro/BaseStep.vue'
import { Form, Field } from 'vee-validate'
export default {
  components: { Next, BaseStep, Form, Field },
  props: {
    step: Number
  },
  data () {
    return {
      form: {
        nome: '',
        cpf: '',
        celular: '',
        estado: '',
        cidade: ''
      },
      carregandoEstados: false,
      carregandoCidades: false
    }
  },
  created () {
    this.verificaDados()
    this.getEstados()
  },
  methods: {
    async getEstados () {
      const estados = this.$store.state.estados
      if (!estados.length) {
        this.carregandoEstados = true
        await this.axios.get('/estados').then((res) => {
          if (res.data) {
            this.$store.dispatch('inserirEstados', res.data)
            this.carregandoEstados = false
          }
        }).catch((e) => {
          alert('Algo deu errado ao buscar estados!')
          this.carregandoEstados = false
        })
      }
    },
    async getCidades () {
      if (this.form.estado) {
        this.carregandoCidades = true
        await this.axios.get(`/estados/${this.form.estado}/cidades`).then((res) => {
          if (res.data) {
            this.$store.dispatch('inserirCidades', res.data)
            this.carregandoCidades = false
          }
        }).catch((e) => {
          alert('Algo deu errado ao buscar cidades do estado selecionado!')
          this.carregandoCidades = false
        })
      }
    },
    verificaDados () {
      const dados = this.$store.state.dados_profissional
      if (dados) {
        this.form = dados
      }
    },
    async onSubmit () {
      this.$emit('next', this.form)
    }
  },
}
</script>