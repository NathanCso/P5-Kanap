// const img = document.getElementById("img") ; 




// Appel API
domFunction(); 

async function Articles() {
    let apiFind = await fetch("http://localhost:3000/api/products")
    return await apiFind.json();
}

async function domFunction() {
    let result = await Articles ()
    .then(function (searchResult){
        const apiRes = searchResult;
        console.table(apiRes);
        for (let article in apiRes) {

            // Creation des éléments / Page index.js
            let htmlItemA = document.createElement("a"); 
            document.querySelector(".items").appendChild(htmlItemA);
            htmlItemA.href = `product.html?id=${searchResult[article]._id}`;

            let htmlItemArticle = document.createElement("article");
            htmlItemA.appendChild(htmlItemArticle);

            let htmlItemImage = document.createElement("img");
            htmlItemArticle.appendChild(htmlItemImage);
            htmlItemImage.src = searchResult[article].imageUrl;
            htmlItemImage.alt = searchResult[article].altTxt;

            let htmlItemName = document.createElement("h3");
            htmlItemArticle.appendChild(htmlItemName);
            htmlItemName.classList.add("htmlItemName");
            htmlItemName.innerHTML = searchResult[article].name;

            let htmlItemDescript = document.createElement("p");
            htmlItemArticle.appendChild(htmlItemDescript);
            htmlItemDescript.classList.add("htmlItemName");
            htmlItemDescript.innerHTML = searchResult[article].description;
        }
    })
    // Déclaration ERREUR
    .catch (function(error){
        return error;
    });
}