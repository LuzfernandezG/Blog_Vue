<script setup>

</script>

<template>
  <header>
    <img src="../../../public/logoblanco.png">
    <div class="contenedor_iconos">
      <svg xmlns="http://www.w3.org/2000/svg" width="2em" class="iconos" height="2em" viewBox="0 0 20 20">
        <path fill="currentColor"
          d="M11.603 9.833L9.357 8.785C9.161 8.694 9 8.796 9 9.013v1.974c0 .217.161.319.357.228l2.245-1.048c.197-.092.197-.242.001-.334M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m0 13.5c-4.914 0-5-.443-5-3.9s.086-3.9 5-3.9s5 .443 5 3.9s-.086 3.9-5 3.9" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="2em" class="iconos" height="2em" viewBox="0 0 20 20">
        <path fill="currentColor"
          d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.657 11.875c-.616-.047-.874-.352-1.356-.644c-.265 1.391-.589 2.725-1.549 3.422c-.297-2.104.434-3.682.774-5.359c-.579-.975.069-2.936 1.291-2.454c1.503.596-1.302 3.625.581 4.004c1.966.394 2.769-3.412 1.55-4.648c-1.762-1.787-5.127-.041-4.713 2.517c.1.625.747.815.258 1.678c-1.127-.25-1.464-1.139-1.42-2.324c.069-1.94 1.743-3.299 3.421-3.486c2.123-.236 4.115.779 4.391 2.777c.309 2.254-.959 4.693-3.228 4.517" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="2em" class="iconos" height="2em" viewBox="0 0 20 20">
        <path fill="currentColor"
          d="M13 10a3 3 0 1 1-6 0q.001-.257.049-.5H6v3.997c0 .278.225.503.503.503h6.995a.503.503 0 0 0 .502-.503V9.5h-1.049q.048.243.049.5m-3 2a2 2 0 1 0-.001-4.001A2 2 0 0 0 10 12m2.4-4.1h1.199a.3.3 0 0 0 .301-.3V6.401a.3.3 0 0 0-.301-.301H12.4a.3.3 0 0 0-.301.301V7.6c.001.165.136.3.301.3M10 .4A9.6 9.6 0 0 0 .4 10a9.6 9.6 0 0 0 9.6 9.6a9.6 9.6 0 0 0 9.6-9.6A9.6 9.6 0 0 0 10 .4m5 13.489C15 14.5 14.5 15 13.889 15H6.111C5.5 15 5 14.5 5 13.889V6.111C5 5.5 5.5 5 6.111 5h7.778C14.5 5 15 5.5 15 6.111z" />
      </svg>
    </div>

  </header>
  <div class="contenedor">
    <div class="informacion">
      <p class="info">¡Que esperas para conocernos!</p>
      <h1>Cada día es una página en blanco esperando ser escrita.</h1>
      <p class="info2">tu opinion es importante para nosotros. Comienza ahora</p>

      <button class="boton registro"> <router-link class="link" to="/registro">Registrate</router-link></button>
      <button class="boton login"><router-link class="link" to="/inicio">Iniciar Sesion</router-link></button>
    </div>

  </div>

</template>

<style scoped>
@keyframes slide-fwd-center {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}

header {

  padding: 1rem 3rem;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center
}

.contenedor {
  margin: 0 auto;
  padding: 0;
  display: flex;
  height: 100vh;

}

.contenedor_iconos {
  width: 90vw;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.iconos {
  color: white;
}

.link {
  color: white;
  text-decoration: none;
}

.iconos:hover {
  color: rgb(210, 202, 202);
}

.informacion {
  margin-top: 9rem;
  color: white;
  padding: 2rem;
  font-size: 3rem;
  width: 70%;
  height: 100vh;
}

.info {
  font-size: 1.5rem;
  color: rgb(189, 140, 34);
  font-weight: bold;
}

.info2 {
  font-size: 1.2rem;
}


.boton {
  width: 20%;
  color: white;
  border: none;
  font-size: 1.2rem;
  margin: 2rem 1rem;
}

.registro {
  background-color: rgb(255, 182, 25);
  transition: background-color 0.3s ease;
}

.registro:hover {
  background-color: rgb(120, 83, 1);
  animation: slide-fwd-center 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

}

.login {
  background-color: rgb(0, 45, 123);
  transition: background-color 0.3s ease;

}

.login:hover {
  background-color: rgb(2, 19, 48);
  animation: slide-fwd-center 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

}
</style>
