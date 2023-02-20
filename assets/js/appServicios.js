const listadoServicios = [
    {
        id: 1,
        nombre: "Médicos generalista",
        tipo: "prestacion",
        desc: "Proporciona una mirada integral de la población y de sus problemas de salud.",
        precio: 10000,
        img: '../assets/img/1.png',
        cantidad: 1
    },

    {
        id: 2,
        nombre: "Médicos interconsultores",
        tipo: "prestacion",
        desc: "Tratamiento del dolor crónico, valoración y el manejo de las diferentes necesidades",
        precio: 10000,
        img: '../assets/img/2.png',
        cantidad: 1
    },
    {
        id: 3,
        nombre: "Enfermería general",
        tipo: "prestacion",
        desc: "Promover la salud, prevenir la enfermedad, restaurar la salud y aliviar el sufrimiento.",
        precio: 10000,
        img: '../assets/img/3.png',
        cantidad: 1
    },

    {
        id: 4,
        nombre: "Psicología",
        tipo: "prestacion",
        desc: "Ayuda a enfrentar situaciones estresantes y a eliminar los obstáculos que nos impiden alcanzar nuestros objetivos.",
        precio: 10000,
        img: '../assets/img/4.png',
        cantidad: 1
    },
    {
        id: 5,
        nombre: "Kinesiología",
        tipo: "prestacion",
        desc: "Prevención, conservación, evaluación, tratamiento y recuperación somatofuncional de las personas.",
        precio: 10000,
        img: '../assets/img/5.png',
        cantidad: 1
    },

    {
        id: 6,
        nombre: "Estimulación temprana",
        tipo: "prestacion",
        desc: "Optimiza el desarrollo normal del niño; prevenir la aparición de déficit asociados a un riesgo biológico, psicológico o social.",
        precio: 10000,
        img: '../assets/img/6.png',
        cantidad: 1
    },
    {
        id: 7,
        nombre: "Psicomotrcista",
        tipo: "prestacion",
        desc: "Estimula la percepción del entorno, fomenta el aprendizaje y la concentración, fortalece la autoestima infantil.",
        precio: 10000,
        img: '../assets/img/7.png',
        cantidad: 1
    },

    {
        id: 8,
        nombre: "Fonoaudiología",
        tipo: "prestacion",
        desc: "Establece o reestablece las habilidades y funciones de la comunicación humana. ",
        precio: 10000,
        img: '../assets/img/8.png',
        cantidad: 1
    },
    {
        id: 9,
        nombre: "Terapia ocupacional",
        tipo: "prestacion",
        desc: "Prevención de discapacidades y disfunciones ocupacionales, mejora de la capacidad física e intelectual de los pacientes.",
        precio: 10000,
        img: '../assets/img/9.png',
        cantidad: 1
    },

    {
        id: 10,
        nombre: "Nutrición",
        tipo: "prestacion",
        desc: "Un nutricionista te ayuda a conocer cuál es tu necesidad calórica y te enseña cómo lograr un aporte suficiente de vitaminas y minerales.",
        precio: 10000,
        img: '../assets/img/10.png',
        cantidad: 1
    },
    {
        id: 11,
        nombre: "Asistente social",
        tipo: "prestacion",
        desc: "El asistente social se encarga de garantizar los derechos humanos y de fomentar la inclusión social.",
        precio: 10000,
        img: '../assets/img/11.png',
        cantidad: 1
    },
    {
        id: 12,
        nombre: "Acompañante terapéutico",
        tipo: "prestacion",
        desc: "Favorecer el desarrollo biopsicosocial y/o autovalimiento de la persona asistida.Fortalecer los vínculos familiares y sociales;.",
        precio: 10000,
        img: '../assets/img/12.png',
        cantidad: 1
    }
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
});
if (formulario) {
    formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
        carrito.length = [];
        mostrarCarrito();
    });
}

if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: "¡Tu carrito está vacio!",
                text: "Compra algo para continuar con la compra",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } else {
            location.href = "compra.html";
        }
    });
}

