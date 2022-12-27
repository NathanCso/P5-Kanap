
// // Confirmation de la commande et affichage du numéro de commande

 const id = new URL(window.location.href).searchParams.get("id");
 console.log(id);

const orderId = document.getElementById('orderId');
orderId.innerHTML = id;
 if (id === null) {
     alert("Vous n'avez pas de commande en cours");
    window.location.replace("./index.html");
   }

 localStorage.clear();

