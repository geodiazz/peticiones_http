let d = document;
let tablePro = document.querySelector("#tabla-pro > tbody");
let nameUser = d.getElementById("nombre-usuario");
let searchInput = document.querySelector("#search-input");

searchInput.addEventListener("keyup", () => {
    console.log(searchInput.value);
});
document.addEventListener("DOMContentLoaded", () => {
    getTableData();
    getUser();
});

//funcion para poner el nombre del usuario
let getUser = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nameUser.innerHTML = user.usuario;
}

// funcion para traer los datos de la bd a la tabla
let getTableData = async() => {
    let url = "http://localhost:3000/api/productos";
    try {
        let respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (respuesta.status === 204) {
            console.log("No se encontraron productos");
        }else{
            let tableData = await respuesta.json();
            console.log(tableData);
            //agregar los datos al localStorage
            localStorage.setItem("datosTabla", JSON.stringify(tableData));
            //agregar los datos a la tabla
            tableData.forEach((dato, i) =>{
                let row = document.createElement("tr");
                row.innerHTML = `
                <td>${i + 1}</td>
                <td>${dato.nombre}</td>
                <td>${dato.descripcion}</td>
                <td>${dato.precio}</td>
                <td>${dato.stock}</td>
                <td><img src="${dato.imagen}" alt="${dato.nombre}" width="100"></td>
                <td>
                    <button id="btn-edit" onclick="editDataTable(${i+1})" class="btn btn-warning btn-sm">Editar</button> - 
                    <button id="btn-delete" onclick="deleteDataTable(${i+1})" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
                `;
                tablePro.appendChild(row);
            })
        }

    } catch (error) {
        console.log(error);
        alert(error);
    }

}
let editDataTable = (pos) => {
    let products = [];
    let savedProducts = JSON.parse(localStorage.getItem("datosTabla"));
    if (savedProducts != null) {
        products = savedProducts;
    }
    let singleProduct = products[pos - 1];
   //console.log(singleProduct);
   localStorage.setItem("productEdit", JSON.stringify(singleProduct));
   localStorage.removeItem("datosTabla");
   location.href = "crear-pro.html";
}

let deleteDataTable = async (pos) => {
    let products = [];
    let savedProducts = JSON.parse(localStorage.getItem("datosTabla"));
    if (savedProducts != null) {
        products = savedProducts;
    }
    let singleProduct = products[pos - 1];
    //console.log(singleProduct);
    let idProduct = singleProduct.id;
    
    let confirmar = confirm("¿Desea eliminar el producto " + singleProduct.nombre + "?");
    if (confirmar) {
        //llamar funcion para realizar la peticion
        sendDeleteProduct(idProduct);
    }
}

//funcion para realizar la peticion para eliminar el producto
let sendDeleteProduct = async (id) => {
    let url = `http://localhost:3000/api/productos/${id}`;
    console.log("ID que voy a eliminar:", id);
    console.log("URL:", url);
    try {
        let respuesta = await fetch(url, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        });
        if (!respuesta.ok) {
            alert("Algo salio mal, error: " + respuesta.status);
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.reload(); 
            
            
        }

    } catch (error) {
        console.log(error);
        alert(error);
    }
}

