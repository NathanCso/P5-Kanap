// let getelement = document.getElementById('title');
//     getelement.innerHTML = stringArticle.name;

// Appel a créer un nouvel URL
let call = window.location.href;
let urlNew = new URL(call);
let callId = urlNew.searchParams.get("id");
console.log(callId);
let stringArticle = "";


// Appel API
callProduct();

function callProduct() {
    fetch("http://localhost:3000/api/products/" + callId)
    .then((res) => {
        return res.json();
    })
    .then(async function (response) {
        stringArticle = await response;
        console.table(stringArticle);
        if (stringArticle){
            recupProduct(stringArticle);
        }
    })
    // Message d'erreur
    .catch((error) => {
        console.log("Un problème est survenue lors de la récupération");
    })
}
// Fin de Fonction

// Déclaration des constantes couleur
const chooseColor = document.querySelector("#colors");
const chooseQuantity = document.querySelector("#quantity");

    
// Création et modifications des élements /page Product
function recupProduct(article){
    
    let modifImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(modifImg);
    modifImg.src = article.imageUrl;
    modifImg.alt = article.altTxt;

    let modifName = document.getElementById('title');
    modifName.innerHTML = article.name;

    let modifPrice = document.getElementById('price');
    modifPrice.innerHTML = article.price;

    let modifDescription = document.getElementById('description');
    modifDescription.innerHTML = article.description;

//    Paramètres des couleurs
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    ajoutPanier(article);
}
// Fin de Fonction

// Ajout au panier + options 
function ajoutPanier(article) {
    const button = document.querySelector("#addToCart");

    // Options limite de quantité + Choix 
    button.addEventListener("click", (event)=>{
        if (chooseQuantity.value > 0 && chooseQuantity.value <=100 && chooseQuantity.value != 0){

     let colorChoose = chooseColor.value;
     let quantityChoose = chooseQuantity.value;
    
    // Tableau Récapitulatif
    let arrayProduct = { 
        callProductId: callId,
        pColor: colorChoose,
        pQuantity: Number(quantityChoose),
        pName: article.name,
        // pPrice: article.price,
        pDescription: article.description,
        pImage: article.imageUrl,
        pTXT: article.altTxt
    };

    //  Alerte
    const alertCart =() =>{
        if(window.confirm(` Votre produit ${article.name} avec une quantité de ${quantityChoose} et de couleur  ${colorChoose} est ajoutée a votre panier
Veuillez confirmer pour accéder au panier `)){
            window.location.href ="cart.html";
        }
    }

    //Lien avec LocalStorage et conditions
    let storageLocal = JSON.parse(localStorage.getItem("produit"));

    //Condition 1 article au moins
    if (storageLocal) {
    const responseProduct = storageLocal.find(
        (add) => add.callProductId === callId && add.pColor === colorChoose);

        //Condition produit déja dans le panier
        if (responseProduct) {
            let quantityAdd =
            parseInt(arrayProduct.pQuantity) + parseInt(responseProduct. pQuantity);
            responseProduct.pQuantity = quantityAdd;
            localStorage.setItem("produit", JSON.stringify(storageLocal));
            console.table(storageLocal);
            alertCart();

        //Condition produit pas dans le panier
        } else {
            storageLocal.push(arrayProduct);
            localStorage.setItem("produit", JSON.stringify(storageLocal));
            console.table(storageLocal);
            alertCart();
        }
    //Condition panier  vide
    } else {
        storageLocal =[];
        storageLocal.push(arrayProduct);
        localStorage.setItem("produit", JSON.stringify(storageLocal));
        console.table(storageLocal);
        alertCart();
    }}
    });
}
// Fin de Fonction

