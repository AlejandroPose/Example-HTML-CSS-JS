function showNav() {
  const boton = document.getElementById("btn-menu");
  const nav = document.getElementById("navMenu");
  if (boton.checked == false) {
    nav.style.height = "auto";
    nav.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
  } else {
    nav.style.height = "0";
    nav.style.clipPath = "polygon(0 0, 0 0, 0 100%, 0% 100%)";
  }
}

window.addEventListener("scroll", function () {
  const scroller = document.documentElement.scrollTop,
    fullSize = document.documentElement.offsetHeight,
    sizeVP = document.documentElement.clientHeight;
  let width = ((scroller * 100) / (fullSize - sizeVP)).toFixed();
  document.getElementById("scroll2").style.width = width + "%";
});

const btnTop = document.getElementById("btn-top");
window.addEventListener("scroll", function () {
  const scroller = document.documentElement.scrollTop;
  if (scroller > 70) {
    btnTop.classList.add("show");
  } else {
    btnTop.classList.remove("show");
  }
});

function syncDelay(milliseconds) {
  const start = new Date().getTime();
  let end = 0;
  while (end - start < milliseconds) {
    end = new Date().getTime();
  }
}

function subirScroll() {
  syncDelay(200);
  window.scrollTo(0, 0);
}

const formulario = document.getElementById("formulario");
const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const inputCheck = document.getElementById("check");
formulario.addEventListener("submit", async (e) => {
  if (inputNombre.value.length < 2 || inputNombre.value.length > 100) {
    e.preventDefault();
    inputNombre.classList.add("error");
    return;
  } else {
    inputNombre.classList.remove("error");
  }
  const patron =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let resultado = patron.test(inputEmail.value);
  if (!resultado) {
    e.preventDefault();
    inputEmail.classList.add("error");
    return;
  } else {
    inputEmail.classList.remove("error");
  }
  if (!inputCheck.checked) {
    e.preventDefault();
    inputCheck.classList.add("error");
    return;
  } else {
    inputCheck.classList.remove("error");
  }

  const result = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      name: inputNombre.value,
      email: inputEmail.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const parsedResult = await result.json();
  console.log("FECTH: " + parsedResult);
});

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

setTimeout(() => {
  let insertado = localStorage.getItem("insert");
  if (!insertado) {
    localStorage.setItem("insert", true);
    modal.style.display = "flex";
    modal.style.height = "100vh";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.overflow = "hidden";
  }
}, 5000);

window.addEventListener("scroll", function () {
  const scroller = document.documentElement.scrollTop,
    fullSize = document.documentElement.offsetHeight;
  if (scroller >= fullSize * 0.25) {
    let insertado = localStorage.getItem("insert");
    if (!insertado) {
      localStorage.setItem("insert", true);
      modal.style.display = "flex";
      modal.style.height = "100vh";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.overflow = "hidden";
    }
  }
});

const formPop = document.getElementById("popForm");
const emailPop = document.getElementById("popEmail");
formPop.addEventListener("submit", async (e) => {
  let patron =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let resultado = patron.test(emailPop.value);
  if (!resultado) {
    e.preventDefault();
    emailPop.classList.add("error");
    return;
  } else {
    emailPop.classList.remove("error");
  }
  const result = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      email: emailPop.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const parsedResult = await result.json();
  console.log("FECTH: " + parsedResult);
});

span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    modal.style.display = "none";
  }
});


async function extraerDatosAPI() {
  await fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json"
  )
    .then((resp) => resp.json())
    .then(function (data) {
      dolar = data.eur.usd;
      libra = data.eur.gbp;
    })
    .catch(function (error) {
      console.log(error);
    });
  let cambio = [dolar, libra];
  return cambio;
}

async function convertidor() {
  const selector = document.getElementById("conversor").value;
  const cambio = await extraerDatosAPI();
  let dolar = cambio[0],
    libra = cambio[1];
  console.log(dolar, libra);
  let professional = 25,
    premium = 60;
  let basicH4 = document.getElementById("basicPrice"),
    professionalH4 = document.getElementById("professionalPrice"),
    premiumH4 = document.getElementById("premiumPrice");
  switch (selector) {
    case "eur": //Caso Base
      basicH4.innerHTML = "€" + 0;
      professionalH4.innerHTML = "€" + professional;
      premiumH4.innerHTML = "€" + premium;
      break;
    case "usd":
      basicH4.innerHTML = "$" + 0;
      professionalH4.innerHTML = "$" + (professional * dolar).toFixed();
      premiumH4.innerHTML = "$" + (premium * dolar).toFixed();
      break;
    case "gbp":
      basicH4.innerHTML = "£" + 0;
      professionalH4.innerHTML = "£" + (professional * libra).toFixed();
      premiumH4.innerHTML = "£" + (premium * libra).toFixed();
      break;
  }
}

class Slider {
  constructor(slider) {
    this.slider = slider;
  }

  showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("image");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activated", "");
    }
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " activated";
  }

  plusSlides(n) {
    this.showSlides((slideIndex += n));
  }

  currentSlide(n) {
    this.showSlides((slideIndex = n));
  }
}

let slideIndex = 1;
const slider = new Slider('imgSlider');
setInterval(() => slider.plusSlides(1), 5000);

let previous = document.getElementById('previo');
console.log(previous);
let next = document.getElementById('ultimo');
previous.addEventListener('click', () => slider.plusSlides(-1));
next.addEventListener('click', () => slider.plusSlides(1));

let dot1 = document.getElementById('dot1');
let dot2 = document.getElementById('dot2');
let dot3 = document.getElementById('dot3');
let dot4 = document.getElementById('dot4');
let dot5 = document.getElementById('dot5');
dot1.addEventListener('click', () => slider.currentSlide(1));
dot2.addEventListener('click', () => slider.currentSlide(2));
dot3.addEventListener('click', () => slider.currentSlide(3));
dot4.addEventListener('click', () => slider.currentSlide(4));
dot5.addEventListener('click', () => slider.currentSlide(5));
