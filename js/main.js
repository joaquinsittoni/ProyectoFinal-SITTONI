const phoneContent = document.getElementById("phoneContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const getProducts = async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    data.forEach((product) => {
      const content = document.createElement("div");
      content.className = "card";
      content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">${product.precio} $</p>
      `;

      

      const comprar = document.createElement("button");
      comprar.innerText = "agregar al carrito";
      comprar.className = "agregar al carrito";
      content.append(comprar);

      comprar.addEventListener("click", () => {
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

        if (repeat) {
          carrito.forEach((prod) => {
            if (prod.id === product.id) {
              prod.cantidad++;
            }
          });
        } else {
          carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad || 1,
          });

          carritoCounter();
          saveLocal();

          Swal.fire({
            icon: 'success',
            title: '¡Producto agregado al carrito!',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });

      phoneContent.append(content);
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};
getProducts();

const finalizarCompraButton = document.getElementById("finalizarCompra");

let compraFinalizada = false;

const vaciarCarrito = () => {
  carrito = []; 
  saveLocal();
  carritoCounter(); 
};

const finalizarCompra = () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: 'El carrito está vacío',
      text: 'Agrega productos a tu carrito antes de finalizar la compra.',
      icon: 'warning',
      confirmButtonText: 'Cerrar'
    });
    return;
  }

  Swal.fire({
    title: "¡Compra finalizada con éxito!",
    icon: "success",
    confirmButtonText: "OK"
  }).then((result) => {
    if (result.isConfirmed) {
      compraFinalizada = true;
      finalizarCompraButton.disabled = true;
      vaciarCarrito(); 
    }
  });
};

finalizarCompraButton.addEventListener("click", finalizarCompra);
getProducts();
const verCompradosButton = document.getElementById("verCompradosButton");
const compradosContainer = document.getElementById("compradosContainer");

