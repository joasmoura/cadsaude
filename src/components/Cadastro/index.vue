<template>
<div class="container container-index">
    <button @click="prevStep" class="btn btn-default m-0" :style="`visibility: ${(step > 1 && step <= 3 ? 'visible' : 'hidden')}`">
      <svg width="35px" height="35px" viewBox="0 0 48 48" style="color: #698" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="35" height="35" fill="white" fill-opacity="0.01"/>
        <path d="M31 36L19 24L31 12" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <section class="container-register px-5 pb-5 pt-5">
      <Transition mode="out-in">
        <Step1 v-if="step === 1" @next="dados => inserirDadosProfissional(dados)" :step="step"/>
        <Step2 v-else-if="step === 2" @next="inserirDadosAtendimento" @prev="prevStep" :step="step"/>
        <Step3 v-else-if="step === 3" @next="nextStep" @prev="prevStep" :step="step" @editar_cadastro="step = 1"/>
        <Step4 v-else-if="step === 4" :step="step"/>
      </Transition>
    </section>
</div>
</template>

<script>
import Step1 from '../Stepers/Step1.vue'
import Step2 from '../Stepers/Step2.vue'
import Step3 from '../Stepers/Step3.vue'
import Step4 from '../Stepers/Step4.vue'
export default {
  components: { Step1, Step2, Step3, Step3, Step4 },
  data () {
    return {
      step: 1
    }
  },
  watch: {
    '$store.state.dados_profissional' (val) {
      if (this.step > 1 && !val) {
        this.step = 1
      }
    },
    '$store.state.dados_atendimento' (val) {
      if (this.step > 1 && !val) {
        this.step = 1
      }
    }
  },
  methods: {
    inserirDadosProfissional (dados) {
      this.$store.dispatch('inserirDadosProfissional', dados)
      this.nextStep()
    },
    inserirDadosAtendimento (dados) {
      this.$store.dispatch('inserirDadosAtendimento', dados)
      this.nextStep()
    },
    nextStep () {
      this.step++
    },
    prevStep () {
      if (this.step > 1) {
        this.step--
      }
    }
  }
}
</script>

<style>
 .v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>