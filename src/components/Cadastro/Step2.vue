<template>
<BaseStep titulo="Sobre o atendimento" subtitulo="Detalhes do atendimento" img="/src/assets/imgs/bg2.png">
    <form>
        <div class="mb-3">
            <label for="especialidade" class="form-label">Especialidade principal*</label>
            <select class="form-select" v-model="form.especialidade" id="especialidade">
                <option value="">Selecione a especialidade</option>
                <option v-for="(esp, i) in $store.state.especialidades" :key="i" :value="esp">{{esp.nome}}</option>
            </select>
        </div>

        <div class="input-group mb-3 w-75">
            <span class="input-group-text" id="basic-addon1">R$</span>
            <input type="text" v-model="form.valor" class="form-control" placeholder="Valor" aria-label="Valor" aria-describedby="basic-addon1">
        </div>

        <div class="mb-3">
            <p>Formas de pagamento da consulta*</p>
            <label v-for="(forma, i) in formas_pagamento" :key="i" class="btn btn-primary w-100 text-start mt-3" :for="`forma-${i}`" data-bs-toggle="collapse" :data-bs-target="forma.value === 'cartao' ? '#collapseExample' : ''" aria-expanded="false" aria-controls="collapseExample">
                <input class="form-check-input" v-model="form.formas_pagamento" type="checkbox" :value="forma" :id="`forma-${i}`">
                {{ forma.text }}
            </label>

            <div class="collapse" id="collapseExample">
                <div class="card card-body">
                    <template  v-if="form.formas_pagamento.find(item => item.value === 'cartao')">
                        <div class="form-check" v-for="(parcela, i) in parcelas_cartao" :key="i">
                            <input class="form-check-input" type="radio" v-model="form.parcela" :value="parcela" name="flexRadioDefault" :id="`parcela-${i}`">
                            <label class="form-check-label" :for="`parcela-${i}`">
                                {{ parcela.text }}
                            </label>
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <Next @next="next" :step="step"/>
    </form>
</BaseStep>
</template>

<script>
import Next from './next.vue'
import BaseStep from './BaseStep.vue'
export default {
  components: { Next, BaseStep },
  props: {
    step: Number
  },
  data () {
    return {
      form: {
        especialidade: '',
        valor: '',
        formas_pagamento: [],
        parcela: null
      },
      formas_pagamento: [
        { value: 'dinheiro', text: 'Em dinheiro'},
        { value: 'pix', text: 'Pix'},
        { value: 'cartao', text: 'Cartao de crédito'}
      ],
      parcelas_cartao: [
        { value: 1, text: '1x sem juros'},
        { value: 2, text: '2x sem juros'},
        { value: 3, text: '3x sem juros'},
      ]
    }
  },
  created () {
    this.verificaDados()
    this.getEspecialidades()
  },
  methods: {
    verificaDados () {
      const dados = this.$store.state.dados_atendimento
      if (dados) {
        this.form = dados
      }
    },
    async getEspecialidades () {
      const especialidades = this.$store.state.especialidades
      if (!especialidades.length) {
        await this.axios.get('/especialidades').then((res) => {
          if (res.data) {
            console.log(res.data)
            this.$store.dispatch('inserirEspecialidades', res.data)
          }
        }).catch((e) => {

        })
      }
    },
    next () {
      this.$emit('next', this.form)
    },
    selectFormaPagamento () {
      
    }
  }
}
</script>

<style>

</style>