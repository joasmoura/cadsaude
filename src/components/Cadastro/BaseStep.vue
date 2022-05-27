<template>
<article>
    <h1>{{ titulo }}</h1>
    <h4 class="py-3">{{ subtitulo }}</h4>
    <div class="row">
        <div class="col-md-6">
            <slot />
        </div>

        <div class="col-md-6 text-end px-0">
            <img :src="img" class="img-fluid">
        </div>
    </div>
</article>
</template>

<script>
export default {
  props: {
    titulo: String,
    subtitulo: String,
    img: String
  }
}
</script>

<style>

</style>