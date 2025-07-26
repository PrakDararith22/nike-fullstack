import { renderHTML } from "@utility";

class BaseComponent extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    this.template = "";
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    this.innerHTML = "";
    this.appendChild(renderHTML(this.template));
  }
}

export { BaseComponent };
