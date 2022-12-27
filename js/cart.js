// Récupération du contenu du panier à partir du localstorage
let storageLocal = localStorage.getItem('basket');
let pro = JSON.parse(storageLocal);

// Récupération de l'élement "cart__items"
var cartItem = document.querySelector('#cart__items');

// Affichage des produits dans la page panier (avec les prix en fetch)
function cartKanap(produit) {
    // AFFICHAGE DU/DES PRODUIT(S) PANIER
    // insertion des articles
    var createArticle = document.createElement('article');
    createArticle.className = 'cart__item';
    createArticle.setAttribute('data-id', produit.id);
    createArticle.setAttribute('data-color', produit.pColor);
    cartItem.appendChild(createArticle);

    // insertion div de l'img
    var createDivIMG = document.createElement('div');
    createDivIMG.className = 'cart__item__img';
    createArticle.appendChild(createDivIMG);

    // insertion des images
    var createPict = document.createElement('img');
    createPict.setAttribute('src', produit.img);
    createPict.setAttribute('alt', "Photographie d'un canapé");
    createDivIMG.appendChild(createPict);

    // insertion div content description
    var createDivContDes = document.createElement('div');
    createDivContDes.className = 'cart__item__content';
    createArticle.appendChild(createDivContDes);

    // insertion div description
    var createDivDes = document.createElement('div');
    createDivDes.className = 'cart__item__content__description';
    createDivContDes.appendChild(createDivDes);

    // insertion H2
    var createH2 = document.createElement('h2');
    createH2.textContent = produit.name;
    createDivDes.appendChild(createH2);

    // insertion P color
    var createpColor = document.createElement('p');
    createpColor.textContent = "Couleur : " + produit.color;
    createDivDes.appendChild(createpColor);

    // recupération du prix en utilisant l'id du produit
    var productUnit = "";
    fetch("http://localhost:3000/api/products/" + produit.id)
    .then(response => response.json())
    .then(async function (resultatAPI) {
        productUnit = await resultatAPI;
        // insertion P price
        var createpPrice = document.createElement('p');
        createpPrice.textContent = "Prix : " + productUnit.price + " € / canapé";
        createDivDes.appendChild(createpPrice);
    })
    .catch(error => alert("Erreur : " + error));

    // insertion div content settings
    var createDivContSet = document.createElement('div');
    createDivContSet.className = 'cart__item__content__settings';
    createDivContDes.appendChild(createDivContSet);

    // insertion div settings quantity
    var createDivContSetQuantity = document.createElement('div');
    createDivContSetQuantity.className = 'cart__item__content__settings__quantity';
    createDivContSet.appendChild(createDivContSetQuantity);

    // insertion P quantity
    var createpQuantity = document.createElement('p');
    createpQuantity.textContent = "Qté :";
    createDivContSetQuantity.appendChild(createpQuantity);

    // insertion input quantity
    var createInputQuantity = document.createElement('input');
    createInputQuantity.className = 'itemQuantity';
    createInputQuantity.setAttribute('type', 'number');
    createInputQuantity.setAttribute('name', 'itemQuantity');
    createInputQuantity.setAttribute('min', '0');
    createInputQuantity.setAttribute('max', '100');
    createInputQuantity.setAttribute('value', produit.quantity);
    createDivContSetQuantity.appendChild(createInputQuantity);

    // insertion div settings delete
    var createDivContSetDel = document.createElement('div');
    createDivContSetDel.className = 'cart__item__content__settings__delete';
    createDivContSet.appendChild(createDivContSetDel);

    // insertion P delete
    var createpDelete = document.createElement('p');
    createpDelete.className = 'deleteItem';
    createpDelete.textContent = "Supprimer";
    createDivContSetDel.appendChild(createpDelete);
}

// Récupération de produit dans l'API via son id 
async function getProduct(id) {
    return fetch("http://localhost:3000/api/products/" + id)
    .then(response => response.json())
    .catch(error => alert("Erreur : " + error));
}

// SI le panier est vide, afficher "panier vide" 
// SINON parser le panier, et utiliser la function showproductbasket 
async function showCart() {
    if (storageLocal == null) {
        var createpEmpty = document.createElement('p');
        createpEmpty.textContent = 'Votre panier est vide';
        cartItem.appendChild(createpEmpty);
    } else {   
        var totalPrice = 0;
        for (var i = 0 ; i < pro.products.length; i++) {
            basketProduct = pro.products[i];
            cartKanap(basketProduct);
            var productsPrice = await getProduct(basketProduct.id);
            var productQuantity = basketProduct.quantity;
            totalPrice += productsPrice.price * productQuantity;
            let totalPriceElt = document.querySelector('#totalPrice');
            totalPriceElt.textContent = totalPrice;
        }
        let totalQuantity = document.querySelector('#totalQuantity');
        totalQuantity.textContent = pro.totalQuantity;
        changeQuantity()
        delProduct()
    }
}
showCart();

// Changement quantité et prix
function changeQuantity() {
    var quantityItem = document.querySelectorAll('.itemQuantity');
    for (let k = 0; k < quantityItem.length; k++) { 
        quantityItemUnit = quantityItem[k];
        quantityItemUnit.addEventListener('change', function(event) {
            for (var l = 0 ; l < pro.products.length; l++) {
                basketProduct = pro.products[l];
                var articleQuantityItemID = event.target.closest('article').getAttribute("data-id");
                var articleQuantityItemColor = event.target.closest('article').getAttribute("data-color");
                newQuantityValue = event.target.valueAsNumber;
                
                if (basketProduct.id == articleQuantityItemID && basketProduct.color == articleQuantityItemColor) {
                    qtyToAdd = newQuantityValue - basketProduct.quantity;
                    basketProduct.quantity = newQuantityValue;
                    pro.totalQuantity = pro.totalQuantity + qtyToAdd;
                    let lineBasket = JSON.stringify(pro);
                    localStorage.setItem("basket", lineBasket);
                    window.location.reload();
                }
            }  
        })
    };
}

