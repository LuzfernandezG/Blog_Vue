<template>
  <div class="contain_comentario">
    <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" class="icono_comentario">
      <path fill="currentColor"
        d="M11.967 1.752c-2.15.01-4.244.695-5.984 1.957a10.234 10.234 0 0 0-.126 16.493q.075.074.17.12a10.23 10.23 0 0 0 11.95 0a.8.8 0 0 0 .18-.13a10.235 10.235 0 0 0-.172-16.506a10.28 10.28 0 0 0-5.998-1.934zm0 3.76a4.16 4.16 0 0 1 3.878 2.534a4.14 4.14 0 0 1-.882 4.543A4.158 4.158 0 0 1 7.86 9.632a4.15 4.15 0 0 1 1.21-2.898a4.16 4.16 0 0 1 2.897-1.222m4.627 13.92a8.75 8.75 0 0 1-9.245 0a8 8 0 0 1-1.212-.9a7.1 7.1 0 0 1 2.144-2a7.23 7.23 0 0 1 7.382 0a7.1 7.1 0 0 1 2.143 2q-.563.506-1.212.9" />
    </svg>
    <div class="info_comentario">
      <div style="display: flex;">
        <p style="font-weight: bold;">{{ usuario }} </p>
        <p style="margin-left: 10px;">- {{ fecha }}</p>
      </div>
      <p>{{ comentario }}</p>

    </div>
    <svg v-if="usuario == this.nombre" xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"
      class="icono_eliminar" @click="capturar(id)">
      <path fill="currentColor"
        d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z" />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'Comentario',
  props: {
    usuario: String,
    fecha: Date,
    comentario: String,
    capturar: Function,
    id: Number
  },

  setup() {
    const data = JSON.parse(localStorage.getItem("userData"))



    const nombre = data.userName
    return {
      nombre
    }
  }
};

</script>
<style>
@keyframes slide-fwd-center {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.01);
  }
}

.contain_comentario {
  width: 80%;
  background-color: white;
  border-radius: 4rem;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 1px 2rem;

}

.contain_comentario:hover {
  animation: slide-fwd-center 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  background-color: rgb(224, 220, 220);
}

.icono_comentario {
  color: orange;
  margin-top: 10px;
}

.info_comentario {
  display: flex;
  flex-direction: column;
  color: black;
  line-height: 0;
  padding: 0;
  margin: 0;
}

.icono_eliminar {
  color: #000;
  text-align: end;
  padding-left: 3rem;
  padding-top: 0.5rem;
  width: 30px;
  transition: color 1s ease;
}

.icono_eliminar:hover {
  color: red;
}
</style>