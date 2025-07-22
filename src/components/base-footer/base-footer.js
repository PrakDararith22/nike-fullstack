import "@components";
import "./base-footer.css";
import {
  plusWhite,
  minusWhite,
  facebookCircle,
  xCircle,
  youtubeCircle,
  instagramCircle,
} from "@assets";

class BaseFooter extends BaseComponent {
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
    <div class="bg-black ">
      <div class="mx-4 base-footer ">

        <div class="base-footer-1span base-footer-border  flex flex-col gap-2 py-3 text-white">
          <a class="font-semibold text-p2">FIND A STORE</a>
          <a class="font-semibold text-p2">SIGN UP FOR EMAIL</a>
        </div>

        <div>
        
          <div class="hide-desktop text-white font-bold text-p2">
            <base-accordion 
            icon="${plusWhite}" 
            toggle-icon="${minusWhite}"
            title="GET HELP"
            ></base-accordion>

            <base-accordion 
            icon="${plusWhite}" 
            toggle-icon="${minusWhite}"
            title="ABOUT NIKE"
            ></base-accordion>

            <base-accordion 
            icon="${plusWhite}" 
            toggle-icon="${minusWhite}"
            title="NIKE APPS"
            ></base-accordion>
         </div>

          <div class="base-footer-1span flex gap-3 hide-mobile hide-tablet text-white">
            
            <div class="flex flex-col gap-2 px-6 text-gray-800 text-p4">
              <a>1sfsdfdsfdsf</a>
              <a>sfsdfdsfdsf</a>
              <a>sfsdfdsfdsf</a>
              <a>sfsdfdsfdsf</a>
            </div>

            <div class="flex flex-col">
              <a>2sfsdfdsfdsf</a>
              <a>sfsdfdsfdsf</a>
              <a>sfsdfdsfdsf</a>
              <a>sfsdfdsfdsf</a>
            </div>

            <div class="flex flex-col">
              <a>3sfsdfdsfdsf</a>
              <a>sfsdfdsfdsf</a>
              <a>sfsdfdsfdsf</a>
              <a>sfsdfdsfdsf</a>
            </div>

          </div>

        </div>

          <div class="base-footer-1span">
            <div class=" flex gap-4 py-8">
              <icon-button icon="${xCircle}" size="1.3"></icon-button>
              <icon-button icon="${facebookCircle}" size="1.3"></icon-button>
              <icon-button icon="${youtubeCircle}" size="1.3"></icon-button>
              <icon-button icon="${instagramCircle}" size="1.3"></icon-button>
            </div>
          </div>

          <div class="base-footer-1row base-footer-2col base-footer-legal-link align-self-end gap-5 py-3 text-gray-800 text-p5 whitespace-nowrap">
            <a class="font-semibold ">Term Of Use</a>
            <a class="font-semibold ">Terms and Conditions of Sale</a>
            <a class="font-semibold ">Company Details</a>
            <a class="font-semibold ">Privacy & Cookie Policy</a>
          </div>
      </div>
    </div>
    `;
    this.render();
  }
}

customElements.define("base-footer", BaseFooter);
