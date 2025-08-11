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
  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  updateTemplate() {
    const footerLinks = {
      "GET HELP": [
        "Order Status",
        "Shipping and Delivery",
        "Returns",
        "Payment Options",
        "Contact Us",
      ],
      "ABOUT NIKE": ["Become a Member", "News", "Careers", "Investors", "Sustainability"],
      "NIKE APPS": ["Nike Run Club", "Nike Training Club"],
    };
    console.log(
      footerLinks["NIKE APPS"]
        .map(link => `<a href="#" class="text-gray-300 text-p3">${link}</a>`)
        .join(" ")
    );

    this.template = /* html */ `
    <div class="bg-black ">
      <div class="mx-4 base-footer ">

        <div class="base-footer-1span base-footer-border  flex flex-col gap-2 py-3 text-white">
          <a class="font-semibold text-p2">FIND A STORE</a>
          <a href="/signin" class="font-semibold text-p2 whitespace-nowrap">SIGN UP FOR EMAIL</a>
        </div>

        <div>
        
          <div class="hide-desktop text-white font-bold text-p2 ">
            <base-accordion 
            icon="${plusWhite}" 
            toggle-icon="${minusWhite}"
            title="GET HELP"
            no-border
            content="
            <div class='flex flex-col gap-2 text-p4'>
              <a>Order Status</a>
              <a>Shipping and Delivery</a>
              <a>Returns</a>
              <a>Payment Options</a>
              <a>Contact Us</a>
            </div>
            
            "
            ></base-accordion>

            <base-accordion 
            icon="${plusWhite}" 
            toggle-icon="${minusWhite}"
            title="ABOUT NIKE"
            no-border
            content="
            <div class='flex flex-col gap-2 text-p4'>
              <a>Become a Member</a>
              <a>News</a>
              <a>Careers</a>
              <a>Investors</a>
              <a>Sustainability</a>
            </div>
            
            "
            ></base-accordion>

            <base-accordion 
            icon="${plusWhite}" 
            toggle-icon="${minusWhite}"
            title="NIKE APPS"
             no-border
               content="
            <div class='flex flex-col gap-2 text-p4'>
              <a>Nike Run Club</a>
              <a>Nike Training Club</a>
            </div>
            
            "
            ></base-accordion>
         </div>

          <div class="base-footer-1span flex gap-3 justify-center hide-mobile hide-tablet text-white">
            
            ${Object.entries(footerLinks)
              .map(([section, links]) => {
                const linksHTML = links.map(link => `<a href="#">${link}</a><br>`).join("");

                return `
                  <div class="text-start px-4">
                    <h3 class="text-start text-p4">${section}</h3>
                    <div class="text-start text-p5 py-3">
                      ${linksHTML}
                    </div>
                  </div>
                `;
              })
              .join(" ")}

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

          <div class="base-footer-1row base-footer-2col base-footer-legal-link align-self-end gap-5 py-3 text-gray-200 text-p5 whitespace-nowrap">
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
