<template>
  <div class="contenedorP_perfil">
    <div class="contenedor_perfil">
      <div class="informacion_perfil">
        <svg xmlns="http://www.w3.org/2000/svg" width="15em" height="15em" viewBox="0 0 24 24" style="color: orange;">
          <path fill="currentColor"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m0 18.5a8.5 8.5 0 1 1 .001-17.001A8.5 8.5 0 0 1 12 20.5m0-8c-3.038 0-5.5 1.728-5.5 3.5s2.462 3.5 5.5 3.5s5.5-1.728 5.5-3.5s-2.462-3.5-5.5-3.5m0-.5a3 3 0 1 0 0-6a3 3 0 0 0 0 6" />
        </svg>
        <h1 class="nombre ">{{ informacion.userName }}</h1>
        <section style="display: flex; gap: 1rem; align-items: center; justify-content: center; color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M5 5h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1c-.5 0-.94.17-1.28.47l7.78 5.03l7.78-5.03C18.94 6.17 18.5 6 18 6zm6.5 6.71L3.13 7.28C3.05 7.5 3 7.75 3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8c0-.25-.05-.5-.13-.72z" />
          </svg>
          <h2>{{ informacion.email }}</h2>
        </section>
        <section style="display: flex; gap: 1rem; align-items: center; justify-content: center; color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
            <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
              <path
                d="M9.74 15.876a.75.75 0 0 1-.616.864a17.15 17.15 0 0 0-6.707 2.666a.75.75 0 0 1-.834-1.247a18.65 18.65 0 0 1 7.293-2.899a.75.75 0 0 1 .864.616m4.52 0a.75.75 0 0 1 .864-.616a18.65 18.65 0 0 1 7.293 2.899a.75.75 0 0 1-.834 1.247a17.15 17.15 0 0 0-6.707-2.666a.75.75 0 0 1-.616-.864" />
              <path
                d="M6.25 10a5.75 5.75 0 1 1 11.5 0c0 2.742-1.364 5.153-2.655 6.832a18.6 18.6 0 0 1-2.387 2.552a10 10 0 0 1-.22.185l-.013.012l-.004.003h-.002c0 .001 0 .002-.469-.584l-.43.614l-.003-.002l-.004-.003l-.015-.01l-.049-.036l-.175-.132a13 13 0 0 1-.602-.502a15.4 15.4 0 0 1-1.808-1.898C7.604 15.394 6.25 12.983 6.25 10M12 19l-.43.614a.75.75 0 0 0 .899-.028zm-.026-.973q.13-.118.286-.27a17 17 0 0 0 1.646-1.84c1.208-1.57 2.344-3.659 2.344-5.917a4.25 4.25 0 0 0-8.5 0c0 2.517 1.145 4.606 2.336 6.094a14 14 0 0 0 1.888 1.933M12 8.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5M9.25 10a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0" />
            </g>
          </svg>
          <h3>{{ informacion.ciudad }}</h3>
        </section>
      </div>
    </div>
    <div class="contenedorPrincipal">
      <h1 style="text-align: center; color: white;">PUBLICACIONES</h1>
      <div class="contenedor_publicaciones">
        <Card v-for="publicacion in publicacionesFiltradas" :titulo="publicacion.titulo"
          :descripcion="publicacion.categoria" :id="publicacion.id" :capturar="() => capturar(publicacion.id)"
          :editar="() => editar(publicacion.id)" />

      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, computed } from 'vue';
import { Imprimir, deletePost, editPost } from '../../functions/api';
import { swallEditForm } from '../../functions/alerts';
import Card from '../../components/Card.vue';

export default {
  components: {
    Card
  },
  setup() {
    const informacion = ref(JSON.parse(localStorage.getItem("userData")) || {});
    const publicaciones = ref([]);
    

    const publicacionesFiltradas = computed(() => {
      if (!informacion.value.userName) return publicaciones.value;
      return publicaciones.value.filter(publicacion =>
        publicacion.usuario.toLowerCase().includes(informacion.value.userName.toLowerCase())
      );
    });

    async function ImprimirPublicaciones() {
      try {
        const response = await Imprimir("publicacion");
        publicaciones.value = response.publicaciones;
      } catch (error) {
        console.error("Error fetching publicaciones:", error);
      }
    }

    async function capturar(id) {
      try {
        await deletePost(id);
        await ImprimirPublicaciones();
      } catch (error) {
        console.error(error);
      }
    }

    async function editar(id) {
      const publicacion = publicaciones.value.find(pub => pub.id === id);

      if (publicacion) {
        const formValues = await swallEditForm(publicacion);

        if (formValues) {
          try {
            const id_usuario = informacion.value.id;
            await editPost(id, { ...formValues, id_usuario });
            await ImprimirPublicaciones();
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        console.error("Publicación no encontrada con ID:", id);
      }
    }

    onMounted(() => {
      ImprimirPublicaciones();
    });

    return {
      informacion,
      publicacionesFiltradas,
      capturar,
      editar
    };
  }
};
</script>

<style>
.contenedorP_perfil {
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 1rem;
  width: 98%;

}

.contenedor_perfil {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

}

.informacion_perfil {
  text-align: center;
  width: 25rem;
}

.nombre {
  background-color: rgb(1, 1, 1);
  padding: 1rem;
  color: white;
  text-transform: uppercase;
}

.contenedorPrincipal {
  border-radius: 2rem;
  padding: 1rem;
  width: 95%;
}


.contenedor_publicaciones {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 1rem;
  width: 95%;
  padding: 2rem;
  gap: 1rem;
  height: 70vh;
  overflow-y: auto;

}

.contenedor_publicaciones::-webkit-scrollbar {
  display: none;
}
</style>