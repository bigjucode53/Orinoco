



/*page panier .html qui affiche  :
- la liste des produits selectionnes,
- le prix total du panier,
- le formulaire à remplir
*/



// mise à jour avec le localStorage et affichage du panier, ainsi que le calcul du prix total
document.addEventListener("DOMContentLoaded", () => {

    //Chargement  des produits du panier et les affiche
    CART.init();
    showCart();

    //Calcule le montant total  et mise à jour du  compteur de l'icône
    cartAmount.textContent = calculateCartAmount() + " EUR";
    showCount();
});








/**
* affichage du panier dans la page panier.html
*/
function showCart() {

    //Capture l'élément du DOM "cart-section" qui va afficher toutes les informations
    let cartSection = document.getElementById("cart-section");
    cartSection.innerHTML = "";
    if (CART.contents.length != 0) {

        //Boucle qui affiche les informations chacun des éléments du tableau CART
        CART.contents.forEach(item => {


            //cree la "case" pour chaque produit du panier
            let cartItem = document.createElement("div");
            cartItem.className = "cartitem";
            cartSection.appendChild(cartItem);


            //cree l'image pour chaque case
            let cartImg = document.createElement("img");
            cartImg.className = "cartitem__img";
            cartImg.alt = item.name;
            cartImg.src = item.imageUrl;
            cartImg.style.width = "10%";
            cartItem.appendChild(cartImg);


            //cree une div pour le nom du produit et le choix du lentille
            let cartDetails = document.createElement("div");
            cartDetails.className = "cartitem__details";
            cartItem.appendChild(cartDetails);

            //cree le titre de produit pour chaque case
            let cartTitle = document.createElement("h3");
            cartTitle.textContent = item.name;
            cartTitle.className = "cartitem__title";
            cartDetails.appendChild(cartTitle);


            //cree la lentille choisi
            let cartLenses = document.createElement("h4");
                cartLenses.className = "cartitem__lenses";
                cartDetails.appendChild(cartLenses);
            if (item.lenses !== null) {
                cartLenses.textContent = "Finition " + item.lenses;
            } else {
                //Dans le cas où l'utilisateur ne coche aucune option de personnalisation
                cartLenses.textContent = "Finition Standard";
                item.lenses = "Standard";
            }



            //cree la quantité de produits achetés pour chaque case
            let cartQty = document.createElement("span");
            cartQty.textContent = item.quantity;
            cartQty.className = "cartitem__qty";
            cartItem.appendChild(cartQty);

           






            //cree le prix total pour chaque case
            let cartPrice = document.createElement("p");
            cartPrice.className = "cartitem__price";


            //Transfo du prix en euros 
            let totalPrice = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(item.price/100 * item.quantity);
            cartPrice.textContent = totalPrice;
            cartItem.appendChild(cartPrice);


            // cree le bouton supprimer
            let cartButton = document.createElement("button");
            cartButton.className = "btn btn-secondary cartitem__button btn__remove";
            cartButton.setAttribute("role", "button");
            cartButton.innerHTML = 'Supprimer du panier';


            // Stocke via le bouton, l'id du produit et l'option lentille selectionee
            cartButton.setAttribute("data-id", [item._id, item.lenses]);

            // Au clic , lance la fonction de suppression de l'article
            cartButton.addEventListener("click", suppressItem); 
            cartItem.appendChild(cartButton); 


            // cree le bouton pour smartphone
            let cartTrash = document.createElement("i");
            cartTrash.className = "cartitem__trash fas fa-trash-alt";
            cartTrash.setAttribute("role", "button");
            cartTrash.setAttribute("data-id", [item._id, item.lenses]);
            cartTrash.addEventListener("click", suppressItem); 
            cartItem.appendChild(cartTrash); 
        });
    } else {

        //Affichage d un message si le panier est vide
        cartSection.innerHTML = '<h2 id="emptycart">Votre panier est vide.</h2>';
    } 
}












/**
* calcul du  montant total du panier en Euros
* @param {Array} CART.contents

* @return {Number} totalPrice Montant total du papier
*/
let cartAmount = document.getElementById("cart-amount");

 function calculateCartAmount() {
    let totalPrice = 0;
    CART.contents.forEach(item => {
       totalPrice += (item.price/100 * item.quantity)
    });
    return totalPrice;
  }







/*FORMULAIRE */






//Capture des éléments du DOM
let buttonConfirm = document.getElementById("confirm");
let formSection = document.getElementById("form-section");
let formElt = document.getElementById("formtosubmit");
let formPreventElt = document.getElementById("prevent-msg");
let name = document.getElementById("lastName");
let firstname = document.getElementById("firstName");
let email = document.getElementById("email");
let address = document.getElementById("address");
let city = document.getElementById("city");





/*Animation du  formulaire quand on clique sur "terminer la commande"*/

buttonConfirm.addEventListener("click", () => {
   formSection.classList.add("active");
   let totalPrice = 0;
    CART.contents.forEach(item => {
       totalPrice += (item.price/100 * item.quantity) 
       localStorage.setItem("totalPrice",totalPrice)})
   
});
            



/*Validation des données du formulaire en utilisant l'API de contraintes HTML 5*/

name.addEventListener("keyup", function (event) {
  if(name.validity.patternMismatch) {
    name.setCustomValidity("Ceci ne ressemble pas à un nom de famille...");
  } else {
    name.setCustomValidity("");
  }
});
firstname.addEventListener("keyup", function (event) {
  if(firstname.validity.patternMismatch) {
    firstname.setCustomValidity("Ceci ne ressemble pas à un prénom...");
  } else {
    firstname.setCustomValidity("");
  }
});
email.addEventListener("keyup", function (event) {
  if(email.validity.typeMismatch) {
    email.setCustomValidity("Merci d'entrer une adresse email valide utilisant le symbole @");
  } else {
    email.setCustomValidity("");
  }
});
address.addEventListener("keyup", function (event) {
  if(address.validity.patternMismatch) {
    address.setCustomValidity("Merci d'entrer un numéro et le nom de la rue ou avenue");
  } else {
    address.setCustomValidity("");
  }
});
city.addEventListener("keyup", function (event) {
  if(city.validity.patternMismatch) {
    city.setCustomValidity("Ceci ne ressemble pas à un nom de ville...");
  } else {
    city.setCustomValidity("");
  }
});


/* Envoi des données  avec une fetch POST */

formElt.addEventListener("submit", function(e) { 
    //  empêche le formulaire d'envoyer des données par défaut sans validation 
    e.preventDefault();
    //Récupération des valeurs entrees
    let contact = { 
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };
    //Récupération des données du panier - id des produits commandés - en tableau de strings
    let products = CART.contents.map(item => item._id);
    order = {contact, products};
    // aucun article dans le panier, message 
    if (products.length == 0) {
        formPreventElt.style.visibility = "visible";
        formPreventElt.style.zIndex = "2000";
    } else {
    //envoie des  données du formulaire et la liste des id  par API fetch POST - fichier queries.js -*/
    sendFormData(order);}

    
    
}); 
    














/**stockage de l'order_id et le firstname dnas  local storage
* @param {String} data order, objet contenant contact et products
* @return {Objet} data.orderId, data.contact.firstName référence de commande et prénom du user contenus dans le localStorage
*/
async function storeIdName(data) {
    await localStorage.setItem("orderId", data.orderId);
    await localStorage.setItem("orderName", data.contact.firstName);
    // Renvoie vers la page de confirmation de commande, avec le prix total en memoire dans l url
    window.location.href = "confirmation.html" ;
}