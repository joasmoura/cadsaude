<template>
  <BaseStep titulo="Cadastro realizado com sucesso" subtitulo="Entraremos em contato em breve" img="/src/assets/imgs/bg4.png">
    <div class="pt-5">
        <p>Recebemos seu contato. Em breve um de nossos especialistas irá formalizar sua entrada em nosso time de sucesso</p>
        <p>Até breve!</p>
        <button class="btn button-cadastrar" @click="novoCadastro()">Novo cadastro</button>
    </div>
  </BaseStep>
</template>

<script>
import BaseStep from '../Cadastro/BaseStep.vue'
export default {
  components: { BaseStep },
  methods: {
    novoCadastro () {
      this.$store.dispatch('inserirDadosProfissional', null)
      this.$store.dispatch('inserirDadosAtendimento', null)
    }
  }
}
</script>