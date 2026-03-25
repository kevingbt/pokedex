class StatBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name", "stat"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name");
    const stat = this.getAttribute("stat");
    const maxStat = 255;
    const pourcentage = (stat / maxStat) * 100;

    this.shadowRoot.innerHTML = `
      <style>
      @import url("reset.css");

      .statInfo{
  display: flex;
  justify-content: space-between;
  align-items: center;
  }

  .statInfo p:first-of-type{
  font-family: var(--font-p);
  font-size: 18px;
  color: var(--grey);
  font-weight:700;
}
  .statInfo p:last-of-type{
  font-family: var(--font-p);
  font-size: 18px;
  color: var(--black);
  font-weight:700;
}


.barreContainer{
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 10px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;

}

.barre{
height: 100%;
background-color: var(--primary-color);
}
        
      </style>

      <div class="statItem">
        <div class="statInfo">
            <p>${name}</p>
            <p>${stat}</p>
        </div>
        <div class="barreContainer">
            <div class="barre" style="width: ${pourcentage}%"></div>
        </div>
      </div>
    `;
  }
}
customElements.define("stat-bar", StatBar);
