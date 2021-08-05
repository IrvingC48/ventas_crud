const OnLoad = () => {
    let objet_LS = JSON.parse(localStorage.getItem('datos'));
    const objSelect = document.getElementById("products");

    for (const prd in objet_LS) {
        const opt = document.createElement("option");
        opt.text = objet_LS[prd].nom_producto;
        objSelect.add(opt);
    }
}

const templateSubtotal = (object, index) => {
    return `
        <div class="prd-sub">
            <div class="flex-row">
                <label class="label-input lb-i-x">ID LISTA</label>
                <label class="input100 lb-i-x">${Number(index)+1}</label>
            </div>
            <div class="flex-row">
                <label class="label-input lb-i-x">PRODUCTO</label>
                <label class="input100 lb-i-x">${object.producto}</label>
            </div>
            <div class="flex-row">
                <label for="name" class="label-input lb-i-x">CANTIDAD</label>
                <label for="name" class="input100 lb-i-x">${object.cantidad}</label>
            </div>
            <div class="flex-row">
                <label for="name" class="label-input lb-i-x">SUBTOTAL</label>
                <label for="name" class="input100 lb-i-x">${object.subtotal}</label>
            </div>
            <div class="flex-row">
                <button class="contact-sale-btn btn-mod" id="btn-test">MODIFICAR</button>
                <button class="contact-sale-btn btn-del" id="btn-test">ELIMINAR</button>
            </div>
        </div>
    `;
}


document.getElementById("btn-addP").addEventListener('click', function(event) {
    event.preventDefault();

    const nomC = document.getElementsByName("name")[0].value;
    const products = document.getElementById("products").value;
    const amount = document.getElementsByName("amount")[0].value;
    const subtotal = document.getElementsByName("subtotal")[0].value;
    const listSub = document.getElementById("ls-products");

    addLS(products, amount, subtotal);

    const listSales = JSON.parse(sessionStorage.getItem("listSales"));
    listSub.innerHTML = '';
    for (const key in listSales) {
        listSub.innerHTML += templateSubtotal(listSales[key], key);
    }

    // alert("Producto agregado");
});

const addLS = (product, amount, subtotal) => {
    const listSales = JSON.parse(sessionStorage.getItem("listSales"));

    if (listSales !== null) {
        const existProdL = listSales.filter((value) => (value.producto === product))
        if (existProdL.length > 0) {
            return alert(`¡${product} ya fue cargado a la Lista de Ventas, previamente!`);
        } else {
            listSales.push({'producto':product, 'cantidad':amount, 'subtotal':subtotal});
            sessionStorage.setItem('listSales', JSON.stringify(listSales))
        };
    } else {
        const new_listSales = [{'producto':product, 'cantidad':amount, 'subtotal':subtotal}];
        sessionStorage.setItem('listSales', JSON.stringify(new_listSales));
    };

};



const objeto = [{'nom_producto': 'Prd1', 'cnt_producto':10, 'exist_producto':true}, {'nom_producto': 'Prd2', 'cnt_producto':5, 'exist_producto':false}];
// console.log(objeto);
document.getElementById("btn-test").addEventListener('click', function() {
    const listSub = document.getElementById("ls-products");
    listSub.innerHTML = '';

    // localStorage.setItem('datos', JSON.stringify(objeto));

    // objet_LS.push({'nom_producto':'Prd3', 'cnt_producto':2, 'exist_producto':true}); //Método agregar producto
    // localStorage.setItem('datos', JSON.stringify(objet_LS));
    // localStorage.clear();
    sessionStorage.clear();
    alert("Venta Creada");
});

let objet_LS = JSON.parse(localStorage.getItem('datos'));
console.log(objet_LS[0].nom_producto);