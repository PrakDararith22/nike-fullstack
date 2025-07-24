import "./menu-panel.css";
import { cross, heart, cartEmpty } from "@assets";

class MenuPanel extends BaseComponent {
  static get observedAttributes() {
    return ["test"];
  }

  constructor() {
    super();
    this.test = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.addEventListener("icon-button", event => {
      const actions = event.detail.action;
      if (actions === "menuClose") {
        this.togglePanel();
      }
    });
  }

  togglePanel() {
    const panel = this.querySelector(".menu-panel");
    if (panel) {
      panel.classList.toggle("open");
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "icon": {
          this.icon = newValue || "";
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
    this.template = /* html */ `
    <div class="menu-panel fixed z-tooltip  top-0 right-0 w-full h-full">
        <div class="menu-panel-content bg-white h-full  py-4 px-8 flex flex-col justify-between">    
            <div class="flex flex-col w-full">
                <icon-button icon="${cross}" action="menuClose" class="align-self-end "></icon-button>
                <div class="pt-10 flex flex-col gap-4 text-h3 font-semibold">
                    <a>New & Featured</a>
                    <a>Men</a>
                    <a>Women</a>
                    <a>Kids</a>
                    <a>Jordan</a>
                    <a>Sale</a>
                </div>
            </div>

            <div>
                <div class="pb-6 text-gray-900 text-p4">
                    <p class="inline">Become a Nike Member for the best products, inspiration and stories in sport.</p>
                    <a class="inline text-black font-bold"> <u> Learn More </u></a>
                </div>
                <div class=" pb-12 mb-12  flex gap-2">
                    <base-button text="Join Us"></base-button>
                    <base-button text="Sign In" variant="secondary"></base-button>
                </div>

                <div class="flex flex-col gap-3">
                    <icon-button icon="${heart}" text="Favorite"></icon-button>
                    <icon-button icon="${cartEmpty}" text="Bag"></icon-button>
                    <icon-button icon="${heart}" text="Track Order"></icon-button>
                    <icon-button icon="${heart}" text="Find a Store"></icon-button>
                    <icon-button icon="${heart}" text="Help"></icon-button>
                </div>
            </div>
        </div>

    </div>
    `;
    this.render();
  }
}

customElements.define("menu-panel", MenuPanel);
