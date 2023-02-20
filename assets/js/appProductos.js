const stockProductos = [
    {
        id: 13,
        nombre: "Nutrilon",
        tipo: "alimento",
        desc: "pote x 1000 grs.",
        precio: 9000,
        img: '../assets/img/nutrilon.jpg',
        cantidad: 1
    },

    {
        id: 14,
        nombre: "Ensure",
        tipo: "alimento",
        desc: "pote x 1000 grs.",
        precio: 5000,
        img: '../assets/img/ensure.jpg',
        cantidad: 1

    },

    {
        id: 15,
        nombre: "Lactoproteyn",
        tipo: "alimento",
        desc: "pote x 1000 grs.",
        precio: 7000,
        img: '../assets/img/lactoproteyn.jpg',
        cantidad: 1
    },

    {
        id: 16,
        nombre: "Alfare",
        tipo: "alimento",
        desc: "pote x 1000 grs.",
        precio: 10000,
        img: '../assets/img/alfare.jpg',
        cantidad: 1
    },

    {
        id: 17,
        nombre: "Fresubin",
        tipo: "alimento",
        desc: "pote x 1000 grs.",
        precio: 9500,
        img: '../assets/img/fresubin.jpg',
        cantidad: 1
    },

    {
        id: 18,
        nombre: "Alterna",
        tipo: "alimento",
        desc: "pote x 1000 grs.",
        precio: 9500,
        img: '../assets/img/alterna.jpg',
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
            /*
            Swal.fire({
              icon: 'success',
              title: 'Éxito!',
              text: 'Perfecto! Pronto Recibiras un correo conla informacion de tu compra'
            }); */
        }
    });
}

stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img } = prod;
    if (contenedor) {
        contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: $${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <button id="btn-comprar-producto" class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
    }
});

const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)

    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === id)
        carrito.push(item)
    }
    mostrarCarrito()

};

const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
        modalBody.innerHTML = "";
        carrito.forEach((prod) => {
            const { id, nombre, precio, desc, img, cantidad } = prod;
            console.log(modalBody);
            modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: $${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
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
            (acc, prod) => acc + prod.cantidad * prod.precio,
            0
        );
    }

    guardarStorage();
};

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

function eliminarProducto(id) {
    const prodId = id;
    carrito = carrito.filter((prod) => prod.id !== prodId);
    mostrarCarrito();
};

//mensaje asincronico "enviar mail"
const enviando = document.querySelector('.swal2-confirm')
const enviandoComprobante = () => {
    alert('Enviando comprobante...')
};
function procesarPedido() {
    carrito.forEach((prod) => {
        const listaCompra = document.querySelector("#lista-compra tbody");
        const { nombre, precio, img, cantidad } = prod;
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
};

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
                alert("Coloque una dirección de correo electrónico válida");
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
            }, 000)


        }, 000)
    }
    localStorage.clear()

};


// Mostrar catalogo con FETCH 

const mostrarCatalogo = document.getElementById('contenedor-catalogo')

fetch('../../data/catalogoServicios.json')
    .then((resp) => resp.json())
    .then(data => {


        data.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('card-catalogo');
            div.innerHTML += `<div class="card-image">
                          <img src=${producto.img}>
                          <span class="card-title">${producto.nombre}</span>
                      </div>
                      <div class="card-content"><br>
                            <p>${producto.desc}</p>
                            <p>$ ${producto.precio},00</p>
                      </div>
                      `
            mostrarCatalogo.appendChild(div);
        });
    });