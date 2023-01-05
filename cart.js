
//Lien avec LocalStorage et conditions
let storageLocal = JSON.parse(localStorage.getItem("produit"));

// Declaration constante
const panierVide = document.querySelector("#cart__items");

///////////////// recupération des prix produits ///////////////////
storageLocal.forEach(produit => {
    fetch("http://localhost:3000/api/products/" + produit.callProductId)
    .then((res) => {
        return res.json();
    })
    .then(async function (response) {
        if (await response){
            addToPanier(produit, response.price);
            totalCost(response.price);
        }
    })
    // Message d'erreur
    .catch((error) => {
        console.log(error);
    })
});
///////////////////////////////////////////////////////////////////
 
// Condition panier vide
function addToPanier(produit, price){

    if (storageLocal === null || storageLocal == 0) {
        const noArticle = `<p>Le panier ne contient aucun article</p>`;
        panierVide.innerHTML = noArticle;
    } else {            

        // Création et modifications des élements /page cart.js
        let cartItemArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(cartItemArticle);
        cartItemArticle.className = "cart__item";
        cartItemArticle.setAttribute('data-id', produit.callProductId);
        
        let cartItemDiv = document.createElement("div");
        cartItemArticle.appendChild(cartItemDiv);
        cartItemDiv.className = "cart__item__img";
        
        let cartItemImage = document.createElement("img");
        cartItemDiv.appendChild(cartItemImage);
        cartItemImage.src = produit.pImage;
        cartItemImage.alt = produit.pTXT;
        
        let cartItemContent = document.createElement("div");
        cartItemArticle.appendChild(cartItemContent);
        cartItemContent.className = "cart__item__content";
        
        let cartItemPrice = document.createElement("div");
        cartItemContent.appendChild(cartItemPrice);
        cartItemPrice.className = "cart__item__content__titlePrice";
        
        let cartItemTitle = document.createElement("h2");
        cartItemPrice.appendChild(cartItemTitle);
        cartItemTitle.innerHTML = produit.pName;
        
        let cartItemColor = document.createElement("p");
        cartItemTitle.appendChild(cartItemColor);
        cartItemColor.innerHTML = produit.pColor;
        cartItemColor.style.fontSize = "20px";

        let cartItemEuro = document.createElement("p");
        cartItemPrice.appendChild(cartItemEuro);
        cartItemEuro.innerHTML = price + " €";
        
        let itemSett = document.createElement("div");
        cartItemContent.appendChild(itemSett);
        itemSett.className = "cart__item__content__settings";
        
        let cartSettings = document.createElement("div");
        itemSett.appendChild(cartSettings);
        cartSettings.className = "cart__item__content__settings__quantity";
        
        let cartItemQte = document.createElement("p");
        cartSettings.appendChild(cartItemQte);
        cartItemQte.innerHTML = "Qté : ";
        
        let cartItemQuantity = document.createElement("input");
        cartItemQuantity.value = produit.pQuantity;
        cartItemQuantity.className = "itemQuantity";
        cartItemQuantity.setAttribute("value", produit.pQuantity);
        cartItemQuantity.setAttribute("type", "number");
        cartItemQuantity.setAttribute("min", "1");
        cartItemQuantity.setAttribute("max", "100");
        cartItemQuantity.setAttribute("name", "itemQuantity");
        cartSettings.appendChild(cartItemQuantity);
        
        let cartDelete = document.createElement("div");
        itemSett.appendChild(cartDelete);
        cartDelete.className = "cart__item__content__settings__delete";
        
        // let cartDlt = document.createElement("p");
        // cartDelete.appendChild(cartDlt);
        // cartDlt.className = "deleteItem";
        // cartDlt.innerHTML = "Supprimer";

        // mis a jour de la quantite dans le localStorage
        cartItemQuantity.addEventListener ("change", () => {
    changeQuantity(produit, parseInt(cartItemQuantity.value))
     location.reload();
  })

  // Insertion de la partie de suppression
  let divSetting_delte = document.createElement("div");
  divSetting_delte.classList.add("cart__item__content__settings__delete");
  itemSett.appendChild(divSetting_delte);
  let deletP = document.createElement("p");
  deletP.classList.add("deleteItem");
  deletP.innerHTML = "Supprimer";
  divSetting_delte.appendChild(deletP);

  deletP.addEventListener ("click", () => {
    deleteItem(produit);
     location.reload();
     
  })


    }
}
    // Fin de Fonction
   
// Changement quantité et prix


    function changeQuantity (product, quantity) {
        let cart = JSON.parse(localStorage.getItem("produit"));
        let foundProduct = cart.find(p => p.callProductId == product.callProductId  && p.pColor == product.pColor);
        if (foundProduct != undefined) {
          foundProduct.pQuantity = quantity;
        }
        localStorage.setItem('produit', JSON.stringify(cart))
       }

       //supprime le produit et mis a jour les donnes dans le localStorage
    function deleteItem (product) {          
     let cart = JSON.parse(localStorage.getItem("produit"));
     cart = cart.filter(p => p.callProductId!= product.callProductId || p.pColor != product.pColor);
     localStorage.setItem('produit', JSON.stringify(cart))
     alert('Ce produit a bien été supprimé du panier');

  }

  //Total article

//    Mise en place des options de récupération du Total
 let totalPrice = 0;
function totalCost(price){
    
    let totalItem = document.getElementsByClassName('itemQuantity').namedItem('itemQuantity').value;
    let numberItem = totalItem.length,
    totalOfNumber = 0;
    for (let qtt = 0; qtt < numberItem; ++qtt) {
        totalOfNumber += totalItem[qtt].valueAsNumber;
    }

    let itemPQuantity = document.getElementById('totalQuantity');
    itemPQuantity.innerHTML = totalItem;
    
    // Calcul Prix Total
    
    for (let qtt = 0; qtt < totalItem; ++ qtt) {
        totalPrice += price;
    }
    let recupPrice = document.getElementById('totalPrice');
    recupPrice.innerHTML = totalPrice ;
    
}


// Formulaire Regex + expressions régulières
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