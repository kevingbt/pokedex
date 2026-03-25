class PreviewPokemon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name", "id", "image"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name");
    const id = this.getAttribute("id");
    const image = this.getAttribute("image") || "";


    this.shadowRoot.innerHTML = `
      <style>
      @import url("reset.css");
        .pokemonImg {
            height: 80px;
            width: 80px;
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
      </a>
    `;
  }
}
customElements.define("preview-pokemon", PreviewPokemon);