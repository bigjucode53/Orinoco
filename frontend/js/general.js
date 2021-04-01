


/*Fonctions utiles dans differentes pages :
-  ajout, suppression... de l'objet panier CART, 
- icône panier du menu avec nombre de produits commandés. */





// variables stockées dans localStorage

let orderId = "";
let orderName = "";
let chosenLenses = "";
let count = 0;




// élements du DOM

let cartCount = document.getElementById("cartcount");




//l'objet "panier"

const CART = { 



    //Création d'une Key unique 

    KEY : "cartContentsInStorage", 
    contents : [],









    /**
    * initialisation du  CART 
    * @ param {Array} storedContents Produits déjà contenus dans le panier
    * @ return {Array} CART.contents Contenu du panier du navigateur
    * @ return {number} count Compteur indiquant le nombre de produits dans le panier du navigateur
    */

    init() {

        //Vérif du localStorage pour voir s'il y a déjà des éléments dans le CART

        let storedContents = localStorage.getItem(CART.KEY);
        if (storedContents) {

            //Si oui, transfèrt dans le panier de la page  et  mise à jour du compteur de l'icône panier

            CART.contents = JSON.parse(storedContents);
            CART.contents.forEach(content => {
                count += content.quantity;
            });
        } else {
            CART.contents = [];
        }

        //Synchronisation du CART

        CART.sync();
    },









    /**
    * synchro du CART du localStorage à partir du panier du navigateur - et pareil pour le compteur.
    * @ param {Array} CART.contents Produits déjà contenus dans le panier du navigateur
    * @ param {number} count Compteur de l'icône panier du menu
    * @ return {Array} storedCount Contenu du panier dans le  localStorage 
    * @ return {number} storedCount Contenu du compteur dans le localStorage
    */

    async sync() {
        let storedCart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, storedCart);
        let storedCount = JSON.stringify(count);
        await localStorage.setItem("count", storedCount);
    },








    /**
    *  trouver un article dans le panier par l' ID
    * @param {String} id Id que l'on recherche
    * @return {Object} isFound[0] Premier produit résultat de la recherche
    */

    find(id) {
        let isFound = CART.contents.filter(item => {
            if (item._id == id) {
                return true;
            }
        });
        if (isFound && isFound[0]) {
            return isFound[0];
        }
    },








    /**
    *  ajoutd  un produit dans le panier
    * 
    * @param {String} id Id du produit que l'on souhaite ajouter
    * @return {Number} isFound[0].quantity Quantité de l'article trouvé avec même id et même lentille
    */
    add(id, qty=1) { 
        let storedLenses = localStorage.getItem("chosenLenses");




        //en comparant l ID ,Vérifie si ce produit est déjà dans le panier 
        if (CART.find(id)) {



            // Filtre les items du panier, par l'id 
            let filterCart = CART.contents.filter(item => (item._id == id));



            // Vérifie si  le même id a la même lentille
            let isFound = filterCart.filter(item => {
                if (item.lenses == storedLenses) {
                    return true;
                }
            });
            // si l'id et  lentille  identiques,  augmente la quantité de l'article  dans le panier
            if (isFound && isFound[0]) {
                isFound[0].quantity = isFound[0].quantity + qty; 
            }
            else {
                // Si l'id  identique mais pas la lentille,ajout d une nouvelle case produit 
                CART.addFromStorage();
            }
        } else {
            // Si l'id différent, ajout dune nouvelle case produit 
            CART.addFromStorage();
        } 
        //Mise à jour du  panier dans le localStorage et actualisation  le compteur
        count +=1;
        CART.sync();
    },  









    /**
    * 
    *  ajoute d un produit dans le panier quand le produit n'y est pas déjà
    * @param {Object} pdtStorage Objet produit unique stocké dans localStorage
    * @param {String} storedLenses Option lentille stockée dans localStorage
    * @return {Array} CART.contents Panier du navigateur une fois le produit ajouté
    */

    addFromStorage() {
        //Récupèration du produit grâce au localStorage

        let pdtInStorage = localStorage.getItem("storedPdt");
        let pdtSelected = JSON.parse(pdtInStorage);


        //Récupère le lentille choisie grâce au localStorage et ajout au produit
        let storedLenses = localStorage.getItem("chosenLenses");
        pdtSelected.lenses = storedLenses;
        if (pdtSelected) {

            
           //Ajout du produit au panier dans le navigateur
            CART.contents.push(pdtSelected);
        }
    },









     /**
    * suppression d un article du panier 
    * 
    * @param {String} id Id du produit à supprimer
    * @param {String} lenses Option lentille du produit à supprimer
    * @return {Array} CART.contents Panier du navigateur une fois le produit enlevé
    * @return {Number} count Compteur de l'icône panier
    */
    remove(id, lenses) {

        //Filtre les produits du panier par l'id - possibilité de meme id mais pas la meme lentille  -
        let filteredCart = CART.contents.filter(item => {
            if (item._id == id) { 
            return true;
           }
        });
        //Filtre  par la lentille, l'article  a le même id et la même lentille
        let sameOrder = filteredCart.filter(item => {
            if (item.lenses == lenses) {
                return true;
            }
        });
       // :  supprime du panier si pas equivalent a dessus
        CART.contents = CART.contents.filter(item => {
          if (item !== sameOrder[0]) { 
               return true;
              }
        });
        //Réinit et calcul de l'icône panier
        count = 0;
        if (CART.contents) {
            CART.contents.forEach(content => {
                count += content.quantity;
            });
        } else {
            count = 0;
        }

        //Met à jour le panier dans le localStorage et le prix total
        CART.sync();
        cartAmount.textContent = calculateCartAmount() + " EUR";

        //Affichage de l'icône panier
        setTimeout(function() {
            showCount(); 
        }, 1000);       
     },
};








/**
*ajout du  produit au panier depuis la page produit
* @param {String} id Id du produit récupéré via le "data-id" du bouton
*/

function addItem(e) { // 
    //Récupération de l'id stocké dans le "data-id" du bouton
    let id = e.target.getAttribute("data-id");
    CART.add(id, 1);
}










/**
*suppression d  un produit du panier 
* @param {Array} tableau de strings récupéré via le "data-id" du bouton, ayant comme éléments l'id et la lentille du produit
*/

function suppressItem(e) {

    //Récupère l'id et la lentille stockés dans le "data-id" du bouton
    let data = e.target.getAttribute("data-id");
    let id = data.slice(0, 24);
    let lenses = data.slice(25);

    //Gère le cas où l'user n'a pas choisi de finition lentille
    if (lenses =="") {
        lenses = "Standard";
    }
    CART.remove(id, lenses);
    //Actualise le panier
    showCart(); 
}











/**
*affichage du nombre de produits achetés sur l'icône panier
@param {number} storeCount Compteur stocké dans localStorage
*/

async function showCount() {
    // Récupèration du  compteur dans le localStorage 
    let storedCount = await localStorage.getItem("count");
    cartCount.textContent = JSON.parse(storedCount);
} 