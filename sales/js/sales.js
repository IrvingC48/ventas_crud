const OnLoad = () => {
    let objet_LS = JSON.parse(localStorage.getItem('datos'));
    const objSelect = document.getElementById("products");
    const defaultProducts = [
        {'nom_producto': 'Producto1', 'cnt_producto':100, 'price':20, 'exist_producto':true},
        {'nom_producto': 'Producto2', 'cnt_producto':50, 'price':12, 'exist_producto':true},
        {'nom_producto': 'Producto3', 'cnt_producto':60, 'price':5, 'exist_producto':true},
        {'nom_producto': 'Producto4', 'cnt_producto':25, 'price':95, 'exist_producto':true}
    ];

    if (objet_LS === null) {
        objet_LS = defaultProducts;
        localStorage.setItem("datos" ,JSON.stringify(defaultProducts));
    };

    for (const prd in objet_LS) {
        const opt = document.createElement("option");
        opt.text = objet_LS[prd].nom_producto;
        objSelect.add(opt);
    }
};

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
                <button class="contact-sale-btn btn-mod" onClick="uptProd(${index})">MODIFICAR</button>
                <button class="contact-sale-btn btn-del" onClick="delProd(${index})">ELIMINAR</button>
            </div>
        </div>
    `;
};

document.getElementById("btn-addP").addEventListener('click', function(event) {
    event.preventDefault();

    const products = document.getElementById("products").value;
    const amount = document.getElementsByName("amount")[0].value;
    const subtotal = document.getElementById("subtotal").innerText;
    const valueBtn = document.getElementById("btn-addP").innerText;
    const amountProduct = sessionStorage.getItem("amountProduct");
    const valueIndex = sessionStorage.getItem('indexM');

    if (amountProduct === null) {return alert("Selecciona un producto válido")};
    if (Number(amountProduct) < amount) {return alert(`Sólo hay ${amountProduct} piezas disponibles`)};

    if (valueBtn === 'AGREGAR PRODUCTO') {
        addLS(products, amount, subtotal);
    } else {
        updLS(products, amount, subtotal, valueIndex);
    };

    renderLS();
});

const uptProd = (index) => {
    document.getElementById("btn-addP").innerText = "MODIFICAR PRODUCTO";
    sessionStorage.setItem('indexM', index);
};

const delProd = (index) => {
    const listSales = JSON.parse(sessionStorage.getItem("listSales"));
    listSales.splice(index, 1);
    sessionStorage.setItem('listSales', JSON.stringify(listSales));

    renderLS();
};

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

const updLS = (product, amount, subtotal, index) =>{
    const listSales = JSON.parse(sessionStorage.getItem("listSales"));

    if (listSales[index].producto !== product) {
        const existProdL = listSales.filter((value) => (value.producto === product))
        if (existProdL.length > 0) {
            return alert(`¡${product} ya fue cargado a la Lista de Ventas, previamente!`);
        } else {
            listSales[index] = {'producto':product, 'cantidad':amount, 'subtotal':subtotal};
            sessionStorage.setItem('listSales', JSON.stringify(listSales));
            document.getElementById("btn-addP").innerText = "AGREGAR PRODUCTO";
        };
    } else {
        listSales[index] = {'producto':product, 'cantidad':amount, 'subtotal':subtotal};
        sessionStorage.setItem('listSales', JSON.stringify(listSales));
        document.getElementById("btn-addP").innerText = "AGREGAR PRODUCTO";
    };
};

const renderLS = () => {
    const listSub = document.getElementById("ls-products");
    const total = document.getElementsByName("total")[0];
    const listSales = JSON.parse(sessionStorage.getItem("listSales"));
    let priceTotal = 0;

    listSub.innerHTML = '';
    for (const key in listSales) {
        listSub.innerHTML += templateSubtotal(listSales[key], key);
        priceTotal += Number(listSales[key].subtotal);
    }
    total.innerText = priceTotal;
};

document.getElementById("products").addEventListener("change", function() {
    const objet_LS = JSON.parse(localStorage.getItem('datos'));
    const valueAmount = document.getElementsByName("amount")[0].value;
    const products = document.getElementById("products").value;

    if (objet_LS !== null) {
        const existProdL = objet_LS.filter((value) => (value.nom_producto === products))
        if (existProdL.length > 0) {
            sessionStorage.setItem('priceProduct', Number(existProdL[0].price));
            sessionStorage.setItem('amountProduct', Number(existProdL[0].cnt_producto));
            calcSubtotal(Number(existProdL[0].price) , valueAmount);
        } else {
            sessionStorage.setItem('priceProduct', 0);
            sessionStorageC.setItem('amountProduct', 0);
            calcSubtotal(0 , valueAmount);
        };
    } else {
        sessionStorage.setItem('priceProduct', 0);
        sessionStorage.setItem('amountProduct', 0);
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
};

document.getElementById("btn-close").addEventListener('click', function() {
    const listSales = JSON.parse(sessionStorage.getItem("listSales"));
    let totalSubs = JSON.parse(localStorage.getItem("totalSubs"));
    let totalSales = JSON.parse(localStorage.getItem("totalSales"));
    const nomC = document.getElementsByName("name")[0].value;
    const valuesSale = document.getElementsByName("id_sale")[0];
    const total = document.getElementsByName("total")[0].innerText;
    let id_sale = localStorage.getItem("id_sale");

    if (listSales === null) {return alert("No hay productos agregados a la lista")};
    if (listSales.length === 0) {return alert("No hay productos agregados a la lista")};
    if (totalSubs === null) {totalSubs = []};
    if (totalSales === null) {totalSales = []};

    if (id_sale === null) {
        id_sale = 0;
        localStorage.setItem("id_sale", 1);
    } else {
        localStorage.setItem("id_sale", Number(id_sale)+1);
    };

    const listSales2 = listSales.map(arr => ({...arr, "id_sale": Number(id_sale)+1, "nom_client": nomC}));
    for (const key in listSales2) {
        totalSubs.push(listSales2[key]);
    };
    localStorage.setItem("totalSubs", JSON.stringify(totalSubs));
    totalSales.push({"id_sale":Number(id_sale)+1, "nom_client": nomC, "priceTotal": total});
    localStorage.setItem("totalSales", JSON.stringify(totalSales));

    clearAll();
    valuesSale.innerText = Number(id_sale)+1;
    alert("Venta Creada");
});

const clearAll = () => {
    const listSub = document.getElementById("ls-products");
    const objSelect = document.getElementById("products");
    const valueAmount = document.getElementsByName("amount")[0];
    const subtotal = document.getElementById("subtotal");
    const total = document.getElementsByName("total")[0];

    listSub.innerHTML = '';
    objSelect.value = 'Seleccione un producto...';
    valueAmount.value = '';
    subtotal.innerText = 0;
    total.innerText = 0;
    sessionStorage.clear();
};

const clearLS = () => {localStorage.clear()};