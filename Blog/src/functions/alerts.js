import Swal from "sweetalert2";

export const swallTrue = (mensaje) => {
  return Swal.fire({
    title: "¡Éxito!",
    text: mensaje,
    icon: "success",
    confirmButtonText: "Aceptar",
  });
};

export const swallError = (mensaje) => {
  return Swal.fire({
    title: "¡Error!",
    text: mensaje,
    icon: "error",
    confirmButtonText: "Aceptar",
  });
};

export const swallConfirmation = (mensaje) => {
  return Swal.fire({
    title: "Información",
    text: mensaje,
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    return result.isConfirmed;
  });
};

export const swallInput = async (options = {}) => {
  const {
    title = "¿Qué opinas sobre el Post?",
    inputLabel = "Ingresa tu comentario aquí",
    inputValue = "",
    errorMessage = "¡Mal ingreso!",
    showCancelButton = true,
    customClass = {},
    inputType = "text",
  } = options;

  const { value } = await Swal.fire({
    title,
    input: inputType,
    inputLabel,
    inputValue,
    showCancelButton,
    inputValidator: (value) => {
      if (!value) {
        return errorMessage;
      }
    },
  });
  return value || null;
};

export const swallEditForm = async (publicacion, customClass = {}) => {
  const { value: formValues } = await Swal.fire({
    title: "EDICION",
    html: `
        <label style="color:orange;">Titulo:</label>
        <br>
        <textarea id="titulo" class="swal2-textarea" style="width: 90%; box-sizing: border-box;" required>${publicacion.titulo}</textarea>
        <br>
        <label style="color:orange;">Descripción:</label>
        <br>
        <textarea id="texto" class="swal2-textarea" style="width: 90%; box-sizing: border-box;" required>${publicacion.texto}</textarea>
        <br>
        <label style="color:orange;">Categoría:</label>
        <br>
        <textarea id="categoria" class="swal2-textarea" style="width: 90%; box-sizing: border-box;" required>${publicacion.categoria}</textarea>
      `,
    customClass: {
      popup: "poput",
      title: "titulo-swal",
      input: "input-swal",
      textarea: "textarea-swal",
      confirmButton: "my-custom-confirm-button-class",
      cancelButton: "my-custom-cancel-button-class",
      ...customClass,
    },
    focusConfirm: false,
    preConfirm: () => {
      const titulo = document.getElementById("titulo").value;
      const texto = document.getElementById("texto").value;
      const categoria = document.getElementById("categoria").value;
      return { titulo, texto, categoria };
    },
  });

  return formValues || null;
};
