# VaroNodeJs
Backend en Node.js para la página de Remedios Varo
Base de datos en MySQL
Uso de Mulster para subir archivos
Para login: Json Web Token-

# Para hacer
- Ver como se modifican los cuadros (controller)
- Cambiar mensajes: En la página de admin hay que estar logueado con permisos de admin para borrar un mensaje.

# Endpoints
## Autenticación
- POST /auth/register = Registrar usuario. (datos requeridos: username, email, password)
- POST /auth/login = Login de usuario. (datos requeridos: username, password)
- GET /auth/protected = Prueba de uso (Se tiene que estar logueado)
- GET /auth/usuarios = Obtener todos los usuarios (Se tiene que estar logueado)
- GET /auth/usuarios/id = Obtener usuario por id (Se tiene que estar logueado)
- PUT /auth/usuarios/id = Modificación de usuario (Se tiene que estar logueado con un usuario con permisos de administrador)(datos requeridos: email, password)
- DELETE /auth/login/id = Borrar usuario (Se tiene que estar logueado con un usuario con permisos de administrador)

## Mensajes
- GET /mensajes = Obtener todos los mensajes.
- GET /mensajes/id = Obtener un mensaje en específico.
- POST /mensajes = Crear un nuevo mensaje. (datos requeridos: nombre_usuario, mensaje)
- PUT /mensajes = Modificar un mensaje. (datos requeridos: nombre_usuario, mensaje)
- DELETE /mensajes/id = Borrar un mensaje

## Cuadros
- GET /cuadros = Obtener todos los cuadros.
- GET /cuadros/id = Obtener un cuadro en específico
- POST /cuadros = Crear un nuevo cuadro. (Se tiene que estar logueado para postear un cuadro). (datos requeridos: nombre_cuadro , pintor , ano_realizado, *archivo de imagen*, ubicacion_orig)
- PUT /cuadros = Modificar un cuadro. (Se tiene que estar logueado para postear un cuadro). (datos requeridos: nombre_cuadro, pintor, ano_realizado,ubicacion_orig)
- DELETE /cuadros/id = Borrar un cuadro. (Se tiene que estar logueado con un usuario con permisos de administrador para borrar un cuadro).

## Países
- GET /paises = Obtener todos los países. (Se tiene que estar logueado)
- GET /paises/:idpais = Obtener un país por ID. (Se tiene que estar logueado)
- PUT /paises/:idpais = Actualizar un país (sólo para administradores). (datos requeridos: "nombre")
- POST /paises/:idpais = Crear un nuevo país (sólo para administradores). (datos requeridos: "nombre")
- DELETE /paises/:idpais = Eliminar un país (sólo para administradores).

## Ciudades
- GET /ciudades = Obtener todas las ciudades. (Se tiene que estar logueado)
- GET /ciudades/id = Obtener una ciudad. (Se tiene que estar logueado)
- POST /ciudades - Crear una nueva ciudad.(sólo para administradores) (datos requeridos: "ciudad", "pais").
- PUT /paises/id = Actualizar una ciudad (sólo para administradores) (datos requeridos: "nombre", "pais").

## Pintores
- GET /pintores = Obtener todos los pintores.
- GET /pintores/id = Obtener un pintor.
- POST /pintores - Crear un nuevo pintor (sólo para administradores) (datos requeridos: nombre_pintor, fecha_nac,fecha_mue,biograf_pintor, ciudad).
- PUT /pintores = Actualizar una ciudad (sólo para administradores).(datos requeridos: nombre_pintor, fecha_nac,fecha_mue,biograf_pintor, ciudad)
- DELETE /pintores/id  Eliminar un pintor (sólo para administradores).


# Enunciado del proyecto:

## Criterios de evaluación -PROYECTO INTEGRADOR 2024-
Cada alumno deberá realizar una presentación del Proyecto Integrador 2024 - 2025, detallando cada una de
las secciones y módulos que el mismo contendrá, siendo requisito inicial de la totalidad del Proyecto
para aprobar las cursadas de Ingeniería de Software y Back End los siguientes puntos:
El sitio web debe poseer al menos 6 páginas HTML o 6 secciones si se trata de un sitio One Page
Poseer una estructura HTML maquetada con Flexbox y/o Grid.
El Front End debe incluir un formulario de CONTACTO, un formulario de REGISTRACION, con al menos 5 campos
que incluya (un checkbox o radiobutton), un select y una imagen.
Utilizar al menos tres animaciones, transformaciones o transiciones
Utilizar iframes y/o íconos de FontAwesome y/o fuentes locales o bien de Google Fonts.
El sitio debe hacer una llamada GET a una API pública o a API de pruebas propia (GET de un JSON)
Es optativo incluir algún elemento de Bootstrap y/o frameworks de JavaScript (React, Vue.js, Angular o
similar) como tarea de investigación y exploración autodidacta en el ámbito de la programación JavaScript
y sus frameworks.
Debe ser TOTALMENTE RESPONSIVE con mínimo 3 puntos de corte con media querys para 3 tamaños de dispositivos
(PC escritorio, Tablet, Celular). Para el diseño debe usarse CSS.
La base de datos debe desarrollarse en lenguaje SQL y contener como mínimo 6 tablas relacionales.
Una vez logueado en el sistema deberá permitir realizar los CRUD de las tablas. (Tipos de rutas
y métodos HTTP, GET, POST, PUT, PATCH y DELETE)
Se debe poder realizar borrado lógico y físico de los datos según corresponda.
Se realizarán entregas parciales de las tablas con sus respectivas rutas y CRUD, según cronograma
detallado en este documento.
Se considerará la presentación general del proyecto, la legibilidad del mismo, la navegación sin llegar
a puntos de no retorno, la optimización de imágenes para la web y el uso de favicon.
El trabajo práctico deberá compartirse mediante un repositorio de GitHub. (Obligatorio)
La página deberá subirse a un servidor on-line para poder ser navegada por el Docente. Ejemplo: Vercel,
Replit, Alwaysdata, Netlify o similar. (Obligatorio)
El sitio web debe estar estructurado utilizando etiquetas semánticas HTML correctamente. Debe pasar la
validación de https://validator.w3.org/ sin errores. (Obligatorio)
El Back End debe estar integrado con un Front End (Obligatorio)

Cronograma de Entregas parciales de las tablas con sus respectivas rutas y CRUD
Tabla 1 – 9 de octubre
Tabla 2 – 16 de octubre
Tabla Usuarios – 20 de octubre
Tabla 4 – 23 de octubre
Tabla 5 – 27 de octubre
Tabla 6 – 30 de octubre

"El docente se reserva el derecho de modificar, ajustar o actualizar las cláusulas y requisitos para la
entrega de los trabajos prácticos durante el transcurso de la cursada. Estas modificaciones, si las
hubiera, serán comunicadas oportunamente a los estudiantes y estarán orientadas a asegurar el
cumplimiento de los objetivos pedagógicos del curso, adaptándose a las necesidades y condiciones que
surjan en el proceso de enseñanza-aprendizaje."
