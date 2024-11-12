function ingresar() {
  const nombre_usuario = document.getElementById("user");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
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
  const res = fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: nombre_usuario.value,
      email: email.value,
      password: password.value,
    }),
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
