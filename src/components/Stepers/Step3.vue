<template>
<BaseStep titulo="Revisão do cadastro" img="/src/assets/imgs/bg3.png">
    <div class="mb-3">
        <p class="m-0 titulo-dado"><b>Nome completo</b></p>
        <p class="dado-revisao">{{$store.state.dados_profissional && $store.state.dados_profissional.nome}}</p>
    </div>

    <div class="mb-3">
        <p class="m-0 titulo-dado"><b>CPF</b></p>
        <p class="dado-revisao">{{$store.state.dados_profissional && $store.state.dados_profissional.cpf}}</p>
    </div>

    <div class="mb-3">
        <p class="m-0 titulo-dado"><b>Número de celular ou telefone</b></p>
        <p class="dado-revisao">{{$store.state.dados_profissional && $store.state.dados_profissional.celular}}</p>
    </div>
    
    <div class="mb-3">
        <p class="m-0 titulo-dado"><b>Estado/Cidade</b></p>
        <p class="dado-revisao">
            {{$store.state.dados_profissional && `${getEstado($store.state.dados_profissional.estado)} - ${getCidade($store.state.dados_profissional.cidade)}`}}
        </p>
    </div>
    
    <div class="mb-3">
        <p class="m-0 titulo-dado"><b>Especialidade principal</b></p>
        <p class="dado-revisao">{{ $store.state.dados_atendimento && $store.state.dados_atendimento.especialidade.nome}}</p>
    </div>
    
    <div class="mb-3">
        <p class="m-0 titulo-dado"><b>Preço da consulta</b></p>
        <p class="dado-revisao">{{ $store.state.dados_atendimento && setMoeda($store.state.dados_atendimento.valor)}}</p>
    </div>
    
    <div class="mb-3">
        <p class="m-0 titulo-dado"><b>Formas de pagamento da consulta</b></p>
        <p class="dado-revisao" v-if="$store.state.dados_atendimento">
            <span v-for="(forma, i) in $store.state.dados_atendimento.formas_pagamento" :key="i">
                {{ getFormaPagamento(forma) }}
                <template v-if="forma === 'cartao'">
                    <span> - Parcelamento em {{getParcela($store.state.dados_atendimento.parcela)}}</span>
                </template>
                {{ (i+1 < $store.state.dados_atendimento.formas_pagamento.length ? ', ' : '') }}
            </span>
        </p>
    </div>    
    <Next @next="$emit('next')" :step="step" @editar_cadastro="$emit('editar_cadastro')"/>
</BaseStep>
</template>

<script>
import Next from '../Cadastro/next.vue'
import BaseStep from '../Cadastro/BaseStep.vue'
import moeda from '../../mixins/moeda'
export default {
  components: { Next, BaseStep },
  mixins: [moeda],
  props: {
    step: Number
  },
  methods: {
    getEstado (value) {
        const estado = this.$store.state.estados.find(item => parseInt(item.id) === parseInt(value))
        return estado ? estado.nome : ''
    },
    getCidade (value) {
        const cidade = this.$store.state.cidades.find(item => parseInt(item.id) === parseInt(value))
        return cidade ? cidade.nome : ''
    },
    getFormaPagamento (value) {
        const forma = this.$store.state.formas_pagamento.find(item => item.value === value)
        return forma ? forma.text : ''
    },
    getParcela (value) {
        const parcela = this.$store.state.parcelas_cartao.find(item => item.value === value)
        return parcela ? parcela.text : ''
    }
  }
}
</script>