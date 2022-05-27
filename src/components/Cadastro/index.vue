<template>
<div class="container py-4">
    <button @click="prevStep" class="btn btn-default" v-show="(step > 1 && step <= 3)">prev</button>
    <section class="container-register mt-5 px-5 pb-5 pt-5">
        <Step1 v-if="step === 1" @next="dados => inserirDadosProfissional(dados)" :step="step"/>
        <Step2 v-if="step === 2" @next="inserirDadosAtendimento" @prev="prevStep" :step="step"/>
        <Step3 v-if="step === 3" @next="nextStep" @prev="prevStep" :step="step"/>
    </section>
</div>
</template>

<script>
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'
export default {
  components: { Step1, Step2, Step3 },
  data () {
    return {
      step: 1
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

</style>