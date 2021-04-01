


/* Requêtes GET et POST utilisées sur les différentes pages du site (API fetch)*/






/**
*Fonction pour récupérer la liste des produits depuis le serveur grâce à une API fetch GET
* @return {Array} reponse Tableau contenant la liste des produits
*/


function getProducts() { 
    //Récupération des données via une API fetch 
    fetch("http://localhost:3000/api/cameras", {mode: "cors"})
        .then(response => response.json())
        .then(response => {
            
            showProducts(response);//Affichage de  la liste des produits une fois que les données sont chargées
        })


        //Affichage de  l'erreur si requête ne fonctionne pas
        .catch(error => alert("Erreur : " + error));
}
   







/**
*recuperation d un produit précis depuis le serveur - 
via son id intégré aux paramètres de l'URL - grâce à une API fetch GET ciblée
* @param {String} id Id du produit sélectionné
* @return {Object} storePdt Objet produit stocké dans localStorage
*/

function getProduct(id) {   
    //Récupèration de l id contenu dans les paramètres de la page URL

    let url = new URL(window.location.href);
    id = url.searchParams.get("id");

    //Récupération des données via une API fetch 

    fetch('http://localhost:3000/api/cameras/' + id , {mode: "cors"})
        .then(response => response.json())
        
        .then(response => {
            showItem(response);

            //Création d'un objet représentant le produit sélectionné 
            
            let pdtSelected = {
                _id : response._id,
                name: response.name,
                price: response.price,
                description: response.description,
                imageUrl: response.imageUrl,
                quantity: 1
            }; 

            //Conservation du produit mis à jour dans le localStorage
            let storedPdt = JSON.stringify(pdtSelected);
            localStorage.setItem("storedPdt", storedPdt);  
         })

        //Affichage de  l'erreur si requête ne fonctionne pas


        .catch( ()=> { document.location.href="index.html"; ;

        var m="Un problème est survenu!";
        alert(m);;
            
            
            
            }
            
            
        )
        
        
        

        

        
        
        
        
        ;
        

        
    
    
    
    }
     








/**
*Fonction pour envoyer les données du formulaire ainsi que la 
liste des id des produits commandés via une API fetch POST
* @param {Object} data Objet contenant contact et products 
* @return {Object} response Objet contenant l'objet contact, le tableau de produits, et l'id de référence de commande 

*/
function sendFormData(data) { 

 fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            storeIdName(response); 
        })
        .catch(error => alert("Erreur : " + error));
        
}