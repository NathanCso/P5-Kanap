// Appel a créer une nouvelle Url 

let call = window.location.href
let url = new URL(call);
let productId = url.searchParams.get("id");
console.log(productId);
let productArticle = "";

recupArticle();

function recupArticle() {
    fetch("http://localhost:3000/api/products/" + productId)
        .then((res) => {
            return res.json();
        })

        .then(async function (resultatAPI) {
            article = await resultatAPI;
            console.table(article);
            if (article) {
                getPost(article);
            }
        })
        .catch((error) => {
            console.log("Erreur lors de la récupération");
        })
}

// Creation d'un produit 




function getPost(article) {

    let recupImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(recupImg);
    recupImg.src = article.imageUrl;
    recupImg.alt = article.altTxt;

    let recupName = document.getElementById('title');
    recupName.innerHTML = article.name;
    let recupPrice = document.getElementById('price');
    recupPrice.innerHTML = article.price;

    let recupDescription = document.getElementById('description');
    recupDescription.innerHTML = article.description;

    const colors = document. querySelector("#colors");
    const quantity = document.querySelector("#quantity");


}