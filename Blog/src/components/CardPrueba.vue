<template>
  <div class="contenedor_prueba">
    <h1>{{ titulo }}</h1>
    <p>{{ descripcion }}</p>

  </div>

</template>

<script>
export default {
  name: 'CardPrueba',
  props: {
    titulo: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true,
    }

  }
}
</script>

<style>
.contenedor_prueba {
  background-color: white;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>