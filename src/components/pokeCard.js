class PokemonCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name", "id", "image", "types"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name");
    const id = this.getAttribute("id");
    const image = this.getAttribute("image") || "";
    const types = this.getAttribute("types") ? this.getAttribute("types").split(",") : [];

    const typeColor = {
      normal: "#c2c2c2", fire: "#ef0e16", water: "#638ef2", electric: "#faea05",
      grass: "#5bff0a", ice: "#66caca", fighting: "#e49e25", poison: "#862c86",
      ground: "#debf67", flying: "#aa95ec", psychic: "#fa6290", bug: "#8b9909",
      rock: "#90780e", ghost: "#655087", dragon: "#5018d4", dark: "#5f4d40",
      steel: "#767682", fairy: "#cf7286",
    };

    this.shadowRoot.innerHTML = `
      <style>
      @import url("reset.css");
        .pokemonImg {
            height: 182px;
            width: 182px;
            align-self: center;
        }
        .pokemonId {
            font-family: var(--font-p);
            font-size: 18px;
            color: var(--grey);
        }
        .pokemonName {
            font-family: var(--font-h2);
            font-size: 24px;
            color: var(--black);
        }

        .pokemonCard {
            color: white;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            padding: 15px;
        }
        
        .pokemonCard:hover {
            cursor: pointer;
            transform: scale(1.02);
        }

        .pokemonTypesContainer{
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }

        .pokemonType{
            font-family: var(--font-p);
            font-size: 18px;
            font-weight: 500;
            padding-inline: 10px;
            border-radius: 10px;
        }
      </style>

      <a href="pokemon.html?id=${id}" class="pokemonCard">
        <img class="pokemonImg" src="${image}" alt="${name}">
        <p class="pokemonId">#${id}</p>
        <h2 class="pokemonName">${name}</h2>
        <div class="pokemonTypesContainer">
          ${types.map(t => `<span class="pokemonType" style="background:${typeColor[t] || '#ccc'}">${t}</span>`).join('')}
        </div>
      </a>
    `;
  }
}
customElements.define("pokemon-card", PokemonCard);