
//Lien avec LocalStorage et conditions
let storageLocal = JSON.parse(localStorage.getItem("produit"));
console.table(storageLocal);

// Declaration constante
const panierVide = document.querySelector("#cart__items");

 
// Condition panier vide
function addToPanier(){
    if (storageLocal === null || storageLocal == 0) {
        const noArticle = `<p>Le panier ne contient aucun article</p>`;
        panierVide.innerHTML = noArticle;
    } else {
        for (let produit in storageLocal){
            
            // Création et modifications des élements /page cart.js
            let cartItemArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(cartItemArticle);
            cartItemArticle.className = "cart__item";
            cartItemArticle.setAttribute('data-id', storageLocal[produit].callProductId);
            
            let cartItemDiv = document.createElement("div");
            cartItemArticle.appendChild(cartItemDiv);
            cartItemDiv.className = "cart__item__img";
            
            let cartItemImage = document.createElement("img");
            cartItemDiv.appendChild(cartItemImage);
            cartItemImage.src = storageLocal[produit].pImage;
            cartItemImage.alt = storageLocal[produit].pTXT;
            
            let cartItemContent = document.createElement("div");
            cartItemArticle.appendChild(cartItemContent);
            cartItemContent.className = "cart__item__content";
            
            let cartItemPrice = document.createElement("div");
            cartItemContent.appendChild(cartItemPrice);
            cartItemPrice.className = "cart__item__content__titlePrice";
            
            let cartItemTitle = document.createElement("h2");
            cartItemPrice.appendChild(cartItemTitle);
            cartItemTitle.innerHTML = storageLocal[produit].pName;
            
            let cartItemColor = document.createElement("p");
            cartItemTitle.appendChild(cartItemColor);
            cartItemColor.innerHTML = storageLocal[produit].pColor;
            cartItemColor.style.fontSize = "20px";

              let cartItemEuro = document.createElement("p");
              cartItemPrice.appendChild(cartItemEuro);
               cartItemEuro.innerHTML = storageLocal[produit].pPrice + " €";
            
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
            cartSettings.appendChild(cartItemQuantity);
            cartItemQuantity.value = storageLocal[produit].pQuantity;
            cartItemQuantity.className = "itemQuantity";
            cartItemQuantity.setAttribute("type", "number");
            cartItemQuantity.setAttribute("min", "1");
            cartItemQuantity.setAttribute("max", "100");
            cartItemQuantity.setAttribute("name", "itemQuantity");
            
            let cartDelete = document.createElement("div");
            itemSett.appendChild(cartDelete);
            cartDelete.className = "cart__item__content__settings__delete";
            
            let cartDlt = document.createElement("p");
            cartDelete.appendChild(cartDlt);
            cartDlt.className = "deleteItem";
            cartDlt.innerHTML = "Supprimer";
        }
    }}
    addToPanier();
    // Fin de Fonction
    
    
    // Mise en place des options de récupération du Total
    
    function totalCost(){
        
        let totalItem = document.getElementsByClassName('itemQuantity');
        let numberItem = totalItem.length,
        totalOfNumber = 0;
        for (let qtt = 0; qtt < numberItem; ++qtt) {
            totalOfNumber += totalItem[qtt].valueAsNumber;
        }
        let itemPQuantity = document.getElementById('totalQuantity');
        itemPQuantity.innerHTML = totalOfNumber;
        console.log(totalOfNumber);
        
        // Calcul Prix Total
        totalPrice = 0;
        
        for (let qtt = 0; qtt < numberItem; ++qtt) {
            totalPrice += (totalItem[qtt].valueAsNumber * storageLocal[qtt].pPrice);
        }
        let recupPrice = document.getElementById('totalPrice');
        recupPrice.innerHTML = totalPrice ;
        console.log(totalPrice);
    }
    totalCost();
    
    
    
    // Mise en place des options de suppression Produit
    function deleteToCart() {
        let dltButton = document.querySelectorAll(".deleteItem");
        
        for (let iDlt = 0; iDlt < dltButton.length; iDlt++){
            dltButton[iDlt].addEventListener("click" , (event) => {
                event.preventDefault();
                
                // Confirmation suppression + condition ID et Couleur 
                let deleteWithId = storageLocal[iDlt].callProductId;
                let deleteWithColor = storageLocal[iDlt].pColor;
                storageLocal = storageLocal.filter( el => el.callProductId !== deleteWithId || el.pColor !== deleteWithColor );
                localStorage.setItem("produit", JSON.stringify(storageLocal));
                
                alert("Ce produit a bien été supprimé du panier");
                location.reload();
            })
        }
    }
    deleteToCart();
    // Fin de Fonction
    
    // Mise en place des options de modification Produit
    function totalModif () {
        let modifValue = document.querySelectorAll(".itemQuantity");
        
        for (let iQtt = 0; iQtt < modifValue.length; iQtt++){
            modifValue[iQtt].addEventListener("change" , (event) => {
                event.preventDefault();
                
                // Confirmation modification + condition ID et Couleur 
                let cartModifQtt = storageLocal[iQtt].pQuantity;
                let cartQuantitéModif = modifValue[iQtt].valueAsNumber;
                const responseProduct = storageLocal.find((x) => x.cartQuantitéModif !== cartModifQtt);
                responseProduct.pQuantity = cartQuantitéModif;
                storageLocal[iQtt].pQuantity = responseProduct.pQuantity;   
                localStorage.setItem("produit", JSON.stringify(storageLocal));
                location.reload();
            })
        }
    }
    totalModif();
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