listadoServicios.forEach((serv) => {
    const { id, nombre, precio, desc, img } = serv;
    if (contenedor) {
        contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: $${precio}</p>
      <p class="card-text">Descripción: ${desc}</p>
      <button class="btn btn-primary" onclick="agregarServicio(${id})">Comprar servicio</button>
    </div>
  </div>
    `;
    }
});

const agregarServicio = (id) => {
    const existe = carrito.some(serv => serv.id === id)

    if (existe) {
        const serv = carrito.map(serv => {
            if (serv.id === id) {
                serv.cantidad++
            }
        })
    } else {
        const item = listadoServicios.find((serv) => serv.id === id)
        carrito.push(item)
    }
    mostrarCarrito()

};

const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
        modalBody.innerHTML = "";
        carrito.forEach((serv) => {
            const { id, nombre, precio, desc, img, cantidad } = serv;
            console.log(modalBody);
            modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>servicio: ${nombre}</p>
      <p>Precio: $${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarServicio(${id})">Eliminar servicio</button>
        </div>
      </div>
      
  
      `;
        });
    }

    if (carrito.length === 0) {
        console.log("Nada");
        modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
    } else {
        console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;

    if (precioTotal) {
        precioTotal.innerText = carrito.reduce(
            (acc, serv) => acc + serv.cantidad * serv.precio,
            0
        );
    }

    guardarStorage();
};

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarServicio(id) {
    const servId = id;
    carrito = carrito.filter((serv) => serv.id !== servId);
    mostrarCarrito();
}
function procesarPedido() {
    carrito.forEach((prod) => {
        const listaCompra = document.querySelector("#lista-compra tbody");
        const { id, nombre, precio, img, cantidad } = prod;
        if (listaCompra) {
            const row = document.createElement("tr");
            row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
            listaCompra.appendChild(row);
        }
    });
    totalProceso.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
    );
}

function enviarCompra(e) {
    e.preventDefault()
    const cliente = document.querySelector('#cliente').value
    const email = document.querySelector('#correo').value

    if (email === '' || cliente == '') {
        Swal.fire({
            title: "¡Debes completar tu email y nombre!",
            text: "Rellena el formulario",
            icon: "error",
            confirmButtonText: "Aceptar",
        })
    } else {

        const btn = document.getElementById('button');

        // document.getElementById('procesar-pago')
        //  .addEventListener('submit', function(event) {
        //    event.preventDefault();

        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_qxwi0jn';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Finalizar compra';
                alert('Correo enviado!');
            }, (err) => {
                btn.value = 'Finalizar compra';
                alert(JSON.stringify(err));
            });

        const spinner = document.querySelector('#spinner')
        spinner.classList.add('d-flex')
        spinner.classList.remove('d-none')

        setTimeout(() => {
            spinner.classList.remove('d-flex')
            spinner.classList.add('d-none')
            formulario.reset()

            const alertExito = document.createElement('p')
            alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
            alertExito.textContent = 'Compra realizada correctamente'
            formulario.appendChild(alertExito)

            setTimeout(() => {
                alertExito.remove()
            }, 5000)

        }, 5000)
    }
    localStorage.clear()

};

// Mostrar catalogo con FETCH 

const mostrarCatalogo = document.getElementById('contenedor-catalogo')

fetch('../../data/catalogoProductos.json')
    .then((resp) => resp.json())
    .then(data => {


        data.forEach(servicio => {
            const div = document.createElement('div');
            div.classList.add('card-catalogo');
            div.innerHTML += `
        <div class="card-image-catalogo">
              <img src=${servicio.img}>
            <span class="card-title">${servicio.nombre}</span>
        </div>
        <div class="card-content"><br>
              <i>${servicio.desc}</i>
              <p>$ ${servicio.precio},00</p>
        </div>
        `
            mostrarCatalogo.appendChild(div);
        });
    });