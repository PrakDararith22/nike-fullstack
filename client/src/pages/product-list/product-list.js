import "@components";
import "./product-list.css";
import { sliders, chevron, sort } from "@assets";
import { shuffleObjectValues } from "@utility";

export function productList(data, category) {
  return /* html */ `
  <div class="product-list-page flex flex-col">
    <base-header></base-header>
    <top-message-bar></top-message-bar>

    <div class="product-list grow">
	<div class="flex justify-between">
        <h2 class="font-medium pb-7">${category}</h2>
		<div class="flex">
			<icon-button text="Hide Filter" icon="${sliders}" variant="secondary"></icon-button>
			<icon-button text="Sort By" icon="${sort}" variant="secondary"></icon-button>
		</div>
	</div>
        <div>

			<div class="flex items-center justify-between py-4 hide-desktop">
				<p class="text-gray-800 font-semibold">${data.length} Results</p>
				<base-button text="filter" icon="${sliders}" variant="secondary"></base-button>
			</div>
        
			<!-- content section -->  
			<div class="product-list-content gap-4">

				<!-- desktop filter panel -->
				<div class="sticky flex flex-col align-between px-3 hide-mobile hide-tablet"> 
					<base-accordion type="status" title="Gender" icon="${chevron}"
					>
					</base-accordion>
					
				</div>

				<!-- product grid-->
				<div class="">
					<div class="product-list-grid flex">
						${shuffleObjectValues(data)
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
	</div>
  `;
}
