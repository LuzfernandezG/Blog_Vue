//FUNCIONES PARA MANEJO DE BACKEND
import { swallTrue, swallError, swallConfirmation } from "./alerts";
import axios from "axios";
import Cookies from "js-cookie";

export async function login(data) {
  try {
    const response = await axios.post("/api/login", data);
    if (response.status === 200) {
      console.log(response);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: response.data.usuario[0].id,
          userName: response.data.usuario[0].user,
          ciudad: response.data.usuario[0].ciudad,
          email: response.data.usuario[0].email,
        })
      );

      swallTrue(`Bienvenid@: ${response.data.usuario[0].user}`);

      return response;
    } else {
      console.log(response.data);
      swallError(`Acceso denegado: ${response.data.message || response.data}`);
    }
  } catch (error) {
    console.log(error);
    swallError(
      `Error de inicio de sesión: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
  }
}
export async function registro(data) {
  try {
    const response = await axios.post("/api/register", data);
    console.log(response.data);
    swallTrue(`usuario creado: ${response.data.message || response.data}`);
    return response;
  } catch (error) {
    console.log(error);
    swallError(
      `El correo ya fue usado: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
    throw error;
  }
}

export async function Imprimir(endpoint) {
  try {
    const response = await axios.get(`/api/${endpoint}`);
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function formatearFecha(fecha) {
  const fechaObj = new Date(fecha);
  const opciones = {
    dia: "numeric",
    mes: "short",
    año: "numeric",
    hora: "numeric",
    minuto: "numeric",
  };

  const fechaFormateada = `${fechaObj
    .getDate()
    .toString()
    .padStart(2, "0")} ${fechaObj.toLocaleString("es-ES", {
    month: "short",
  })} ${fechaObj.getFullYear()}`;

  return fechaFormateada;
}

export async function crearPost(data) {
  try {
    const response = await axios.post("/api/publicacion", data);
    console.log(response.data);
    swallTrue(`Publicacion creada exitosamente`);
    return response;
  } catch (error) {
    console.log(error);
    swallError(
      `Error en la creacion de la publicacion: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
    throw error;
  }
}

export async function deletePost(id) {
  const confirmed = await swallConfirmation(
    "¿Seguro que desea eliminar la publicación?"
  );

  if (!confirmed) return;
  try {
    const response = await axios.delete(`/api/publicacion/${id}`);
    console.log(response);
    swallTrue(`${response.data.mensaje}`);
    return response;
  } catch (error) {
    console.error(error);
    swallError(
      `Error al eliminar la publicación: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
    throw error;
  }
}

export async function editPost(id, data) {
  const confirmed = await swallConfirmation(
    "¿Seguro que desea cambiar la informacion?"
  );

  if (!confirmed) return;

  try {
    const response = await axios.put(`/api/publicacion/${id}`, data);
    console.log(response);
    swallTrue(`${response.data.mensaje}`);

    return response;
  } catch (error) {
    console.error(error);
    swallError(
      `Error al eliminar la publicación: ${
        error.response?.data?.mensaje || "Error desconocido"
      }`
    );
    throw error;
  }
}

export async function TraerComentarios(endpoint) {
  try {
    const response = await axios.get(`/api/comentarios/${endpoint}`);
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function crearComentario(data) {
  try {
    const response = await axios.post("/api/comentarios", data);
    console.log(response.data);
    swallTrue(`Comentario creado exitosamente`);
    return response;
  } catch (error) {
    console.log(error);
    swallError(
      `Error en la creacion del comentario: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
    throw error;
  }
}

export async function deleteComentario(id) {
  const confirmed = await swallConfirmation(
    "¿Seguro que desea eliminar el comentario?"
  );
  if (!confirmed) return;
  try {
    const response = await axios.delete(`/api/comentarios/${id}`);
    console.log(response);

    swallTrue(`${response.data.mensaje}`);
    return response;
  } catch (error) {
    // Manejar error
    console.error(error);
    swallError(
      `Error al eliminar el comentario: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
    throw error;
  }
}

export async function TraerRanking() {
  try {
    const response = await axios.get(`/api/ranking`);
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}