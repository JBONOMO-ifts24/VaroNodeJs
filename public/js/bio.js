document.addEventListener("DOMContentLoaded", (event) => {
    mostrarDatos();
    console.log("Hola 🌎 !!!");
  });

  function mostrarDatos() {
    const datos = document.getElementById("datos");
    console.log("Mostrar datos!");
    fetch("/APIpintores/1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        datos.innerHTML="<h2>"+data.nombre_pintor+"</h2><p>"+data.fecha_nac +" - "+ data.fecha_mue +"</p> <p>Lugar de nacimiento: "+data.lugar_nac+ ",  "+ data.pais_nac+ "</p><p>"+data.biograf_pintor+"</p>";

  })
      .catch((error) => console.error("Error:", error));
    }