<template>
<article>
    <h1 class="titulo">{{ titulo }}</h1>
    <h4 class="sub-titulo py-3" v-if="subtitulo">{{ subtitulo }}</h4>
    <div class="row">
        <div class="col-md-6">
            <slot />
        </div>

        <div class="col-md-6 text-end px-0 d-none d-sm-block">
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