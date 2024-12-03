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
      const token = await checkAuth();
      console.log("token " + token);
      const consulta = await fetch("/auth/usuarios", {
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
      d.setAttribute("id", `${dato.id}`);
      d.innerHTML = ` <img src="../uploads/${dato.archivo_foto}" alt="Foto" class="rounded-circle max-width: 100%" style="width: 60px"><strong> ${dato.username} <strong> <button class='btn btn-primary' onclick= 'modifDato(${dato.id})'>✏️</button><button class='btn btn-primary' onclick= 'borrar(${dato.id})'>❌</button>`;
  
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
    
      const p = document.createElement("div");
      let mensaje_e =
        '<div class="alert alert-danger" role="alert">Todavía no disponible, realizar desde API 😰</div>';
  
      p.innerHTML = mensaje_e;
      avi.appendChild(p);
      nombre_pintor.value = "";
      fecha_nac.value = "";
      fecha_mue.value = "";
      lugar_nac.value = "";
      biograf_pintor.value ="";
  
      setTimeout(() => {
        avi.innerHTML = "";
      }, 4000);
    
  }
  
  async function borrar(id) {
    let res;
  
    const avi = document.getElementById("avisos");
    const token = await checkAuth();
    console.log("token " + token);
    //Validación de los datos en los campos nombre y mensaje
    try {
      const consulta = await fetch(`/auth/usuarios/${id}`, {
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
        '<div class="alert alert-primary" role="alert">💀Usuario eliminado💀</div>';
  
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
    
      const p = document.createElement("div");
      let mensaje_e =
        '<div class="alert alert-danger" role="alert">Todavia no funciona, realizar desde la API 😰</div>';
        nombre_pintor.value = "";
        
  
      p.innerHTML = mensaje_e;
      avi.appendChild(p);
      setTimeout(() => {
        avi.innerHTML = "";
      }, 4000);
    
  }
  
  async function modifDato(id) {
    const formuModifica = document.getElementById("formu_modifica");
    const formuNuevo = document.getElementById("formulario");
    const idciu = document.getElementById("id_usuario_mod");
    const mail = document.getElementById("mail_mod");


  
    if (formuModifica.classList.contains("d-none")) {
      formuModifica.classList.remove("d-none");
      formuModifica.classList.add("d-block");
    }
  
    if (formuNuevo.classList.contains("d-block")) {
      formuNuevo.classList.remove("d-block");
      formuNuevo.classList.add("d-none");
    }

    try {
        console.log("Mostrar dato!");
        const token = await checkAuth();
        console.log("token " + token);
        const consulta = await fetch(`/auth/usuarios/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        res = await consulta.json();
        console.log(res);
        mail.value = res.email
      } catch (error) {
        console.log("Error en la obtención de los datos");
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