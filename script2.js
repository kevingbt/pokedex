const afficher = document.getElementsByClassName("affichage");
const header = document.getElementById("header");
const imagePrincipale = document.getElementById("imagePrincipale");
const face = document.getElementById("face");
const dos = document.getElementById("dos");
const types = document.getElementById("types");
const poids = document.getElementById("poids");
const taille = document.getElementById("taille");
const capa = document.getElementById("capa");
const statContainer = document.getElementById("statContainer");
const evoContainer = document.getElementById("evoContainer");

const prev = document.getElementById("prev");
const actual = document.getElementById("actual");
const next = document.getElementById("next");

const typeColor = {
  normal: "#c2c2c2",
  fire: "#ef0e16",
  water: "#638ef2",
  electric: "#faea05",
  grass: "#5bff0a",
  ice: "#66caca",
  fighting: "#e49e25",
  poison: "#862c86",
  ground: "#debf67",
  flying: "#aa95ec",
  psychic: "#fa6290",
  bug: "#8b9909",
  rock: "#90780e",
  ghost: "#655087",
  dragon: "#5018d4",
  dark: "#5f4d40",
  steel: "#767682",
  fairy: "#cf7286",
};

window.addEventListener("DOMContentLoaded", () => { // gère l'affichage de la page détail du pokemon
  const id = parseInt(new URLSearchParams(window.location.search).get("id"));
  const max = window.pokedex?.maxPokemon || 1025;
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      header.setAttribute("pokemon-name", data.name);
      header.setAttribute("pokemon-id", data.id);
      const img1 = document.createElement("img");
      img1.src =
        data.sprites.other?.["official-artwork"]?.front_default ??
        data.sprites.front_default;
      img1.alt = data.name;
      imagePrincipale.appendChild(img1);
      const img2 = document.createElement("img");
      img2.src = data.sprites.front_default;
      img2.alt = data.name;
      face.appendChild(img2);
      const img3 = document.createElement("img");
      img3.src = data.sprites.back_default;
      img3.alt = data.name;
      dos.appendChild(img3);
      data.types.map((t) => {
        const div = document.createElement("div");
        div.innerHTML = t.type.name;
        div.style.backgroundColor = typeColor[t.type.name] || "#ccc";
        types.appendChild(div);
      });
      poids.innerHTML = data.weight + "kg";
      taille.innerHTML = data.height + "m";
      data.abilities.map((c) => {
        const div = document.createElement("div");
        div.innerHTML = c.ability.name;
        capa.appendChild(div);
      });

      data.stats.map((s) => {
        const card = document.createElement("stat-bar");
        card.setAttribute("name", s.stat.name);
        card.setAttribute("stat", s.base_stat);
        statContainer.appendChild(card);
      });

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`) //on récupére l'id de la chaîne d'évolution
        .then((response) => response.json())
        .then((speciesData) => {
          return fetch(speciesData.evolution_chain.url); // on récupère la chaîne d'évolution
        })
        .then((response) => response.json())
        .then(async (evoData) => {
          evoContainer.innerHTML = "";

          // On affiche le 1er pokemon
          await renderPokemonCard(evoData.chain.species.name);

          if (evoData.chain.evolves_to.length > 0) {
            for (const e of evoData.chain.evolves_to) {
              await renderPokemonCard(e.species.name); // on affiche le 2eme

              if (e.evolves_to.length > 0) {
                for (const e2 of e.evolves_to) {
                  await renderPokemonCard(e2.species.name); // puis le 3eme
                }
              }
            }
          }
        });

      const prevPokemon = document.createElement("nav-pokemon");
      const actualPokemon = document.createElement("nav-pokemon");
      const nextPokemon = document.createElement("nav-pokemon");

      actualPokemon.setAttribute("name", data.name);
      actualPokemon.setAttribute("id", data.id);
      actual.appendChild(actualPokemon);

      console.log(data.id);
      if (data.id === 1) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${max}`)
          .then((response) => response.json())
          .then((data) => {
            prevPokemon.setAttribute("name", data.name);
            prevPokemon.setAttribute("id", data.id);
          });
      } else {
        fetch(`https://pokeapi.co/api/v2/pokemon/${data.id - 1}`)
          .then((response) => response.json())
          .then((data) => {
            prevPokemon.setAttribute("name", data.name);
            prevPokemon.setAttribute("id", data.id);
          });
      }
      prev.appendChild(prevPokemon);
      if (data.id === max) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${1}`)
          .then((response) => response.json())
          .then((data) => {
            nextPokemon.setAttribute("name", data.name);
            nextPokemon.setAttribute("id", data.id);
          });
      } else {
        fetch(`https://pokeapi.co/api/v2/pokemon/${data.id + 1}`)
          .then((response) => response.json())
          .then((data) => {
            nextPokemon.setAttribute("name", data.name);
            nextPokemon.setAttribute("id", data.id);
          });
      }
      next.appendChild(nextPokemon);
    });
});

async function renderPokemonCard(name) { //gère l'affichage des évolutions
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pData = await response.json();

    const card = document.createElement("preview-pokemon");
    card.setAttribute("name", pData.name);
    card.setAttribute("id", pData.id);
    card.setAttribute("image", pData.sprites.front_default);

    evoContainer.appendChild(card);
  } catch (error) {
    console.error("Erreur lors du rendu de la carte évolution:", error);
  }
}
