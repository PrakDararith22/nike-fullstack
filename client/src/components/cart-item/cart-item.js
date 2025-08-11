import "./cart-item.css";
import { heart, trash } from "@assets";

class CartItem extends BaseComponent {
  static get observedAttributes() {
    return ["title", "price", "discount-percentage", "feature", "image"];
  }

  constructor() {
    super();
    this.title = "";
    this.price = "";
    this.feature = "";
    this.image = "";
    this.discountPercentage = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "title": {
          this.title = newValue || "";
          break;
        }
        case "price": {
          this.price = newValue || "";
          break;
        }
        case "feature": {
          this.feature = newValue || "";
          break;
        }
        case "image": {
          this.image = newValue || "";
          break;
        }
        case "discount-percentage": {
          this.discountPercentage = newValue || "";
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
    const features = (() => {
      try {
        console.log(JSON.parse(this.feature || "[]"));

        return JSON.parse(this.feature || "[]");
      } catch (e) {
        console.warn("Invalid feature format", e);
        return [];
      }
    })();
    this.template = /* html */ `
        <div class="flex gap-4 border-b py-8">
            <!-- image -->
          
              <img src="${this.image}" class="cart-item-image"/>
             <!-- information section -->
            <div class="flex flex-col gap-2 w-full">

                <div class="flex justify-between w-full">
                    <h4 class="font-medium">${this.title}</h4>

                     <!-- price information section hidden in desktop -->
                    <div class="hide-desktop">
                        ${
                          this.discountPercentage
                            ? (() => {
                                const price = parseFloat(this.price) || 0;
                                const discount = parseFloat(this.discountPercentage) || 0;
                                const disocuntedPrice = price - (price / 100) * discount;
                                return `
                                <p>${disocuntedPrice.toFixed(2)}</p>
                                <p><del>${this.price}<del></p>
                                <p class="text-success font-semibold">${discount}% off</p>`;
                              })()
                            : `<p class="text-success font-semibold">${this.price}</p>`
                        }
                    </div>
                </div>
                
                  <!-- feature information section -->
                <div class="flex gap-6 justify-between">
                    <div class="text-gray-800 font-semibold">
                      ${features.map(f => `<p>${f}</p>`).join("")}
                        <div>
                            <p>Size</p>
                            <p>Quatity</P>
                        </div>
                        <div class="flex">
                            <icon-button icon="${heart}"></icon-button>
                            <icon-button icon="${trash}" action="remove-cart-item"></icon-button>
                        </div>
                    </div>

                    <!-- price information section hidden in mobile tablet -->
                    <div class="hide-mobile hide-tablet ">
                         ${
                           this.discountPercentage
                             ? (() => {
                                 const price = parseFloat(this.price) || 0;
                                 const discount = parseFloat(this.discountPercentage) || 0;
                                 const disocuntedPrice = price - (price / 100) * discount;
                                 return `
                                <p>${disocuntedPrice.toFixed(2)}</p>
                                <p><del>${this.price}<del></p>
                                <p class="text-success font-semibold">${discount}% off</p>`;
                               })()
                             : `<p class="text-success font-semibold">${this.price}</p>`
                         }
                    </div>
                </div>

            </div>
           
        </div>
    `;
    this.render();
  }
}

customElements.define("cart-item", CartItem);
