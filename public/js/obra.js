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
                console.log("tipo de dato: " + typeof(cuadro.ubicacion_orig))
                if (typeof(cuadro.ubicacion_orig) == "string"){
                const [latitud, longitud] = cuadro.ubicacion_orig.split(',').map(Number);
                console.log(latitud);
                console.log(longitud);
                p.innerHTML ="<h2>"+ cuadro.nombre_cuadro+"</h2> <p>Año: "+ cuadro.ano_realizado+"</p> <img src= 'uploads/"+cuadro.nombre_archivo+"' alt='"+cuadro.nombre_cuadro+"'/><h3>Ubicación del cuadro original</h3> <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2614.388460129942!2d"+longitud+"!3d"+latitud+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37ac89e2c61a1%3A0x880cf0bd2c794090!2sHarvard%20%S20C00s%20%20The%S0{en]{es}Harvard%20Yard!5e0!3m2!1ses!2sar!4v1694094403275!5m2!1ses!2sar&markers="+longitud+","+latitud+"%40Cuadro' width='600' height='450' style='border:0;' allowfullscreen=''   loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>";
                cuadros.appendChild(p);
              }else{
                p.innerHTML ="<h2>"+ cuadro.nombre_cuadro+"</h2> <p>Año: "+ cuadro.ano_realizado+"</p> <img src= 'uploads/"+cuadro.nombre_archivo+"' alt='"+cuadro.nombre_cuadro+"'/><h3>Ubicación del cuadro original</h3><p>Desconocida</p> ";
                cuadros.appendChild(p);
              }
                }

            });
        

        }

  })
      .catch((error) => console.error("Error:", error));
    }