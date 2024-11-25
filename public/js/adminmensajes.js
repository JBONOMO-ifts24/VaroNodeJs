document.addEventListener("DOMContentLoaded", (event) => {
    checkAuth();
    mostrarDatos();
  });
  
  async function mostrarDatos() {
    const divDatos = document.getElementById("datosGuardados");
    divDatos.innerHTML = "";
    let res;
    try {
      console.log("Mostrar datos!");
      const consulta = await fetch("/APImensajes", {
        method: "GET",
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
      d.setAttribute("id", `${dato.idmensajes}`);
      d.innerHTML = `${dato.nombre_usuario} dijo: ${dato.mensaje} ¿Visible?: ${dato.visible} <button class='btn btn-primary' onclick= 'modifDato(${dato.idmensajes})'>✏️</button><button class='btn btn-primary' onclick= 'borrar(${dato.idmensajes})'>❌</button>`;
  
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
    const nombre_usuario = document.getElementById("nombre_usuario");
    const mensaje = document.getElementById("mensaje");
    const avi = document.getElementById("avisos");
  
    //Validación de los datos en los campos nombre y mensaje
    try {
      const consulta = await fetch("/APImensajes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_usuario: nombre_usuario.value,
          mensaje: mensaje.value
        }),
      });
      res = await consulta.json();
      console.log(res);
      const p = document.createElement("div");
      let mensaje_e =
        '<div class="alert alert-danger" role="alert"> Mensaje agregado!!! </div>';
  
      p.innerHTML = mensaje_e;
      avi.appendChild(p);
      nombre_usuario.value = "";
      mensaje.value = "";
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
      nombre_usuario.value = "";
      mensaje.value = "";
  
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
      const consulta = await fetch(`/APIpintores/${id}`, {
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
        '<div class="alert alert-primary" role="alert">💀Pintor eliminado💀</div>';
  
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
    const nombre_pintor = document.getElementById("nombre_pintor_mod");
    const fecha_nac = document.getElementById("fecha_nac_mod");
    const fecha_mue = document.getElementById("fecha_mue_mod");
    const lugar_nac = document.getElementById("lugar_nac_mod");
    const biograf_pintor = document.getElementById("biograf_pintor_mod");

    const avi = document.getElementById("avisos");
    const token = await checkAuth();
    console.log("token " + token);
    //Validación de los datos en los campos nombre y mensaje
    try {
      const consulta = await fetch(`/APIpintores/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            nombre_pintor: nombre_pintor.value,
            fecha_nac: fecha_nac.value,
            fecha_mue: fecha_mue.value,
            ciudad: lugar_nac.value,
            biograf_pintor: biograf_pintor.value
        }),
      });
      res = await consulta.json();
      console.log(res);
      const p = document.createElement("div");
      let mensaje_e =
        '<div class="alert alert-primary" role="alert">📝Pintor modificado📝</div>';
        nombre_pintor.value = "";
        fecha_nac.value = "";
        fecha_mue.value = "";
        lugar_nac.value = "";
        biograf_pintor.value ="";
  
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
        nombre_pintor.value = "";
        fecha_nac.value = "";
        fecha_mue.value = "";
        lugar_nac.value = "";
        biograf_pintor.value ="";
  
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
    const idciu = document.getElementById("id_mensaje");
  
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