// Suppression d'un canapé
function delProduct() {
    var delItem = document.querySelectorAll('.deleteItem');
    for (let j = 0; j < delItem.length; j++) {
        delItemUnit = delItem[j];
        delItemUnit.addEventListener('click', function(event) {
            var articleDelItemID = event.target.closest('article').getAttribute("data-id");
            var articleDelItemColor = event.target.closest('article').getAttribute("data-color");
            
            var basket = JSON.parse(storageLocal);   
            productToDel = basket.products.find(el => el.id == articleDelItemID && el.color == articleDelItemColor);
            
            result = basket.products.filter(el => el.id !== articleDelItemID || el.color !== articleDelItemColor);
            basket.products = result;

            newQuantity = basket.totalQuantity - productToDel.quantity;
            basket.totalQuantity = newQuantity;
            priceToDel = productToDel.quantity * productToDel.price;
            alert('Vous avez bien supprimé votre produit du panier !');

            if (basket.totalQuantity == 0) {
                localStorage.clear();
                window.location.reload()
            } else {
                let lineBasket = JSON.stringify(basket);
                localStorage.setItem("basket", lineBasket);
                window.location.reload()
            }
        })
    };
}
    // Fin de Fonction
    
    //Formulaire Regex + expressions régulières
    function cartCreateForm() {
        
        let form = document.querySelector(".cart__order__form");
        let formEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
        let formOptions = new RegExp("^[a-zA-Z ,.'-]+$");
        let formAdress = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
        
        // addEventListener Confirmation
        form.firstName.addEventListener('change', function() {
            confirmerPrenom(this);
        });
        
        form.lastName.addEventListener('change', function() {
            confirmerNom(this);
        });
        
        form.address.addEventListener('change', function() {
            confirmerAdresse(this);
        });
        
        form.city.addEventListener('change', function() {
            confirmerVille(this);
        });
        
        form.email.addEventListener('change', function() {
            confirmerEmail(this);
        });
        
        //Confirmation des éléments 
        const confirmerPrenom = function(prenom) {
            let prenomAlert = prenom.nextElementSibling;
            
            if (formOptions.test(prenom.value)) {
                prenomAlert.innerHTML = '';
            } else {
                prenomAlert.innerHTML = 'Merci de renseigner votre prénom.';
            }
        };
        
        const confirmerNom = function(nom) {
            let nomAlert = nom.nextElementSibling;
            
            if (formOptions.test(nom.value)) {
                nomAlert.innerHTML = '';
            } else {
                nomAlert.innerHTML = 'Merci de renseigner votre nom.';
            }
        };
        
        const confirmerAdresse = function(adresse) {
            let adresseAlert = adresse.nextElementSibling;
            
            if (formAdress.test(adresse.value)) {
                adresseAlert.innerHTML = '';
            } else {
                adresseAlert.innerHTML = 'Merci de renseigner votre adresse.';
            }
        };
        
        const confirmerVille = function(ville) {
            let villeAlert = ville.nextElementSibling;
            
            if (formOptions.test(ville.value)) {
                villeAlert.innerHTML = '';
            } else {
                villeAlert.innerHTML = 'Merci de renseigner votre ville.';
            }
        };
        
        const confirmerEmail = function(email) {
            let emailAlert = email.nextElementSibling;
            
            if (formEmail.test(email.value)) {
                emailAlert.innerHTML = '';
            } else {
                emailAlert.innerHTML = 'Merci de renseigner votre email.';
            }
        };
    }
    cartCreateForm();
    // Fin de Fonction
    
    //Envoi des nouvelles données dans le localStorage
    function cartSendForm(){

         //Récupération des données + //  Appel et envoi des données au serveur et création d'une confirmation
         let formRecupPrenom = document.getElementById('firstName');
         let formRecupNom = document.getElementById('lastName');
         let formRecupAdresse = document.getElementById('address');
         let formRecupVille = document.getElementById('city');
         let formRecupEmail = document.getElementById('email');
         const commandButton = document.getElementById("order");
         commandButton.addEventListener("click", (event)=>{
        
            
            //Array des données
            let callId = [];
            for (let i = 0; i<storageLocal.length;i++) {
                callId.push(storageLocal[i].callProductId);
            }
            console.log(callId);
            
            const order = {
                contact : {
                    firstName: formRecupPrenom.value,
                    lastName: formRecupNom.value,
                    address: formRecupAdresse.value,
                    city: formRecupVille.value,
                    email: formRecupEmail.value,
                },
                products: callId,
            } 
            
           
            
            const callZ = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json', 
                    "Content-Type": "application/json" 
                },
            };
            
            // Envoi page confirmation.html
            fetch("http://localhost:3000/api/products/order", callZ)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);  
                localStorage.setItem('orderId', data.orderId);
                document.location.href = 'confirmation.html?id='+ data.orderId;
            }) 
            .catch((err) => {
                alert ("Problème avec fetch : " + err.message);
            });
        }) 
    }
    cartSendForm();
    // Fin de Fonction