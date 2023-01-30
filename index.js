/* ---------------------
El menú de la vista mobile que aparece solo cuando haces clic en el botón hamburguesa
*/
//Al ya estar implementado con CSS el menú hamburguesa se ha realizado lo mismo que con CSS pero con JS
function showNav() {
    var boton = document.getElementById('btn-menu');
    var nav = document.getElementById('navMenu');
    if (boton.checked == false) {
        nav.style.height = 'auto';
        nav.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
    } else {
        nav.style.height = '0';
        nav.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0% 100%)';
    }
}

/* ---------------------
Un elemento ‘percentage scroller’ así (solo la barra, no el círculo): 
https://webdevtrick.com/wp-content/uploads/animated-scroll-percentage-show.mp4 
*/
//Se ha creado el percentage scroller en HTML y se le ha dado funcionalidad con JS
window.addEventListener("scroll", function (){
    var scroller = document.documentElement.scrollTop,
    fullSize = document.documentElement.offsetHeight,
    sizeVP = document.documentElement.clientHeight;
    var width = ((scroller * 100) / (fullSize - sizeVP)).toFixed();
    document.getElementById('scroll2').style.width = width + "%";
});

/* ---------------------
Crear un botón ‘Return to the top’ al fondo que espera 200 milisegundos 
y vuelve al principio de la página con una animación suave 
*/
//Se ha creado el boton en HTML y se le ha dado funcionalidad con JS
var  btnTop = document.getElementById("btn-top");
window.addEventListener("scroll", function (){
    var scroller = document.documentElement.scrollTop;
    if (scroller > 70) {
        btnTop.classList.add("show");
    }else{
        btnTop.classList.remove("show");
    }
});

function syncDelay(milliseconds){
    var start = new Date().getTime();
    var end = 0;
    while( (end - start) < milliseconds){
        end = new Date().getTime();
    }
}

function subirScroll() {
    syncDelay(200);
    window.scrollTo(0,0);
}

/* ---------------------
Implementar validación en el formulario. El nombre tiene que tener entre 2 
y 100 letras, la dirección de correo electrónico tiene que ser válida 
(https://www.emailregex.com/) y tienen que hacer el checkbox. 
Si un campo no es válido, cambiar el color de su border a rojo 
*/
var formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function(e) {
    var inputNombre = document.getElementById("nombre");
    var inputEmail = document.getElementById("email");
    if (inputNombre.value == null || inputNombre.value == "" || inputNombre.value.length < 2 || inputNombre.value.length > 100) {
        e.preventDefault();
        inputNombre.classList.add('error');
    } else {
        inputNombre.classList.remove('error');
    }
    var cadena =  document.getElementById('email').value;
    var patron = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var resultado = patron.test(cadena);
    if (resultado == false) {
        e.preventDefault();
        inputEmail.classList.add('error');
    } else {
        inputEmail.classList.remove('error');
    }
    var inputCheck = document.getElementById('check');
    if (!inputCheck.checked) {
        e.preventDefault();
        inputCheck.classList.add('error');
    } else {
        inputCheck.classList.remove('error');
    }
});
/* ---------------------
Recoger los datos del formulario y mandarselos a un servidor JSON 
de testing como este https://jsonplaceholder.typicode.com/guide/ con fetch()
*/



/*
    if (scroll > fullSize * 0.25) {
         console.log("MAYOR 100");
    }else{
        console.log("MENOR 100");
    }

    // MODIFICAR ELEMENTO CUANDO LLEGUE A FINAL DE PAGINA
    if (fullSize == (scroll + sizeVP)) {
        console.log("FINAL");
    }else{
        console.log("NO FINAL");
    }
*/