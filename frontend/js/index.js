 
 
 
 
 /* Recuperation depuis le serveur et affichage des produits sur la page html  */





//Déclaration des variables 
let products = [];




// récupération et l'affichage des produits au chargement de la page 
document.addEventListener("DOMContentLoaded", () => {

    


    //récupération de  la liste des produits depuis le serveur grâce à une API fetch GET - dans fichier queries.js -
    getProducts();




    //Mise  à jour du  panier et l'icône panier 
    CART.init();
    Coshowunt(); 




    //Pour faire disparaître le 0 sur l'icône panier 
    if (count == 0) {
        cartCount.style.display = "none";
    }
});



  





/**
*affichage  des produits dans la section id="products"
* @param {Array} products Liste des produits récupérés avec l'API fetch GET
* @return {DOM element} productSection.innerHTML Liste des produits affichée par case
*/


function showProducts(products) {
    //affichege des infos depuis le DOM
    let productSection = document.getElementById("products");
    productSection.innerHTML = "";


    //Boucle  pour chaque produit  du tableau "products"
    products.forEach(product => {


        // cree une  "case" pour chaque produit
        let card = document.createElement("div");
        card.className = "card";


        //cree une div pour les éléments, photo et détails
        let cardElements = document.createElement("div");
        cardElements.className = "card__elements element";
        card.appendChild(cardElements);


        // cree l'image au produit
        let img = document.createElement("img");
        img.alt = product.name;
        img.src = product.imageUrl;
        img.className = "element__img";
        img.style.width = "200px";
        cardElements.appendChild(img);


        // cree une div pour les détails
        let details = document.createElement("div");
        details.className = "element__details";
        cardElements.appendChild(details);


        // cree le titre du produit
        let name = document.createElement("h3");
        name.className = "card__name";
        name.textContent = product.name;
        details.appendChild(name);


        // cree la description du produit
        let description = document.createElement("p");
        description.className = "card__description";
        description.textContent = product.description;
        details.appendChild(description); 


         // cree le prix du produit
        let price = document.createElement("p");
        price.className = "card__price";
        let cost = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(product.price / 100);
        price.textContent = cost;
        details.appendChild(price); 


        //cree une div pour le bouton
        let cardBtns = document.createElement("div");
        cardBtns.className = "card__btns";
        card.appendChild(cardBtns);


        // cree le bouton pour afficher détails du produit
        let btnDetails = document.createElement("a");
        btnDetails.className = "btn btn-secondary card__btnDetails btn__details";
        btnDetails.setAttribute("role", "button");
        btnDetails.innerHTML = '<i class="fas fa-info-circle"></i> En savoir plus';


        //Envoie l'info du id du produit sélectionné à la page produit.html via les paramètres de l'url
        btnDetails.setAttribute("href", "produit.html?id=" + product._id + "");
        cardBtns.appendChild(btnDetails); 
        productSection.appendChild(card);
    });
}


