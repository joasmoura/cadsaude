<template>
<BaseStep titulo="Revisão do cadastro" img="/src/assets/imgs/bg3.png">
    <div class="mb-3">
        <p class="m-0 titulo"><b>Nome completo</b></p>
        <p class="dado-revisao">{{$store.state.dados_profissional && $store.state.dados_profissional.nome}}</p>
    </div>

    <div class="mb-3">
        <p class="m-0 titulo"><b>CPF</b></p>
        <p class="dado-revisao">{{$store.state.dados_profissional && $store.state.dados_profissional.cpf}}</p>
    </div>

    <div class="mb-3">
        <p class="m-0 titulo"><b>Número de celular ou telefone</b></p>
        <p class="dado-revisao">{{$store.state.dados_profissional && $store.state.dados_profissional.celular}}</p>
    </div>
    
    <div class="mb-3">
        <p class="m-0 titulo"><b>Estado/Cidade</b></p>
        <p class="dado-revisao">{{$store.state.dados_profissional && `${$store.state.dados_profissional.estado.nome} - ${$store.state.dados_profissional.cidade.nome}`}}</p>
    </div>
    
    <div class="mb-3">
        <p class="m-0 titulo"><b>Especialidade principal</b></p>
        <p class="dado-revisao">{{ $store.state.dados_atendimento && $store.state.dados_atendimento.especialidade.nome}}</p>
    </div>
    
    <div class="mb-3">
        <p class="m-0 titulo"><b>Preço da consulta</b></p>
        <p class="dado-revisao">{{ $store.state.dados_atendimento && $store.state.dados_atendimento.valor}}</p>
    </div>
    
    <div class="mb-3">
        <p class="m-0 titulo"><b>Formas de pagamento da consulta</b></p>
        <p class="dado-revisao" v-if="$store.state.dados_atendimento">
            <span v-for="(forma, i) in $store.state.dados_atendimento.formas_pagamento" :key="i">
                {{ forma.text }}
                <template v-if="forma.value === 'cartao'">
                    <span> - Parcelamento em {{$store.state.dados_atendimento.parcela.text}}</span>
                </template>
                {{ (i+1 < $store.state.dados_atendimento.formas_pagamento.length ? ', ' : '') }}
            </span>
        </p>
    </div>
            
    <Next @next="$emit('next')" :step="step"/>
</BaseStep>
</template>

<script>
import Next from './next.vue'
import BaseStep from './BaseStep.vue'
export default {
  components: { Next, BaseStep },
  props: {
    step: Number
  }
}
</script>

<style scoped>
    .titulo{
        font-size: 16px;
        font-weight: 300;
    }

    .dado-revisao{
        font-size: 14px;
    }
</style>