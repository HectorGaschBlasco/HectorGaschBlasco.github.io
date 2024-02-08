// Definición de usuarios registrados en formato JSON
const jsonRegistrados = `[{
    "nombre": "juan",
    "apellidos": "garcía",
    "edad": 23,
    "sexo": "Masculino",
    "email": "juan.garcia@gmail.com",
    "contraseña": "abcde"},  
{
    "nombre": "lucia",
    "apellidos": "martinez",
    "edad": 25,
    "sexo": "Femenino",
    "email": "lucia.martinez@gmail.com",
    "contraseña":"1234"
}]`

// Parseo de la cadena JSON a un array de objetos de usuarios
const registrados = JSON.parse(jsonRegistrados)

// Definición de la clase Registrado para representar a un usuario
class Registrado {
    constructor(nombre, apellido, edad, sexo, email, contraseña) {
        this.nombre = nombre;
        this.apellidos = apellido;
        this.edad = edad;
        this.sexo = sexo;
        this.email = email;
        this.contraseña = contraseña;
    }
}
// Creación de una colección de objetos 'Registrado' a partir del array de usuarios registrados
const collecion_registrados = registrados.map(user => new Registrado(user.nombre, user.apellidos, user.edad,
                                                                     user.sexo, user.email, user.contraseña))

// Función para filtrar usuarios de la colección según los valores del formulario
const filter_user_from_collection = () => {
    const nombre = document.getElementById("nombre").value.trim().toLowerCase();
    const apellido = document.getElementById("apellidos").value.trim().toLowerCase();
    const edad = document.getElementById("edad").value.trim().toLowerCase();
    const sexo = document.getElementById("sexo").value.trim().toLowerCase();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const contraseña = document.getElementById("contraseña").value.trim().toLowerCase();
    
    // Filtrado de usuarios según los valores del formulario
    const filtrado = collecion_registrados.filter((user) => 
        user.nombre.toLowerCase() === nombre && 
        user.apellidos.toLowerCase() === apellido && 
        user.edad.toString() === edad && 
        user.sexo.toLowerCase() === sexo && 
        user.email.toLowerCase() === email && 
        user.contraseña.toLowerCase() === contraseña
    );
    
    return filtrado;
} 

// Inicialización de la imagen y sus estilos
const initialize_img = function(){
    const span = document.querySelector("span.icon")
    const img = document.createElement("img")
    img.setAttribute("src", "./imgs/error.png")
    img.setAttribute("alt", "check-icon")
    img.setAttribute("id", "img")
    img.style.width = "20px"
    img.style.height = "20px"
    img.style.display = "none"
    span.appendChild(img)
}

// Función para comprobar si los campos del formulario están rellenos
const comprobarCamposRellenos = function(){
    msg = document.querySelector("#errorcase")
    nombre = document.getElementById("nombre")
    apellidos = document.getElementById("apellidos")
    edad = document.getElementById("edad")
    sexo = document.getElementById("sexo")
    email = document.getElementById("email")
    contraseña = document.getElementById("contraseña")

    // Validación del nombre, mensaje de error y focus en el campo
    if(nombre.value.trim() === ""){
        msg.textContent = "El campo nombre no puede estar vacío"
        nombre.focus()

        // Opcional: añadir animación de error
        nombre.classList.add("shake")
        setTimeout(() => {
            nombre.classList.remove("shake")
        }, 1000)
        return false
    }

    // Validación de los apellidos, mensaje de error y focus en el campo
    if(apellidos.value.trim() === ""){
        msg.textContent = "El campo apellidos no puede estar vacío"
        apellidos.focus()

        // Opcional: añadir animación de error
        apellidos.classList.add("shake")
        setTimeout(() => {
            apellidos.classList.remove("shake")
        }, 1000)
        return false
    }

    // Validación de la edad, mensaje de error y focus en el campo
    if(edad.value.trim() === ""){
        msg.textContent = "El campo edad no puede estar vacío"
        edad.focus()

        // Opcional: añadir animación de error
        edad.classList.add("shake")
        setTimeout(() => {
            edad.classList.remove("shake")
        }, 1000)
        return false
    }

    // Validación del sexo, mensaje de error y focus en el campo
    if(sexo.value.trim() === ""){
        msg.textContent = "El campo sexo no puede estar vacío"
        sexo.focus()

        // Opcional: añadir animación de error
        sexo.classList.add("shake")
        setTimeout(() => {
            sexo.classList.remove("shake")
        }, 1000)
        return false
    }

    // Validación del email, mensaje de error y focus en el campo
    if(email.value.trim() === ""){
        msg.textContent = "El campo email no puede estar vacío"
        email.focus()

        // Opcional: añadir animación de error
        email.classList.add("shake")
        setTimeout(() => {
            email.classList.remove("shake")
        }, 1000)
        return false
    }

    // Validación de la contraseña, mensaje de error y focus en el campo
    if(contraseña.value.trim() === ""){
        msg.textContent = "El campo contraseña no puede estar vacío"
        contraseña.focus()

        // Opcional: añadir animación de error
        contraseña.classList.add("shake")
        setTimeout(() => {
            contraseña.classList.remove("shake")
        }, 1000)
        return false
    } return true
}

// Función para borrar los campos del formulario
const borrarCampos = function(){
    document.getElementById("nombre").value = ""
    document.getElementById("apellidos").value = ""
    document.getElementById("edad").value = ""
    document.getElementById("sexo").value = ""
    document.getElementById("email").value = ""
    document.getElementById("contraseña").value = ""
}

// Inicialización de la imagen
initialize_img()

