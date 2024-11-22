<template>
  
  <div class="contenedor_persona">
    <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 32 32" class="figura">
      <path fill="currentColor"
        d="M18 30h-4a2 2 0 0 1-2-2v-7a2 2 0 0 1-2-2v-6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a2 2 0 0 1-2 2v7a2 2 0 0 1-2 2m-5-18a.94.94 0 0 0-1 1v6h2v9h4v-9h2v-6a.94.94 0 0 0-1-1zm3-3a4 4 0 1 1 4-4a4 4 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2" />
    </svg>
    <div class="info_personas">
      <h3 style="font-weight: bold; ">{{ nombre }}</h3>

      <div style="display: flex; gap: 1rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
            <path
              d="M9.74 15.876a.75.75 0 0 1-.616.864a17.15 17.15 0 0 0-6.707 2.666a.75.75 0 0 1-.834-1.247a18.65 18.65 0 0 1 7.293-2.899a.75.75 0 0 1 .864.616m4.52 0a.75.75 0 0 1 .864-.616a18.65 18.65 0 0 1 7.293 2.899a.75.75 0 0 1-.834 1.247a17.15 17.15 0 0 0-6.707-2.666a.75.75 0 0 1-.616-.864" />
            <path
              d="M6.25 10a5.75 5.75 0 1 1 11.5 0c0 2.742-1.364 5.153-2.655 6.832a18.6 18.6 0 0 1-2.387 2.552a10 10 0 0 1-.22.185l-.013.012l-.004.003h-.002c0 .001 0 .002-.469-.584l-.43.614l-.003-.002l-.004-.003l-.015-.01l-.049-.036l-.175-.132a13 13 0 0 1-.602-.502a15.4 15.4 0 0 1-1.808-1.898C7.604 15.394 6.25 12.983 6.25 10M12 19l-.43.614a.75.75 0 0 0 .899-.028zm-.026-.973q.13-.118.286-.27a17 17 0 0 0 1.646-1.84c1.208-1.57 2.344-3.659 2.344-5.917a4.25 4.25 0 0 0-8.5 0c0 2.517 1.145 4.606 2.336 6.094a14 14 0 0 0 1.888 1.933M12 8.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5M9.25 10a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0" />
          </g>
        </svg>
        <p>{{ ubicacion }}</p>

      </div>
    </div>

  </div>

</template>
<script>
export default {
  name: 'Personas',
  props: {
    nombre: {
      type: String,
      required: true
    },
    ubicacion: {
      type: String,
      required: true
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
    transform: scale(4.5);
  }
}

.contenedor_persona {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0.2rem 2rem;
  background-color: rgb(255, 255, 255);
  color: black;
  justify-content: center;
  align-items: center;
  border-radius: 5rem;
  transition: background-color 0.3s ease;
}

.contenedor_persona:hover {
  animation: slide-fwd-center 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  background-color: rgb(1, 5, 73);
  color: white;
}

.info_personas {
  display: flex;
  flex-direction: column;
  line-height: 0;

}

.figura {
  margin: 0 auto;

  color: orange;
}
</style>