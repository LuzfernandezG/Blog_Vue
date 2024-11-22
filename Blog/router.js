import { createRouter, createWebHistory } from 'vue-router';
import Login from './src/pages/inicio/InicialPage.vue';
import Registro from './src/pages/inicio/RegistroPage.vue';
import Inicio from './src/pages/inicio/LoginPage.vue';

import Dashboard from './src/pages/principal/DashboardPage.vue';
import Principal from './src/pages/principal/PrincipalPage.vue';
import Perfil from './src/pages/principal/PerfilPage.vue'
import Crear from './src/pages/principal/CrearPage.vue'
import Banner from './src/pages/principal/BannerPage.vue'
import Prueba from './src/pages/principal/PruebaPage.vue'


const routes = [
  { path: '/', component: Login },
  { path: '/registro', component: Registro} ,
  { path: '/inicio', component: Inicio} ,

  { path: '/dashboard', component: Dashboard ,
    children:[
      { path: 'principal', component:Principal},
      { path: 'perfil', component:Perfil },
      { path: 'crear', component:Crear },  
      { path: 'banner', component:Banner },  
      { path: 'prueba', component:Prueba },  
    ]},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;