// Función principal de validación
const validar = function(){
    if (comprobarCamposRellenos()){
        const filtrado = filter_user_from_collection()
        if(filtrado.length === 0){ // Si el filtrado esta vacio significa que no hay ningun usuario registrado con esos datos
            const img = document.querySelector("img") 
            img.style.display = "block" // Muestra la imagen de error
            document.querySelector("#errorcase").textContent = "Usuario no registrado"

            // opcional: añadir animación de error; mover todos los elementos del formulario
            const formElements = document.querySelectorAll(".controls");
            formElements.forEach(element => element.classList.add("shake"));
            button.classList.add("shake");
            
            // Oculta la imagen después de 2 segundos y borra los campos del formulario
            setTimeout(() => {
                // Opcional: quitar animación de error
                formElements.forEach(element => element.classList.remove("shake"));
                button.classList.remove("shake");

                // Oculta la imagen y borra los campos del formulario
                borrarCampos()
                img.style.display = "none"

                // Oculta el mensaje de error
                document.querySelector("#errorcase").textContent = ""
            }, 2000)
        } else {
            // Borramos el mensaje del párrafo del error
            document.querySelector("#errorcase").textContent = ""
            const img = document.querySelector("img")
            img.style.display = "block"
            img.setAttribute("src", "./imgs/success.png")
            
            // Crea un nuevo parrafo indicando que el usuario se ha registrado correctamente
            newP = document.createElement("p")
            newP.textContent = "Usuario registrado correctamente"
            document.querySelector("form").appendChild(newP)

            // Redirige a la página exitosa después de 3 segundos
            setTimeout(() => {
                window.location.href = "src/dashboard.html"
            }, 3000 )
        }
    }
    
}

// Captura del botón de validación
const button = document.querySelector("button")

// Cambio de color del botón al pasar el ratón por encima
button.addEventListener("mouseover", ()=>{
    button.style.backgroundColor = "#056d28"
    })

// Devuelvo el color original al botón al quitar el ratón
button.addEventListener("mouseout", ()=>{
    button.style.backgroundColor = "#083eb2"
})

// Validación al pulsar Enter
document.body.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        validar()
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        // Captura el elemento actual que tiene el foco
        const activeElement = document.activeElement;

        // Obtiene la lista de elementos de entrada del formulario
        const inputElements = document.querySelectorAll(".controls");

        // Encuentra el índice del elemento actual en la lista
        const currentIndex = Array.from(inputElements).indexOf(activeElement);

        // Calcula el índice del siguiente o anterior elemento
        let nextIndex;
        if (e.key === "ArrowDown") {
            nextIndex = (currentIndex + 1) % inputElements.length;
        } else if (e.key === "ArrowUp") {
            nextIndex = (currentIndex - 1 + inputElements.length) % inputElements.length;
        }

        // Hace focus en el siguiente o anterior elemento
        inputElements[nextIndex].focus();
    }
})

// Acceso a los campos del formulario
nombre = document.getElementById("nombre")
apellidos = document.getElementById("apellidos")
edad = document.getElementById("edad")
sexo = document.getElementById("sexo")
email = document.getElementById("email")
contraseña = document.getElementById("contraseña")

// Cambio de color del borde de los campos del nombre al hacer focus y blur
nombre.addEventListener("focus", ()=>{
    nombre.style.borderColor = "#083eb2"
    nombre.placeholder = ""
})

nombre.addEventListener("blur", ()=>{
    nombre.style.borderColor = "#1f53c5"
    nombre.placeholder = "Ingrese su Nombre"
})

// Cambio de color del borde de los campos de los apellidos al hacer focus y blur
apellidos.addEventListener("focus", ()=>{
    apellidos.style.borderColor = "#083eb2"
    apellidos.placeholder = ""
})

apellidos.addEventListener("blur", ()=>{
    apellidos.style.borderColor = "#1f53c5"
    apellidos.placeholder = "Ingrese sus Apellidos"
})

// Cambio de color del borde de los campos de la edad al hacer focus y blur
edad.addEventListener("focus", ()=>{
    edad.style.borderColor = "#083eb2"
    edad.placeholder = ""
})

edad.addEventListener("blur", ()=>{
    edad.style.borderColor = "#1f53c5"
    edad.placeholder = "Ingrese su Edad"
})

// Hacer que el campo de la edad no se incremente o decremente con las teclas arrow up y arrow down
edad.addEventListener("keydown", (e)=>{
    if(e.key === "ArrowUp" || e.key === "ArrowDown"){
        e.preventDefault()
    }
})

// Cambio de color del borde de los campos del sexo al hacer focus y blur
sexo.addEventListener("focus", ()=>{
    sexo.style.borderColor = "#083eb2"
})

sexo.addEventListener("blur", ()=>{
    sexo.style.borderColor = "#1f53c5"
})

sexo.addEventListener("keydown", (e)=> {
    if (e.key==="ArrowDown" || e.key === "ArrowUp"){
        e.preventDefault()
    }
})

// Cambio de color del borde de los campos del email al hacer focus y blur
email.addEventListener("focus", ()=>{
    email.style.borderColor = "#083eb2"
    email.placeholder = ""
})

email.addEventListener("blur", ()=>{
    email.style.borderColor = "#1f53c5"
    email.placeholder = "Ingrese su Email"
})

// Cambio de color del borde de los campos de la contraseña al hacer focus y blur
contraseña.addEventListener("focus", ()=>{
    contraseña.style.borderColor = "#083eb2"
    contraseña.placeholder = ""
})

contraseña.addEventListener("blur", ()=>{
    contraseña.style.borderColor = "#1f53c5"
    contraseña.placeholder = "Ingrese su Contraseña"
})

