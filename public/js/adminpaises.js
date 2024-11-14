document.addEventListener("DOMContentLoaded", (event) => {
  checkAuth();
  mostrarDatos();
});

async function mostrarDatos() {
  const divDatos = document.getElementById("datosGuardados");
  divDatos.innerHTML="";
  let res;
  try {
    console.log("Mostrar datos!");
    const token = await checkAuth();
    console.log("token " + token);
    const consulta = await fetch("/APIpaises", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res = await consulta.json();
    console.log(res);
  } catch (error) {
    console.log("Error en la obtención de los datos");
  }
  
  const ul = document.createElement("ul");
  ul.setAttribute("class", "list-group");
  divDatos.appendChild(ul);
  res.forEach((dato) => {
    console.log(dato);
    const d = document.createElement("li");
    d.setAttribute("class", "list-group-item list-group-item-dark");
    d.innerHTML = `${dato.nombre} <button class='btn btn-primary' onclick= 'editar(${dato.idpaises})'>✏️</button><button class='btn btn-primary' onclick= 'borrar(${dato.idpaises})'>❌</button>`;

    ul.appendChild(d);
  });
}

async function checkAuth() {
  try {
    const consulta = await fetch("/auth/check-auth");
    const res = await consulta.json();
    console.log(res);
    return res.token;
  } catch (error) {
    console.log("Error en la obtención de la autorización.");
  }
}

async function subir() {
  let res;
  const mensaje = document.getElementById("nombre_pais");
  const avi = document.getElementById("avisos");
  const token = await checkAuth();
  console.log("token " + token);
  //Se sacan los espacios en blanco adelante y atrás del string
  let men = mensaje.value.trim();

  //Validación de los datos en los campos nombre y mensaje
  if (men.length < 3) {
    const p = document.createElement("div");
    let mensaje_e =
      '<div class="alert alert-danger" role="alert">Los datos ingresados no son correctos 😰</div>';

    p.innerHTML = mensaje_e;
    avi.appendChild(p);
    mensaje.value = "";

    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
  } else {
    try {
      const consulta = await fetch("/APIpaises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: men,
        }),
      });
      res = await consulta.json();
      console.log(res);
      const p = document.createElement("div");
    let mensaje_e ='<div class="alert alert-danger" role="alert"> 🗺️País agregado🗺️ </div>';

    p.innerHTML = mensaje_e;
    avi.appendChild(p);
    mensaje.value = "";
    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
    mostrarDatos();
    } catch (error) {
      console.log("Error en la obtención de datos .");
      const p = document.createElement("div");
      let mensaje_e ='<div class="alert alert-danger" role="alert">Error en el proceso. 😰</div>';

      p.innerHTML = mensaje_e;
      avi.appendChild(p);
      mensaje.value = "";

      setTimeout(() => {
        avi.innerHTML = "";
      }, 4000);
    }
  }
}

async function borrar(id) {
  let res;
  
  const avi = document.getElementById("avisos");
  const token = await checkAuth();
  console.log("token " + token);
  //Validación de los datos en los campos nombre y mensaje
    try {
      const consulta = await fetch(`/APIpaises/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      res = await consulta.json();
      console.log(res);
      const p = document.createElement("div");
    let mensaje_e ='<div class="alert alert-primary" role="alert">💀País eliminado💀</div>';

    p.innerHTML = mensaje_e;
    avi.appendChild(p);
    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
    mostrarDatos();
    } catch (error) {
      console.log("Error en la obtención de datos .");
      const p = document.createElement("div");
      let mensaje_e ='<div class="alert alert-danger" role="alert">Error en el proceso. 😰</div>';

      p.innerHTML = mensaje_e;
      avi.appendChild(p);
      setTimeout(() => {
        avi.innerHTML = "";
      }, 4000);
    }
  

}
async function editar(id) {}
