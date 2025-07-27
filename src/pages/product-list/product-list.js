import "@components";
import "./product-list.css";
import { sliders, chevron } from "@assets";

export function productList(data, category) {
  return /* html */ `
    <base-header></base-header>
    <top-message-bar></top-message-bar>

    <div class="product-list">
        <h2 class="font-medium pl-4 pb-7 border-b">${category}</h2>
        <div>

			<div class="flex items-center justify-between py-4">
				<p class="text-gray-800 font-semibold">${data.length} Results</p>
				<base-button text="filter" icon="${sliders}" variant="secondary"></base-button>
			</div>
        
			<!-- content section -->  
			<div class="product-list-content gap-4">

				<!-- desktop filter panel -->
				<div class="sticky flex flex-col align-between px-3 hide-mobile hide-tablet"> 
					<base-accordion type="status" title="sdsf" icon="${chevron}">
		
					</base-accordion>
				</div>

				<!-- product grid-->
				<div class="">
					<div class="product-list-grid flex">
						${data
              .map(product => {
                const price = product.price?.amount
                  ? `${product.price.currency} ${product.price.amount.toFixed(2)}`
                  : "Price Unavailable";
                return `
					<a href="/${category.replace(/-/g, " ").replace(/&/g, "and").replace(/\s+/g, "-")}/${product.id}">

						<product-card
							title="${product.name}"
							category="${product.category}"
							price="${price}"
							image="${product.images}"
						></product-card>
					</a>
				`;
              })
              .join("")}
						
						
					</div>
				</div>
			</div>

        </div>
    </div>

    <base-footer></base-footer>
  `;
}
