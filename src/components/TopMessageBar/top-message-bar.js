import "./top-message-bar.css";

class TopMessagebar extends BaseComponent {
  static get observedAttributes() {
    return ["href", "linktext"];
  }

  constructor() {
    super();
    this.href = "#";
    this.linktext = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "href": {
          this.href = newValue || "";
          break;
        }
        case "linktext": {
          this.linktext = newValue || "";
          break;
        }
        default: {
          console.warn(`Unhandled observed attribute: ${name}`);
          break;
        }
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    this.template = `
    <div class="top-message-bar bg-gray-200 flex gap-1 justify-center items-center">
        <p class="text-p3">Free Delivery, Member Exclusive Products and Promos for all our Members.</p>
       <u> <a href=${this.href} class="text-p3 font-semibold">${this.linktext}</a> </u>
    </div>
    `;
    this.render();
  }
}

customElements.define("top-message-bar", TopMessagebar);
