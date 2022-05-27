<template>
<section>
    <template v-if="step < 3">
        <div class="row">
            <div class="col-md-10 py-2">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" :style="`width:${(step*100)/maxStep}%;`" :aria-valuenow="step" :aria-valuemin="1" :aria-valuemax="maxStep"></div>
                </div>
            </div>

            <div class="col-md-2">
                {{ `${step} de ${maxStep}` }}
            </div>
        </div>

        <div class="d-grid gap-2">
            <button class="btn btn-primary btn-block" @click="$emit('next')">PRÓXIMO</button>
        </div>
    </template>

    <template v-else>
        <div class="d-grid gap-2">
            <button class="btn btn-block">CADASTRAR PROFISSIONAL</button>
            <button class="btn btn-block">Editar cadastro</button>
        </div>
    </template>
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