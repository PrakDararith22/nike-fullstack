import "./search-panel.css";
import { cross, nike } from "@assets";

class SearchPanel extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.addEventListener("icon-button", event => {
      const actions = event.detail.action;
      if (actions === "searchClose") {
        this.togglePanel();
      }
    });
  }

  togglePanel() {
    const panel = this.querySelector(".search-panel");
    if (panel) {
      panel.classList.toggle("open");
    }
  }

  updateTemplate() {
    this.template = /* html */ `
    <div class="search-panel fixed z-tooltip w-full top-0 right-0 ">
        <div class="search-panel-content bg-white pt-4 px-8">
          <div class="flex gap-12">
            <icon-button icon=${nike} size="2" class="hide-mobile"></icon-button>
              <div class="flex flex-col grow">
                <search-input text="Search" type="search" size="large"></search-input>
                <div class="pt-10 flex flex-col gap-4">
                <p class="text-p3 font-semibold text-gray-500">Popular Search Terms</p>
                <div class="flex flex-col gap-2 text">
                  <a href="Jordan">Jordan</a>
                  <a>sale</a>
                  <a>New & Featured</a>
                </div>
              </div>
          </div>
              <icon-button icon="${cross}" action="searchClose"></icon-button>
          </div>
        </div>
    </div>
    `;
    this.render();
  }
}

customElements.define("search-panel", SearchPanel);
