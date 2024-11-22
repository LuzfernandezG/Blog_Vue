<template>
  <div class="contenedor_crear">
    <div class="decoracion">
      <h1>¡Deja volar tu imaginacion!</h1>
      <h3>Tu opinion es importante</h3>
    </div>

    <form class="info_crear" @submit.prevent="crearPublicacion">
      <h1 style="text-align: center; color: orange; text-transform: uppercase;"> Crear publicacion</h1>
      <hr style="border: none; height: 2px; background-color: white; width: 95%; margin: 5px auto;">
      <label class="label_Crear">Titulo:</label>
      <input type="text" class="input_crear" v-model="nuevaPublicacion.titulo" required />

      <label class="label_Crear">Categoria:</label>
      <input type="text" class="input_crear" v-model="nuevaPublicacion.categoria" required />

      <label class="label_Crear">Texto:</label>
      <textarea class="textarea" v-model="nuevaPublicacion.texto" required></textarea>

      <button type="submit" class="boton">Guardar</button>
    </form>
  </div>
</template>
<script setup>

import { ref } from 'vue';
import { crearPost } from '../../functions/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const data = JSON.parse(localStorage.getItem('userData'));
console.log(data);
const usuarioCreador = data.id;
console.log(usuarioCreador);

const nuevaPublicacion = ref({
  id_usuario: usuarioCreador,
  titulo: '',
  categoria: '',
  texto: ''
});
console.log(nuevaPublicacion);

const crearPublicacion = async () => {
  try {
    const publicationData = {
      id_usuario: nuevaPublicacion.value.id_usuario,
      titulo: nuevaPublicacion.value.titulo,
      categoria: nuevaPublicacion.value.categoria,
      texto: nuevaPublicacion.value.texto
    };

    console.log('Datos del usuario en formato JSON:', publicationData);

    const response = await crearPost(publicationData);

    if (response && response.status === 201) {
      console.log(response.data.message);

    } else {
      //   console.log("error en creacion");
    }

  } catch (error) {
    console.error("Error al crear la publicacion:", error);
  } finally {
    router.push('/dashboard/perfil')
  }
};


</script>
<style>
.contenedor_crear {
  display: flex;
  width: 90%;
  height: 85vh;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 3rem;
  gap: 2rem;

  border-radius: 1.5rem;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
}

.decoracion {
  text-align: center;
  color: white;
}

.decoracion h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.decoracion h3 {
  font-size: 1.5rem;
  font-weight: 300;
  margin-top: 0;
}

.info_crear {
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: #222;
  border-radius: 1rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  color: white;
}

.info_crear h1 {
  font-size: 1.8rem;
  color: #f0a500;
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

hr {
  border: none;
  height: 2px;
  background-color: #444;
  width: 100%;
}

.label_Crear {
  font-weight: bold;
  font-size: 1rem;
  color: #f0e3ca;
}

.input_crear,
.textarea {
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid #444;
  background-color: #333;
  color: #f0e3ca;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input_crear:focus,
.textarea:focus {
  border-color: #f0a500;
  outline: none;
}

.textarea {
  min-height: 100px;
  resize: none;
}

.boton {
  padding: 0.8rem 1.2rem;
  color: #222;
  font-weight: bold;
  border: none;
  font-size: 1.1rem;
  background-color: #f0a500;
  width: 40%;
  margin: 0.5rem auto 0;
  border-radius: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.boton:hover {
  background-color: #e59500;
  transform: scale(1.05);
  color: #f0e3ca;
}
</style>