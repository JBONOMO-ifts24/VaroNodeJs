document.addEventListener("DOMContentLoaded", (event) => {
  mostrarDatos();
  console.log("Hola 🌎 !!!");
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
  const loggedIn =
    document.querySelector(".container-fluid").dataset.loggedIn === "true";

  console.log(loggedIn);
  fetch("/APImensajes")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const mensajesContainer = document.getElementById("datosGuardados");
      mensajesContainer.innerHTML = "";
      if (data && Array.isArray(data)) {
        data.forEach((mensaje) => {
          //hacer que chequee si el campo "visible" es 0 no se muestre el mensaje (seria el borrar)
          let fecha = new Date(mensaje.fecha_mensaje).toLocaleDateString(
            "es-AR"
          );
          if (loggedIn) {
            const usuario = document.getElementById("nombre_usuario").value;
            let editar;
            if (usuario == mensaje.nombre_usuario) {
              editar =
                "<button class='btn btn-primary' onclick= modificarDatos(" +
                mensaje.idmensajes +
                ")>✏️</button>";
            } else {
              editar = "";
            }
            if (mensaje.visible == 1) {
              const p = document.createElement("div");
              p.innerHTML =
                "<p>El día " +
                fecha +
                "<strong> " +
                mensaje.nombre_usuario +
                "</strong> escribió: <strong>" +
                mensaje.mensaje +
                "</strong>" +
                editar +
                "<button class='btn btn-primary' onclick= borrar(" +
                mensaje.idmensajes +
                ")>❌</button></p>";
              mensajesContainer.appendChild(p);
            } else {
              const p = document.createElement("div");
              p.innerHTML = "<p>❌Mensaje eliminado❌</p>";
              mensajesContainer.appendChild(p);
            }
          } else {
            if (mensaje.visible == 1) {
              const p = document.createElement("div");
              p.innerHTML =
                "<p>El día " +
                fecha +
                "<strong> " +
                mensaje.nombre_usuario +
                "</strong> escribió: <strong>" +
                mensaje.mensaje +
                " ";
              mensajesContainer.appendChild(p);
            }
          }
        });
      } else {
        mensajesContainer.innerHTML = "<p>No hay mensajes 😞 </p>";
      }
    })
    .catch((error) => console.error("Error:", error));
}

function borrar(id) {
  const avi = document.getElementById("avisos");
  console.log(`Se procede a borrar el mensaje con ID ${id}`);
  //Se cambia el estado a visible = 0
  let datos_mensaje;
  fetch(`/APImensajes/${id}`)
    .then((response) => response.json())
    .then((data) => {
      datos_mensaje = data.mensaje;
      console.log(data.mensaje);
      console.log(data);
      datos_mensaje = data;
      console.log(datos_mensaje);
      try {
        modificarDatos(
          datos_mensaje.idmensajes,
          datos_mensaje.mensaje,
          datos_mensaje.nombre_usuario,
          0
        );
        avi.innerHTML =
          '<div class="alert alert-primary" role="alert">💀Mensaje eliminado💀</div>';
        setTimeout(() => {
          avi.innerHTML = "";
        }, 4000);
      } catch (error) {
        avi.innerHTML =
          '<div class="alert alert-danger" role="alert">  Error en el proceso</div>';
        setTimeout(() => {
          avi.innerHTML = "";
        }, 4000);
      }
      mostrarDatos();
    });
}

async function modificarDatos(id) {
  const avi = document.getElementById("avisos");
  //El usuario tiene que ser el mismo que el que escribió el mensaje.
  let mensaje = window.prompt("Ingresar nuevo mensaje:");
  if (mensaje == null || mensaje == "") {
    mensaje = " ";
  }
  try {
    const consulta = await fetch(`/APImensajes/${id}`);
    res = await consulta.json();
    console.log(res);
    const usuario = document.getElementById("nombre_usuario").value;
    if (usuario == res.nombre_usuario) {
      const con2 = await fetch(`/APImensajes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_usuario: res.nombre_usuario,
          mensaje: mensaje,
          visible: 1
        }),
      });

      console.log("mensaje modificado");
      avi.innerHTML =
        '<div class="alert alert-primary" role="alert">Mensaje Modificado!</div>';
      mostrarDatos();
      setTimeout(() => {
        avi.innerHTML = "";
      }, 4000);
    }else{
      avi.innerHTML =
        '<div class="alert alert-primary" role="alert">No se puede modificar mensaje, sólo el usuario que lo hizo lo puede modificar</div>';
      setTimeout(() => {
        avi.innerHTML = "";
      }, 4000);
    }
  } catch (error) {
    console.log("Error en la obtención de los datos");
    avi.innerHTML =
      '<div class="alert alert-primary" role="alert">Error!</div>';
    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
  }
  //Se consultan los datos del mensaje del ID:
}
