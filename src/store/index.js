import { createStore } from "vuex"

const state = {
  dados_profissional: null,
  dados_atendimento: null,

  estados: [],
  cidades: [],
  especialidades: []
}

const mutations = {
   inserirDadosProfissional (state, dados) {
    state.dados_profissional = dados
   },
   inserirDadosAtendimento (state, dados) {
    state.dados_atendimento = dados
   },
   inserirEspecialidades (state, especialidades) {
    state.especialidades = especialidades
   },
   inserirEstados (state, estados) {
    state.estados = estados
   },
   inserirCidades (state, cidades) {
    state.cidades = cidades
   }
}

const actions = {
    inserirDadosProfissional ({commit}, dados) {
        commit('inserirDadosProfissional', dados)
    },
    inserirDadosAtendimento ({commit}, dados) {
        commit('inserirDadosAtendimento', dados)
    },
    inserirEspecialidades ({commit}, especialidades) {
        commit('inserirEspecialidades', especialidades)
    },
    inserirEstados ({commit}, estados) {
        commit('inserirEstados', estados)
    },
    inserirCidades ({commit}, cidades) {
        commit('inserirCidades', cidades)
    }
}

export default createStore({
    state,
    mutations,
    actions
})