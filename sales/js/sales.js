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
        <div id=${index} class="prd-sub">
            <div class="flex-column">
                <label class="label-input lb-i-x">ID LISTA</label>
                <label class="input100 lb-i-x">${Number(index)+1}</label>
            </div>
            <div class="flex-column">
                <label class="label-input lb-i-x">PRODUCTO</label>
                <label class="input100 lb-i-x">${object.producto}</label>
            </div>
            <div class="flex-column">
                <label class="label-input lb-i-x">CANTIDAD</label>
                <label class="input100 lb-i-x">${object.cantidad}</label>
            </div>
            <div class="flex-column">
                <label class="label-input lb-i-x">SUBTOTAL</label>
                <label class="input100 lb-i-x">${object.subtotal}</label>
            </div>
            <div class="flex-column">
                <button class="contact-sale-btn btn-mod" id="btn-upd">MODIFICAR</button>
                <button class="contact-sale-btn btn-del" id="btn-del">ELIMINAR</button>
            </div>
        </div>
    `;
}

document.getElementById("btn-addP").addEventListener('click', function(event) {
    event.preventDefault();

    const nomC = document.getElementsByName("name")[0].value;
    const products = document.getElementById("products").value;
    const amount = document.getElementsByName("amount")[0].value;
    const subtotal = document.getElementById("subtotal").innerText;
    const listSub = document.getElementById("ls-products");
    const total = document.getElementsByName("total")[0];
    let priceTotal = 0;

    addLS(products, amount, subtotal);

    const listSales = JSON.parse(sessionStorage.getItem("listSales"));
    listSub.innerHTML = '';
    for (const key in listSales) {
        listSub.innerHTML += templateSubtotal(listSales[key], key);
        priceTotal += Number(listSales[key].subtotal);
    }
    total.innerText = priceTotal;

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

document.getElementById("products").addEventListener("change", function() {
    const objet_LS = JSON.parse(localStorage.getItem('datos'));
    const valueAmount = document.getElementsByName("amount")[0].value;
    const products = document.getElementById("products").value;


    if (objet_LS !== null) {
        const existProdL = objet_LS.filter((value) => (value.nom_producto === products))
        if (existProdL.length > 0) {
            sessionStorage.setItem('priceProduct', Number(existProdL[0].price));
            calcSubtotal(Number(existProdL[0].price) , valueAmount);
        } else {
            sessionStorage.setItem('priceProduct', 0);
            calcSubtotal(0 , valueAmount);
        };
    } else {
        sessionStorage.setItem('priceProduct', 0);
        calcSubtotal(0 , valueAmount);
    };
});

document.getElementsByName("amount")[0].addEventListener("keyup", function() { 
    const valueAmount = document.getElementsByName("amount")[0].value;
    let valueProd = sessionStorage.getItem('priceProduct');

    calcSubtotal(valueProd , valueAmount);
});


const calcSubtotal = (valueProd, valueAmount) => {
    const subtotal = document.getElementById("subtotal");

    if (valueProd === undefined) {valueProd = 0};
    subtotal.innerText = valueProd * valueAmount;
}

// document.querySelectorAll()

// document.getElementById("btn-upd").addEventListener('click', function(event) {
//     event.parentNode

//     // splice(index , 1);
// };

const objeto = [{'nom_producto': 'Prd1', 'cnt_producto':10, 'price':20, 'exist_producto':true}, {'nom_producto': 'Prd2', 'cnt_producto':5, 'price':12, 'exist_producto':false}];
// console.log(objeto);
document.getElementById("btn-test").addEventListener('click', function() {
    const listSub = document.getElementById("ls-products");
    listSub.innerHTML = '';

    // localStorage.setItem('datos', JSON.stringify(objeto));

    // let objet_LS = JSON.parse(localStorage.getItem('datos'));
    // objet_LS.push({'nom_producto':'Prd3', 'cnt_producto':2, 'price':5, 'exist_producto':true}); //Método agregar producto
    // localStorage.setItem('datos', JSON.stringify(objet_LS));

    // localStorage.clear();
    sessionStorage.clear();
    alert("Venta Creada");
});