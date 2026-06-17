let panier = [];

const boutons = document.querySelectorAll(".add-cart");

boutons.forEach(btn => {

    btn.addEventListener("click", () => {

        const card = btn.closest(".product-card");

        const produit =
            card.querySelector("h3").textContent;

        const prix =
            parseFloat(
                card.querySelector(".price")
                .textContent.replace("€","")
            );

        const existant = panier.find(
            item => item.nom === produit
        );

        if(existant){
            existant.quantite++;
        }else{
            panier.push({
                nom: produit,
                prix: prix,
                quantite: 1
            });
        }

        afficherPanier();
    });

});

function toggleCart(){
    document
        .getElementById("cart-sidebar")
        .classList.toggle("open");
}

function afficherPanier(){

    const zone =
        document.getElementById("cart-items");

    zone.innerHTML = "";

    let total = 0;
    let nombre = 0;

    panier.forEach((item,index)=>{

        total += item.prix * item.quantite;
        nombre += item.quantite;

        zone.innerHTML += `
            <div class="cart-item">

                <strong>${item.nom}</strong>

                <p>
                    ${item.quantite} x
                    ${item.prix.toFixed(2)}€
                </p>

                <button
                    class="remove-btn"
                    onclick="supprimerArticle(${index})">
                    Supprimer
                </button>

            </div>
        `;
    });

    document.getElementById("cart-total")
        .textContent = total.toFixed(2) + "€";

    document.getElementById("cart-count")
        .textContent = nombre;
}

function supprimerArticle(index){

    panier.splice(index,1);

    afficherPanier();
}

function envoyerCommande(){

    if(panier.length === 0){
        alert("Panier vide");
        return;
    }

    let corps =
        "Bonjour,%0D%0A%0D%0AJe souhaite commander :%0D%0A%0D%0A";

    let total = 0;

    panier.forEach(item=>{

        corps +=
        `${item.nom} x${item.quantite} - ${(item.prix * item.quantite).toFixed(2)}€%0D%0A`;

        total += item.prix * item.quantite;
    });

    corps += `%0D%0ATotal : ${total.toFixed(2)}€`;

    window.location.href =
        `mailto:contact@apexcarpfishing.fr?subject=Commande Apex Carp Fishing&body=${corps}`;
}