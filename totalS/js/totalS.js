const OnLoad = () => {
    renderLS();
};

const templateSale = (object, index) => {
    return `
        <div id=${index} class="list-sale">
            <div class="flex-column">
                <label class="label-input lb-i-x">ID VENTA</label>
                <label class="input100 lb-i-x">${object.id_sale}</label>
            </div>
            <div class="flex-column">
                <label class="label-input lb-i-x">NOMBRE CLIENTE</label>
                <label class="input100 lb-i-x">${object.nom_client}</label>
            </div>
            <div class="flex-column">
                <label class="label-input lb-i-x">PRECIO TOTAL</label>
                <label class="input100 lb-i-x">${object.priceTotal}</label>
            </div>
            <div class="flex-column">
                <button class="contact-sale-btn btn-del" onClick="delSale(${index})">ELIMINAR</button>
            </div>
        </div>
    `;
};

const delSale = (index) => {
    const totalSales = JSON.parse(localStorage.getItem("totalSales"));
    totalSales.splice(index, 1);
    localStorage.setItem('totalSales', JSON.stringify(totalSales));

    renderLS();
}

const renderLS = () => {
    let totalSales = JSON.parse(localStorage.getItem("totalSales"));
    const listSales = document.getElementById("ls-sales");

    listSales.innerHTML = '';
    for (const key in totalSales) {
        listSales.innerHTML += templateSale(totalSales[key], key);
    };
};

const clearLS = () => {localStorage.clear()};
