<template>
<BaseStep titulo="Sobre o profissional" subtitulo="Dados do profissional" :img="'/src/assets/imgs/bg1.png'">
    <Form @submit="onSubmit">
    {{ form.nome }}
    <!-- <Field type="text" name="nome" v-model="form.nome" class="form-control" :rules="isRequired"/>
    <ErrorMessage name="nome" /> -->
        <Input type="text" :name="'nome'" label="Nome completo*" v-model="form.nome" placeholder="Digite o nome completo" :rules="isRequired"/>
        <Input type="text" name="cpf" label="CPF*" class="w-75" v-model="form.cpf" placeholder="CPF" :rules="isRequired"/>
        <Input type="text" name="celular" label="Número de celular*" class="w-75" v-model="form.celular" placeholder="(00) 0 0000-0000" :rules="isRequired"/>

        <div class="row">
            <div class="col-md-6">
                <Input type="select" :name="'estado'" label="Estado*" v-model="form.estado" :rules="isRequired" @change="getCidades">
                    <option value="">Selecione</option>
                    <option v-for="(est, i) in $store.state.estados" :key="i" :value="est.id">{{est.nome}}</option>
                </Input>
            </div>

            <div class="col-md-6">
                <Input type="select" :name="'cidade'" label="Cidade*" v-model="form.cidade" :rules="isRequired">
                    <option value="">Selecione</option>
                    <option v-for="(cid, i) in this.$store.state.cidades" :key="i" :value="cid.id">{{cid.nome}}</option>
                </Input>
            </div>
        </div>

        <Next :step="step"/>
    </Form>
</BaseStep>
</template>

<script>
import Next from './next.vue'
import BaseStep from './BaseStep.vue'
import Input from '../Input/index.vue'
import { Form } from 'vee-validate'
import validacao from '../../configs/validacao'
export default {
  components: { Next, BaseStep, Input, Form},
  props: {
    step: Number
  },
  mixins: [validacao],
  data () {
    return {
      form: {
        nome: '',
        cpf: '',
        celular: '',
        estado: '',
        cidade: ''
      }
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
        await this.axios.get('/estados').then((res) => {
          if (res.data) {
            this.$store.dispatch('inserirEstados', res.data)
          }
        }).catch((e) => {

        })
      }
    },
    async getCidades () {
      if (this.form.estado) {
        await this.axios.get(`/estados/${this.form.estado}/cidades`).then((res) => {
          if (res.data) {
            this.$store.dispatch('inserirCidades', res.data)
          }
        }).catch((e) => {
    
        })
      }
    },
    verificaDados () {
      const dados = this.$store.state.dados_profissional
      if (dados) {
        this.form = dados
      }
    },
    
    onSubmit (values) {
        const submit = this.$refs.form
        // alert('next')
        // submit.
    // if(JSON.stringify(values, null, 2))
    //   this.$emit('next', this.form)
    }
  },
}
</script>

<style>

</style>