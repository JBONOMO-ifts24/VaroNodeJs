document.addEventListener("DOMContentLoaded", (event) => {
  checkAuth();
  mostrarDatos();
  setDatosPaises();
});

async function mostrarDatos() {
  const divDatos = document.getElementById("datosGuardados");
  divDatos.innerHTML = "";
  let res;
  try {
    console.log("Mostrar datos!");
    const token = await checkAuth();
    console.log("token " + token);
    const consulta = await fetch("/APIciudades", {
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
    d.innerHTML = `${dato.ciudad} en ${dato.pais} <button class='btn btn-primary' onclick= 'modifDato(${dato.idciudades})'>✏️</button><button class='btn btn-primary' onclick= 'borrar(${dato.idciudades})'>❌</button>`;

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
  const pais = document.getElementById("d_pais");
  const ciudad = document.getElementById("nombre_ciudad");
  const avi = document.getElementById("avisos");
  const token = await checkAuth();
  console.log("token " + token);

  //Validación de los datos en los campos nombre y mensaje
  try {
    const consulta = await fetch("/APIciudades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pais: pais.value,
        ciudad: ciudad.value,
      }),
    });
    res = await consulta.json();
    console.log(res);
    const p = document.createElement("div");
    let mensaje_e =
      '<div class="alert alert-danger" role="alert"> 🗺️Ciudad agregada🗺️ </div>';

    p.innerHTML = mensaje_e;
    avi.appendChild(p);
    pais.value = "";
    ciudad.value = "";
    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
    mostrarDatos();
  } catch (error) {
    console.log("Error en la obtención de datos .");
    const p = document.createElement("div");
    let mensaje_e =
      '<div class="alert alert-danger" role="alert">Error en el proceso. 😰</div>';

    p.innerHTML = mensaje_e;
    avi.appendChild(p);
    pais.value = "";
    ciudad.value = "";

    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
  }
}

async function borrar(id) {
  let res;

  const avi = document.getElementById("avisos");
  const token = await checkAuth();
  console.log("token " + token);
  //Validación de los datos en los campos nombre y mensaje
  try {
    const consulta = await fetch(`/APIciudades/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res = await consulta.json();
    console.log(res);
    const p = document.createElement("div");
    let mensaje_e =
      '<div class="alert alert-primary" role="alert">💀Ciudad eliminada💀</div>';

    p.innerHTML = mensaje_e;
    avi.appendChild(p);
    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
    mostrarDatos();
  } catch (error) {
    console.log("Error en la obtención de datos .");
    const p = document.createElement("div");
    let mensaje_e =
      '<div class="alert alert-danger" role="alert">Error en el proceso. 😰</div>';

    p.innerHTML = mensaje_e;
    avi.appendChild(p);
    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
  }
}
async function editar(id) {
  const ciudad = document.getElementById("nombre_ciudad_mod");
  const pais = document.getElementById("pais");
  console.log(id);
  console.log(ciudad.value);
  console.log(pais.value);
  const avi = document.getElementById("avisos");
  const token = await checkAuth();
  console.log("token " + token);
  //Validación de los datos en los campos nombre y mensaje
  try {
    const consulta = await fetch(`/APIciudades/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pais: pais.value,
        nombre: ciudad.value,
      }),
    });
    res = await consulta.json();
    console.log(res);
    const p = document.createElement("div");
    let mensaje_e =
      '<div class="alert alert-primary" role="alert">📝Ciudad modificada📝</div>';
    pais.value = "";
    ciudad.value = "";

    p.innerHTML = mensaje_e;
    avi.appendChild(p);
    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
    mostrarDatos();
  } catch (error) {
    console.log("Error en la obtención de datos .");
    const p = document.createElement("div");
    let mensaje_e =
      '<div class="alert alert-danger" role="alert">Error en el proceso. 😰</div>';
    pais.value = "";
    ciudad.value = "";

    p.innerHTML = mensaje_e;
    avi.appendChild(p);
    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
  }
}

function modifDato(id) {
  const formuModifica = document.getElementById("formu_modifica");
  const formuNuevo = document.getElementById("formulario");
  const idciu = document.getElementById("id_ciudad");

  if (formuModifica.classList.contains("d-none")) {
    formuModifica.classList.remove("d-none");
    formuModifica.classList.add("d-block");
  }

  if (formuNuevo.classList.contains("d-block")) {
    formuNuevo.classList.remove("d-block");
    formuNuevo.classList.add("d-none");
  }

  idciu.value = id;
}

function ocultarFormu() {
  const formuModifica = document.getElementById("formu_modifica");
  const formuNuevo = document.getElementById("formulario");

  if (formuModifica.classList.contains("d-block")) {
    formuModifica.classList.remove("d-block");
    formuModifica.classList.add("d-none");
  }
  if (formuNuevo.classList.contains("d-none")) {
    formuNuevo.classList.remove("d-none");
    formuNuevo.classList.add("d-block");
  }
}

async function setDatosPaises() {
  //Con esta funcion tomamos datos del endpoint paises y puebla los datos del desplegable.
  const desplegable = document.getElementById("d_pais");
  const desplegable_mod = document.getElementById("pais");
  // Obtener datos de la API
  const res = await getDatosPais();
  console.log(res);

  
  // Crear y agregar las opciones al select
  res.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion.nombre;
    option.text = opcion.nombre;
    desplegable_mod.appendChild(option);
  });
  res.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion.nombre;
    option.text = opcion.nombre;
    desplegable.appendChild(option);
  });
}

async function getDatosPais() {
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
    return res;
  } catch (error) {
    console.log("Error en la obtención de los datos");
  }
  
}