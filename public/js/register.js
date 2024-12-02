function ingresar() {
  const nombre_usuario = document.getElementById("user");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const archivo = document.getElementById("imagen");
  const avi = document.getElementById("avisos");

  //validación de datos
  if (nombre_usuario.value.length < 3 || email.value.length < 3 || password.value.length <3) {
    const p = document.createElement("div");
    let mensaje =
      '<div class="alert alert-danger" role="alert">Los datos ingresados no son correctos</div>';

    p.innerHTML = mensaje;
    avi.appendChild(p);
    nombre_usuario.value ="";
    email.value="";
    password.value="";

    setTimeout(() => {
      avi.innerHTML = "";
    }, 4000);
  } else {

  // Nos comunicamos con nuestro backend usando fetch

  const formData = new FormData();
  formData.append("username", nombre_usuario.value);
  formData.append("email", email.value);
  formData.append("imagen", archivo.files[0]);
  formData.append("password",password.value);
  const res = fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      
    },
    body: formData,
    
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(data.status == "ok"){
      avi.innerHTML="<p>😄" + data.mensaje +"😄</p>"
      nombre_usuario.value ="";
        email.value="";
        password.value="";
        setTimeout(() => {
            avi.innerHTML = "";
          }, 4000);
      }
      else{
        avi.innerHTML="<p>😵‍💫" + data.mensaje +"😵‍💫</p>"
        setTimeout(() => {
            avi.innerHTML = "";
          }, 4000);
      }
    })
    .catch((error) => console.error("Error:", error));
  }
}
