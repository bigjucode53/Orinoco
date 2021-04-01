



/*page de confirmation avec le message perso et code perso  */



//Capture des éléments du DOM

let confirmedPrice = document.getElementById("sent-price");
let confirmedRef = document.getElementById("sent-ref");
let confirmedName = document.getElementById("sent-name");



// recupe de l'affichage du prix et de la référence de commande

document.addEventListener("DOMContentLoaded", () => {
    getTotalPrice();

    //Récup de la réf dans localStorage

    confirmedRef.innerHTML = "Référence de commande : <br/>" + localStorage.getItem("orderId");

    //Récup du prénom dans le localStorage

    confirmedName.textContent = localStorage.getItem("Name");


    //Récup du prix dans le localStorage

    confirmedPrice.textContent = localStorage.getItem("totalPrice") + " Euros";




    //Remise à 0 du panier, du compteur, et de l'option lentille

    localStorage.removeItem(CART.KEY);  
    localStorage.removeItem("count");
    localStorage.removeItem("chosenLenses");
    localStorage.remove("storedPdt");
});








/**
*Fonction qui récupère le prix total dans l url 

*/

function getTotalPrice() {   
    let url = new URL(window.location.href);
    let price = url.searchParams.get("price");
    confirmedPrice.textContent = "Prix total payé : " + price;
}