import "@components";
import "./product-list.css";
import { sliders, chevron } from "@assets";
import image from "../../assets/shoe.png";

export function productList() {
  return /* html */ `
    <base-header></base-header>
    <top-message-bar></top-message-bar>

    <div class="product-list">
        <h2 class="font-medium pl-4 pb-7 border-b">EC25</h2>
        <div>

			<div class="flex items-center justify-between py-4">
				<p class="text-gray-800 font-semibold">10 Results</p>
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
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
						<product-card
						status="Bestseller"
						title="Air Jordan 1 High OG 'Shattered Backboard'"
						category="Men's Shoes"
						price="QAR 629.00"
						image="${image}"
						></product-card>
					</div>
				</div>
			</div>

        </div>
    </div>

    <base-footer></base-footer>
  `;
}
