<template>
  <div class="c_registro">
    <div class="logo">
      <router-link to="/"><img src="../../../public/logoblanco.png" alt="Logo" class="imagen"></router-link>
    </div>
    <div class="contenedor_login">
      <form class="formulario" @submit.prevent="iniciarSesion">
        <div class="icono">
          <svg xmlns="http://www.w3.org/2000/svg" width="9em" height="9em" viewBox="0 0 20 20">
            <g fill="none">
              <path fill="url(#fluentColorPerson200)"
                d="M5.009 11A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18s3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2z" />
              <path fill="url(#fluentColorPerson201)"
                d="M5.009 11A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18s3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2z" />
              <path fill="url(#fluentColorPerson202)" d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8" />
              <defs>
                <linearGradient id="fluentColorPerson200" x1="6.329" x2="8.591" y1="11.931" y2="19.153"
                  gradientUnits="userSpaceOnUse">
                  <stop offset=".125" stop-color="#e5d68b" />
                  <stop offset="1" stop-color="#ddbc46" />
                </linearGradient>
                <linearGradient id="fluentColorPerson201" x1="10" x2="13.167" y1="10.167" y2="22"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#bf9d22" stop-opacity="0" />
                  <stop offset="1" stop-color="#9e6f1f" />
                </linearGradient>
                <linearGradient id="fluentColorPerson202" x1="7.902" x2="11.979" y1="3.063" y2="9.574"
                  gradientUnits="userSpaceOnUse">
                  <stop offset=".125" stop-color="#e5d68b" />
                  <stop offset="1" stop-color="#ddbc46" />
                </linearGradient>
              </defs>
            </g>
          </svg>
        </div>
        <h1 class="titulo">Iniciar Sesion</h1>
        <hr style="border: none; height: 2px; background-color: #333; width: 80%; margin: 20px auto;">
        <label>Correo:</label>
        <input type="email" v-model="form.email" required>
        <label>Contraseña:</label>
        <input type="password" v-model="form.password" required>
        <button class="boton_inicio" type="submit"><router-link to="/dashboard/principal"
            style="text-decoration: none; color: white;">Iniciar</router-link></button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '../../functions/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  email: '',
  password: '',
});

const iniciarSesion = async () => {
  try {
    const userData = {
      email: form.value.email,
      password: form.value.password,
    };

    console.log('Datos del usuario en formato JSON:', userData);

    const response = await login(userData);
    console.log(response);


    if (response) {
      console.log('Respuesta del servidor:', response);
      router.push("/dashboard/banner");
    } else {
      console.error('Error en la respuesta del servidor');
    }

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};
</script>

<style scoped>
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

}

.imagen {
  width: 25rem;

}

.icono {
  display: flex;
  justify-content: center;
  align-items: center;
}

.contenedor_login {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: 3rem;
  height: 100vh;
  justify-content: center;

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