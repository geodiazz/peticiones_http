let d = document;
let nameUser = d.getElementById("nombre-usuario");
let nameInput = d.querySelector('#productos-select');
let priceInput = d.querySelector('#precio-pro');
let stockInput = d.querySelector('#stock-pro');
let desInput = d.querySelector('#des-pro');
let btnCreate = d.querySelector('.btn-create');
let imagen = d.querySelector('#imagen-pro');
let ProductUpdate;

d.addEventListener("DOMContentLoaded", () => {
    getUser();
     productUpdate = JSON.parse(localStorage.getItem("productEdit"));
     if(productUpdate != null){
        updateDataProduct();
     }
});


//funcion para poner el nombre del usuario
let getUser = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nameUser.innerHTML = user.usuario;
}

btnCreate.addEventListener("click", async() => {
    //alert("producto: " + nameInput.value)
    let dataProduct = getDataProduct();
    sendDataProduct(dataProduct);
});


//funcion para validar el formulario y obtener los datos del formulario
let getDataProduct = () => {
//validar formulario
    let product;
 if(nameInput.value && priceInput.value && stockInput.value && desInput.value && imagen.src) {
    product = {
        nombre: nameInput.value,
        descripcion: desInput.value,
        precio: priceInput.value,
        stock: stockInput.value,
        imagen: imagen.src
    }
    priceInput.value = "";
    desInput.value = "";
    stockInput.value = "";
    imagen.src = "https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg";
    console.log(product);
 }else{
    alert("es obligatiorio llenar todos los campos")
 }
 return product;
};

//funcion para recivir los datos y realizar la peticion al servidor
let sendDataProduct =async (data) => {
    let url = "http://localhost:3000/api/productos";
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!respuesta.ok) {
            alert("Algo salio mal, error: " + respuesta.status);
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.href = "listado-pro.html"; 
            
            
        }

    } catch (error) {
        console.log(error);
        alert(error);
    }
};

//funcion para editar el producto 
let updateDataProduct = ()=>{
    let product;
    //agregar datos a editar en los campos del formulario
    nameInput.value = productUpdate.nombre;
    desInput.value = productUpdate.descripcion;
    precioInput.value = productUpdate.precio;
    stockInput.value = productUpdate.stock;
    imagen.src = productUpdate.imagen;
    //alternar el boton de crear y editar
    let btnEdit = d.querySelector('.btn-edit');
    btnCreate.classList.toggle('d-none');
    btnEdit.classList.toggle('d-none');

    btnEdit.addEventListener("click", async() => {
        id = productUpdate.id;
        product = {
        nombre: nameInput.value,
        descripcion: desInput.value,
        precio: priceInput.value,
        stock: stockInput.value,
        imagen: imagen.src
    }
    //borrar el producto del localStorage
    localStorage.removeItem("productEdit");
    //pasar los datos del producto a la funcion
    sendUpdateProduct(product);
    });

    };
//funcion para  realizar la peticion al servidor
let sendUpdateProduct =async (pro) => {
    let url = "http://localhost:3000/api/productos/1";
    try {
        let respuesta = await fetch(url, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pro)
        });
        if (!respuesta.ok) {
            alert("Algo salio mal, error: " + respuesta.status);
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.href = "listado-pro.html"; 
            
            
        }

    } catch (error) {
        console.log(error);
        alert(error);
    }
}