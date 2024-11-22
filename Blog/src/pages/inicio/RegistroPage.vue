<template>
  <div class="c_registro">
    <div class="logo">
      <router-link to="/"><img src="../../../public/logoblanco.png" alt="Logo" class="imagen" </router-link>
    </div>
    <div class="contenedor_login">
      <form class="formulario" @submit.prevent="registroUser">
        <h1 class="titulo">Registro</h1>
        <hr style="border: none; height: 2px; background-color: #333; width: 80%; margin: 20px auto;">
        <label>Nombre:</label>
        <input type="text" v-model="form.user" required>
        <label>Correo:</label>
        <input type="email" v-model="form.email" required>
        <label>Contraseña:</label>
        <input type="password" v-model="form.password" maxlength="12" minlength="8" required>
        <label>Ciudad:</label>
        <input type="text" v-model="form.ciudad" required>
        <button class="boton_inicio" type="submit">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { registro } from '../../functions/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  user: '',
  email: '',
  password: '',
  ciudad: ''
});

const registroUser = async () => {
  try {
    const userData = {
      user: form.value.user,
      email: form.value.email,
      password: form.value.password,
      ciudad: form.value.ciudad
    };

    console.log('Datos del usuario en formato JSON:', userData);

    const response = await registro(userData);

    if (response && response.status === 201) {
      console.log(response.data.message);
      router.push("/inicio")
    } else {
      console.log("No se obtuvo una respuesta de éxito.");
    }

  } catch (error) {
    console.error("Error en el registro:", error);
  }
};

</script>

<style scoped>
@keyframes jello-horizontal {
  0% {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
}





.c_registro {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
}


.logo {
  flex: 1;
  display: flex;
  justify-content: center;

  width: 100%;
}

.imagen {
  width: 25rem;
}

.contenedor_login {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: 3rem;
  height: 100vh;
  justify-content: center
}


.titulo {
  text-align: center;
  color: black;
}


.formulario {
  display: flex;
  flex-direction: column;
  width: 100%;
}


label {
  padding: 0.5rem 0;
  font-weight: bold;
}


input {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid black;
  border-radius: 10rem;
}

.boton_inicio {
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgb(255, 182, 25);
  border: none;
  border-radius: 10rem;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


.boton_inicio:hover {
  background-color: rgb(120, 83, 1);
}
</style>