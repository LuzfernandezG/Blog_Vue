<template>
  <div class="contenedor_publicacion scale-up-center">
    <div style="display: flex; justify-content: space-between;">
      <div style="display: flex; gap: 1rem; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 512 512" style="color: orange;">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"
            d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96" />
          <path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"
            d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304Z" />
        </svg>
        <h3>{{ creador }}</h3>
      </div>
      <h3>{{ fecha }}</h3>
    </div>
    <div class="contenido_publicacion">
      <div class="contenedor_titulo">
        <h1 class="titulo_publicacion">{{ titulo }}</h1>
      </div>
      <p style="text-align: center;">{{ categoria }}</p>

      <hr style="border: none; height: 2px; background-color: white; width: 95%; margin: 20px auto;">

      <p style="padding-top:2rem; text-align: justify; width: 95%;">
        {{ texto }}
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" class="icono_comentar"
        @click.prevent="agregarMensaje">
        <path fill="currentColor"
          d="M6 14h12v-2H6zm0-3h12V9H6zm0-3h12V6H6zM4 18q-.825 0-1.412-.587T2 16V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v18l-4-4z" />
      </svg>

      <div class="contenedor_comentarios">
        <Comentario v-for="comentario in comentarios" :usuario="comentario.usuario" :fecha="comentario.fecha"
          :comentario="comentario.comentario" ssss :capturar="() => EliminarComentario(comentario.id)"
          :id="comentario.id" />
      </div>
    </div>
  </div>
</template>

<script>
import Comentario from './Comentario.vue';
import { swallInput } from '../functions/alerts';
import { TraerComentarios, crearComentario, deleteComentario, formatearFecha } from '../functions/api';
import { onMounted } from 'vue';
import { ref } from 'vue';


export default {
  components: {
    Comentario
  },
  name: 'Publicacion',
  props: {
  creador: String,
  fecha: Date,
  titulo: String,
  categoria: String,
  texto: String,
  id: Number,
},
  setup(props) {

    const comentarios = ref([])
    const data = JSON.parse(localStorage.getItem("userData"))
    console.log(data)
    const id_usuario = data.id

    const agregarMensaje = async () => {
      const confirmacion = await swallInput();
      if (confirmacion) {
        const info = {
          "id_usuario": id_usuario,
          "id_publicacion": props.id,
          "comentario": confirmacion
        }
        console.log(info);

        const response = await crearComentario(info);
        console.log(response)
        ImprimirComentarios(props.id)

      }
    };

    async function ImprimirComentarios(valor) {
      try {
        const response = await TraerComentarios(valor);
        console.log(response)
        response.data.forEach(publicacion => {
          publicacion.fecha = formatearFecha(publicacion.fecha);
        });
        comentarios.value = response.data;
      } catch (error) {
        console.error("Error en traer los comentarios:", error);
      }
    }

    async function EliminarComentario(valor) {
      console.log(valor)
      try {
        const response = await deleteComentario(valor);
        console.log(response)
        ImprimirComentarios(props.id)
      } catch (error) {
        console.error("Error en traer los comentarios:", error);
      }
    }

    onMounted(async () => {
      await ImprimirComentarios(props.id);
    });

    return {
      agregarMensaje,
      comentarios,
      EliminarComentario,
    
    };
  }
}
</script>
<style>
.contenedor_publicacion {
  width: 100%;
  padding: 1rem 2.5rem;
  backdrop-filter: blur(30px);
  border: 1px solid white;
  border-radius: 1rem;
  color: white;

}

.contenedor_publicacion:hover {
  animation: slide-fwd-center 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  backdrop-filter: blur(100px);

}

.contenido_publicacion {
  width: 95%;
  padding: 1rem 3rem;
}

.contenedor_titulo {
  display: flex;
  filter: drop-shadow(1px 1px 4px orange);
  width: 100%;
  justify-content: center;
}

.titulo_publicacion {
  background-color: orange;
  padding: 1rem;
  color: white;
  font-size: 25px;
}

.icono_comentar {
  margin-top: 1rem;
  color: orange;
  background-color: white;
  padding: 0.5rem;
  border-radius: 1rem;
  transition: background-color 0.3s ease;
}

.icono_comentar:hover {
  color: white;
  background-color: orange;
  animation: jello-horizontal 0.9s both;
}

.contenedor_comentarios {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
  align-items: center;
}
</style>