class NavPokemon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name", "id"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name");
    const id = this.getAttribute("id");

    this.shadowRoot.innerHTML = `
      <style>
      @import url("reset.css");

      .nav{
      display:flex;
      justify-content:center;
      gap:5px;
      align-items:end;
      }

        .pokemonId {
  font-family: var(--font-h1);
  font-size: 20px;
  color: white;
        }
        .pokemonName {
  font-family: var(--font-h1);
  font-size: 30px;
  color: white;
        }
  @media (max-width: 600px){
  .pokemonName{
  font-size:14px;
  }
  .pokemonId{
  display:none;
  }
  }
      </style>

      <a href="pokemon.html?id=${id}" class="nav">
        <p class="pokemonName">${name}</p>
        <p class="pokemonId">#${id}</p>
      </a>
    `;
  }
}
customElements.define("nav-pokemon", NavPokemon);
