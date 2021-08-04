const OnLoad = () => {
    let objet_LS = JSON.parse(localStorage.getItem('datos'));
    const objSelect = document.getElementById("products");

    for (const prd in objet_LS) {
        const opt = document.createElement("option");
        opt.text = objet_LS[prd].nom_producto;
        objSelect.add(opt);
    }
}


const objeto = [{'nom_producto': 'Prd1', 'cnt_producto':10, 'exist_producto':true}, {'nom_producto': 'Prd2', 'cnt_producto':5, 'exist_producto':false}];
// console.log(objeto);
document.getElementById("btn-test").addEventListener('click', function() {
    // localStorage.setItem('datos', JSON.stringify(objeto));

    objet_LS.push({'nom_producto':'Prd3', 'cnt_producto':2, 'exist_producto':true}); //Método agregar producto
    localStorage.setItem('datos', JSON.stringify(objet_LS));
    // localStorage.clear()
});
console.log(JSON.parse(localStorage.getItem('datos')));

let objet_LS = JSON.parse(localStorage.getItem('datos'));
const array_producto = objet_LS.filter((dato) => (dato.nom_producto === 'Prd1'));
console.log(objet_LS[0].nom_producto);