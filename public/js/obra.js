document.addEventListener("DOMContentLoaded", (event) => {
    mostrarDatos();
    console.log("Hola 🌎 !!!");
  });

  function mostrarDatos() {
    const cuadros = document.getElementById("cuadros");
    console.log("Mostrar datos!");
    fetch("/APIcuadros/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && Array.isArray(data)) {
            
            data.forEach((cuadro) => {
                if(cuadro.pintor == "Remedios Varo"){
                const p = document.createElement("div");
                p.innerHTML ="<h2>"+ cuadro.nombre_cuadro+"</h2> <p>Año: "+ cuadro.ano_realizado+"</p> <img src= 'uploads/"+cuadro.nombre_archivo+"' alt='"+cuadro.nombre_cuadro+"'/>";
                cuadros.appendChild(p);
                }

            });
        

        }

  })
      .catch((error) => console.error("Error:", error));
    }