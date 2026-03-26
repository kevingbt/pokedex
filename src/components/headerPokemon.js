class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.handleResize = this.handleResize.bind(this);
  }

  static get observedAttributes() {
    return ["page", "pokemon-name", "pokemon-id"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    window.addEventListener("resize", this.handleResize);
    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.render();
  }

  render() {
    const page = this.getAttribute("page") || "home";
    const name = this.getAttribute("pokemon-name") || "";
    const id = this.getAttribute("pokemon-id") || "";
    const placeholderText = window.innerWidth < 780 
      ? "Rechercher" 
      : "Rechercher un Pokémon...";

    this.shadowRoot.innerHTML = `
    <style>
    @import url("reset.css");

    h1 {
      font-family: var(--font-h1);
      font-size: 32px;
      color: white;
    }
    .headerPokemon {
      background-color: var(--primary-color);
      padding: 20px 50px;
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 30px;
    }

    .headerHome {
      background-color: var(--primary-color);
      padding: 20px 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .headerHome a {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .headerHome div {
      position: relative;
    }

    #search {
      width: 400px;
      height: 45px;
      border-radius: 15px;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
      border: none;
      font-size: 18px;
      color: var(--grey);
      padding-left: 50px;
    }

    .headerHome div img {
      position: absolute;
      z-index: 2;
      left: 10px;
      top: 7px;
      pointer-events: none;
    }
  .imgHeader{
    width: 60px;
    height: 60px;
  }
    .idHeader{
    font-size:20px;
    }
    @media(max-width: 780px){
  h1 {
  font-size:24px;
}
  #search{
  font-size:16px;
   width: 250px;
  }
       @media(max-width: 600px){
  .headerHome, .headerPokemon{
  padding: 10px;
  }
  .imgHeader{
    width: 40px;
    height: 40px;
  }
    .headerHome a, .headerPokemon {
      gap: 10px;
    }
      h1 {
  font-size:20px;
}
    #search{
  font-size:12px;
   width: 120px;
   height: 35px;
   padding-left: 35px;
  }
   .headerHome div img{
   width:24px;
   height:24px;
   top: 5px;
   left:5px;
   }
}
    </style>
    <div class="${page === "home" ? "headerHome" : "headerPokemon"}">
        <a href="index.html">
            <img class="imgHeader" src="pokedex/src/assets/img/pokedex.png" alt="Logo du site">
            ${page === "home" ? "<h1>Pokedex</h1>" : ""}
        </a>
        ${
          page === "home"
            ? `<div>
            <img src="pokedex/src/assets/img/search32.png" alt="Loupe de recherche">
            <input id="search" type="text" placeholder="${placeholderText}" aria-label="Rechercher un Pokémon"></input>
        </div>`
            : `<div class="infoHeader">
            <h1>${name}</h1>
            <h1 class="idHeader">#${id}</h1>
        </div>`
        }
        
    </div>
`;
  }
}

customElements.define("header-component", Header);
