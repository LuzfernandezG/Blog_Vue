<template>
  <h1>
    ESTA ES LA VISTA DE PRUEBA
  </h1>

  <CardPrueba v-for="info in data" :titulo="info.titulo" :descripcion="info.texto" />

</template>
<script>
import CardPrueba from '../../components/CardPrueba.vue';



export default {
  components: {
    CardPrueba
  },
  setup() {
    const data = [
      {
        "id": 1,
        "titulo": "Novedades en tecnología",
        "categoria": "Tecnología",
        "texto": "En este artículo exploramos las últimas tendencias en tecnología y su impacto en nuestra sociedad."
      },
      {
        "id": 2,
        "titulo": "Consejos para viajar por Europa",
        "categoria": "Viajes",
        "texto": "Descubre los mejores lugares para visitar en Europa y consejos prácticos para tu próximo viaje."
      },
      {
        "id": 3,
        "titulo": "Análisis del mercado financiero",
        "categoria": "Finanzas",
        "texto": "Un resumen detallado del estado actual del mercado financiero y sus perspectivas futuras."
      },
      {
        "id": 4,
        "titulo": "Nuevas recetas para principiantes",
        "categoria": "Cocina",
        "texto": "Aprende a preparar deliciosos platos con ingredientes sencillos y técnicas fáciles de seguir."
      },
      {
        "id": 5,
        "titulo": "Entrenamiento para corredores",
        "categoria": "Deportes",
        "texto": "Un plan de entrenamiento efectivo para mejorar tu resistencia y alcanzar tus objetivos de carrera."
      }
    ]
    return {
      data
    };

  }

}

</script>
<style></style>