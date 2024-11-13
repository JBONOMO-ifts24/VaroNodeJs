document.addEventListener("DOMContentLoaded", (event) => {
  mostrarDatos();
  console.log(document.cookie.length);
  console.log(document.cookie);
  console.log(getCookie('token'));
  console.log("Hola 🌎 !!!");
  const token =document.querySelector(".container-fluid").dataset.auth;
  console.log(token);

});

function subirMensaje() {
  console.log("subir mensaje!");
  const nombre_usuario = document.getElementById("nombre_usuario");
  const mensaje = document.getElementById("mensaje");
  const avi = document.getElementById("avisos");

  let nombre = nombre_usuario.value.trim(); //Se sacan los espacios en blanco adelante y atrás del string
  let men = mensaje.value.trim();

  //Validación de los datos en los campos nombre y mensaje
  if (nombre.length < 3 || men.length < 3) {
    const p = document.createElement("div");
    let mensaje_e =
      '<div class="alert alert-danger" role="alert">Los datos ingresados no son correctos 😰</div>';

    p.innerHTML = mensaje_e;
    avi.appendChild(p);
    nombre_usuario.value = "";
    mensaje.value = "";

    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
  } else {
    fetch("/APImensajes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_usuario: nombre,
        mensaje: men,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        nombre_usuario.value = "";
        mensaje.value = "";

        alert("😄 Mensaje enviado con éxito! 😄");
      })
      .catch((error) => console.error("Error:", error));
    avi.innerHTML = "";
    mostrarDatos();
  }
}

function mostrarDatos() {
  console.log("Mostrar datos!");
  fetch("/APIpaises",{method: 'GET',headers:{Authorization: `Bearer ${document.querySelector(".container-fluid").dataset.auth}`}})
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const mensajesContainer = document.getElementById("datosGuardados");
      mensajesContainer.innerHTML = "";
    });
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "No hay cookie token";
  }
