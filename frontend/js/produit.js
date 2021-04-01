



/* page produit.html, 
affichage  du  produit spécifique qui  a été récupéré depuis le serveur */





//Capture des éléments du DOM
let pdtCase = document.getElementById("product-case");
let pdtImg = document.getElementById("pdt-img");
let pdtStock = document.getElementById("pdt-stock");
let pdtTitle = document.getElementById("pdt-title");
let pdtDescription = document.getElementById("pdt-description");
let pdtPrice = document.getElementById("pdt-price");
let pdtButtons = document.getElementById("pdt-buttons");
let lensesChoice = document.getElementById("pdt-lenses");
let lensesBtn = document.getElementById("dropdownMenuButton");
let pdtButton = document.getElementById("pdt-button");




//  récupération et affichage du produit sélectionné quand la page se charge
document.addEventListener("DOMContentLoaded", () => {
    //Recuperation  du  produit sélectionné depuis le serveur, via son id intégré aux paramètres de l'URL, grâce à une API fetch GET - dans fichier queries.js -
    getProduct();
    //Met à jour le panier et l'icône panier du menu
    CART.init();
    showCount(); 
});







/**
*affichage du  produit sélectionné dans la page produit.html
* @param {Oject} item 
* @return {DOM element} pdtCase.innerHTML Produit affiché
* @return {String} lensesBtn.textContent Option lentille choisie
*/
function showItem(item) { 


    //Actualise l'image du produit
    pdtImg.alt = item.name;
    pdtImg.src = item.imageUrl;


    //Actualise le titre du produit 
    pdtTitle.textContent = item.name;


    //Actualise la description du produit 
    pdtDescription.textContent = item.description;


    //Actualise le prix unitaire du produit
    let totalPrice = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(item.price/100);
    pdtPrice.textContent = "Prix unitaire : " + totalPrice;


    //Actualise la liste des options de lentille
    let lensesList = item.lenses;


    //Remise à zéro de la  lentille précédent en le supprimant du localStorage 
    localStorage.removeItem("chosenLenses");


    //Boucle pour créer une ligne du menu déroulant pour chaque lentille, différente selon les produits
    for (let i=0 ; i<lensesList.length ; i++) {
        let lenses = document.createElement("span");
        lenses.className = "dropdown-item";
        lenses.textContent = lensesList[i];


        //Quand le user clique sur l'option, elle reste affichée quand le menu se ferme
        lenses.addEventListener("click", function() {
            lensesBtn.textContent = lensesList[i];


            //Stockage du choix de la lentille dans le localStorage
            localStorage.setItem("chosenLenses", lensesList[i]);
        });
        lensesChoice.appendChild(lenses);
    }


    //Actualise le bouton d'ajout au panier
    pdtButton.setAttribute("data-id", item._id);
    pdtButton.addEventListener("click", addPdtGlobal); 
}

     







/**
*Fonction déclenchée au clic du bouton pour ajouter le produit et mettre à jour le nombre d'articles dans l'icône panier simultanément
* @param {Number} count Compteur de l'icône
* @param {Objet} item Produit affiché
*/

function addPdtGlobal(e) { 
    addItem(e);
    setTimeout(function() {
        showCount(); 
    }, 1000); 
}
  