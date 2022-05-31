<template>
<section>
    <div class="row" v-if="step <= 2">
        <div class="col col-md-10 py-2">
            <div class="progress">
                <div class="progress-bar" role="progressbar" :style="`width:${(step*100)/maxStep}%;`" :aria-valuenow="step" :aria-valuemin="1" :aria-valuemax="maxStep"></div>
            </div>
        </div>

        <div class="col-auto">
            {{ `${step} de ${maxStep}` }}
        </div>
    </div>

    <div class="d-grid gap-2">
        <button class="btn btn-block" :class="(step === 3) ? 'button-cadastrar' : 'btn-primary' " @click="$emit('next')">
            {{ (step < 3 ? 'PRÓXIMO' : 'CADASTRAR PROFISSIONAL') }}
        </button>
        <button class="btn btn-block" v-if="step === 3" @click="$emit('editar_cadastro')">Editar cadastro</button>
    </div>
</section>
</template>

<script>
export default {
  data () {
    return {
      maxStep: 2
    }
  },
  props: {
    step: Number
  }
}
</script>

<style>

</style>