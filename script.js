const cardContainer = document.getElementById("card");
const precedent = document.getElementById("precedent");
const suivant = document.getElementById("suivant");

const headerComponent = document.querySelector("header-component");

let offset = 0; // décalage
let page = 1; //page affichée
let maxPage = window.pokedex?.maxPokemon || 1025; // nb max pages
let currentPokemonsData = []; // pokemon en cours d'affichage

function afficherMessageErreur(message) {
  cardContainer.innerHTML = "";
  const errorMsg = document.createElement("div");
  errorMsg.classList.add("error-message");
  errorMsg.innerHTML = `
        <div style="text-align: center; padding: 50px; color: #ff5555;">
            <p style="font-size: 24px; font-weight: bold;">Oups !</p>
            <p>${message}</p>
            <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">Réessayer</button>
        </div>
    `;
  cardContainer.appendChild(errorMsg);
}

function renderPokemon(data) {
  const card = document.createElement("pokemon-card");
  card.setAttribute("name", data.name);
  card.setAttribute("id", data.id);
  const image = data.sprites.front_default || "";
  card.setAttribute("image", image);

  const typesString = data.types.map((t) => t.type.name).join(",");
  card.setAttribute("types", typesString);

  const li = document.createElement("li");
  li.appendChild(card);
  cardContainer.appendChild(li);

  if (!image) {
    setTimeout(() => {
      const img = card.shadowRoot?.querySelector("img");
      if (img) img.alt = "Image non disponible";
    }, 0);
  }
}

async function Page() {
  try {
    cardContainer.innerHTML = "<p class='loader'>Chargement des Pokémon...</p>";
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`,
    );
    const data = await response.json();

    // Mise à jour de la pagination globale
    if (!window.pokedex) window.pokedex = {};
    window.pokedex.maxPokemon = data.count;
    maxPage = Math.ceil(data.count / 20);

    // Récupération des détails de chaque Pokémon
    const pokemonPromises = data.results.map((p) =>
      fetch(p.url).then((res) => {
        if (!res.ok) throw new Error("Détails du Pokémon introuvables");
        return res.json();
      }),
    );

    // On attend tous les résultats et on les stocke
    currentPokemonsData = await Promise.all(pokemonPromises);

    // On affiche les résultats
    affichagePokemon(currentPokemonsData);
  } catch (error) {
    console.error("Détails de l'erreur :", error);
    afficherMessageErreur(
      "Impossible de charger les Pokémon. Vérifiez votre connexion ou réessayez plus tard.",
    );
  }
}

function affichagePokemon(list) {
  cardContainer.innerHTML = "";
  if (list.length === 0) {
    const aucunResultat = document.createElement("p");
    aucunResultat.innerHTML = "Aucun résultat";
    aucunResultat.classList.add("aucunResultat");
    cardContainer.appendChild(aucunResultat);
    return;
  }
  list.forEach((pokemon) => renderPokemon(pokemon));
}

// offset gère à partir de quel pokemon je fetch (pour la pagination)
window.addEventListener("DOMContentLoaded", () => {
  Page();

  const search = headerComponent.shadowRoot.getElementById("search"); //récupération de la barre de recherche

  search.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();

    // On filtre notre tableau local de 20 pokémons
    const filtered = currentPokemonsData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term),
    );

    affichagePokemon(filtered);
  });

  precedent.addEventListener("click", () => {
    if (page > 1) {
      offset -= 20;
      page--;
    } else {
      offset = (maxPage - 1) * 20;
      page = maxPage;
    }
    search.value = "";
    Page();
  });

  suivant.addEventListener("click", () => {
    if (page < maxPage) {
      offset += 20;
      page++;
    } else {
      offset = 0;
      page = 1;
    }
    search.value = "";
    Page();
  });
});
