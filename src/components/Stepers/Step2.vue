<template>
<BaseStep titulo="Sobre o atendimento" subtitulo="Detalhes do atendimento" img="/src/assets/imgs/bg2.png">
    <Form @submit="onSubmit" v-slot="{ errors }">
        <div class="mb-3">
            <label for="especialidade" class="form-label">Especialidade principal*</label>
            <Field as="select" name="especialidade" id="especialidade" v-model="form.especialidade" class="form-select" :class="errors.especialidade ? 'is-invalid' : ''" rules="required">
              <option value="">Selecione a especialidade</option>
              <option v-for="(esp, i) in $store.state.especialidades" :key="i" :value="esp">{{esp.nome}}</option>
            </Field>
            <div class="invalid-feedback">{{ errors.especialidade }}</div>
        </div>

        <div class="mb-3 w-75">
          <label for="especialidade" class="form-label">Informe o preço da consulta*</label>
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">R$</span>
            <Field type="text" name="valor" id="valor" v-model="form.valor" rules="required|minValue:30|maxValue:350">
              <CampoMoeda name="valor" v-model="form.valor" :options="options" class="form-control w-75" placeholder="Valor" :class="errors.valor ? 'is-invalid' : ''"/>
            </Field>
            <div class="invalid-feedback">{{ errors.valor }}</div>
          </div>
        </div>

        <div class="mb-3">
          <p>Formas de pagamento da consulta*</p>
          <label 
            v-for="(forma, i) in $store.state.formas_pagamento" 
            :key="i" 
            class="btn w-100 text-start mt-3 button-forma-pagamento" 
            :class="errors.formas_pagamento ? 'is-invalid' : ''" 
            :for="`forma-${i}`" 
            data-bs-toggle="collapse" 
            :data-bs-target="forma.value === 'cartao' ? '#collapsePagamento' : ''" 
            aria-expanded="false" 
            aria-controls="collapsePagamento"
          >
            <Field type="checkbox" :id="`forma-${i}`" class="form-check-input ml-3" name="formas_pagamento" v-model="form.formas_pagamento" :value="forma.value" rules="required"/>
            <span class="ml-5">{{ forma.text }}</span>
          </label>
            <div class="invalid-feedback">{{ errors.formas_pagamento }}</div>

          <div class="collapse" :class="form.formas_pagamento.includes('cartao') && 'show'" id="collapsePagamento">
              <div class="card card-body">
                  <template v-if="form.formas_pagamento.includes('cartao')">
                      <div class="form-check" v-for="(parcela, i) in $store.state.parcelas_cartao" :key="i">
                          <Field
                            class="form-check-input"
                            :class="errors.parcela && 'is-invalid'"
                            type="radio"
                            required
                            v-model="form.parcela"
                            :value="parcela.value"
                            name="parcela"
                            :id="`parcela-${i}`"
                            rules="required"
                          />
                          <label class="form-check-label" :for="`parcela-${i}`">{{ parcela.text }}</label>
                          <div class="invalid-feedback" v-if="i+1 === $store.state.parcelas_cartao.length">{{ errors.parcela }}</div>
                      </div>
                  </template>
              </div>
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
import CampoMoeda from '../CampoMoeda/index.vue'
export default {
  components: { Next, BaseStep, Form, Field, CampoMoeda },
  props: {
    step: Number
  },
  data () {
    return {
      form: {
        especialidade: '',
        valor: null,
        formas_pagamento: [],
        parcela: null
      },
      options: {
        currency: 'BRL',
        currencyDisplay: 'hidden',
        hideCurrencySymbolOnFocus: true,
        hideGroupingSeparatorOnFocus: true,
        hideNegligibleDecimalDigitsOnFocus: true,
        autoDecimalDigits: true,
        autoSign: true,
        useGrouping: true,
        accountingSign: false
      }
    }
  },
  mounted () {
    this.verificaDados()
    this.getEspecialidades()
  },
  methods: {
    // verifica se o usuário já preencheu os dados e insere os dados na variável form
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
            this.$store.dispatch('inserirEspecialidades', res.data)
          }
        }).catch((e) => {
          alert('Algo deu errado ao buscar as especialidades!')
        })
      }
    },
    // verifica se o usuário já preencheu os dados e emite um evento para o pai
    async onSubmit () {
      this.$emit('next', this.form)
    }
  }
}
</script>