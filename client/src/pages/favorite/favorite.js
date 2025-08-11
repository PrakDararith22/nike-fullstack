import "@components";
import "./favorite.css";
import { chevron } from "@assets";
import shoe from "../../assets/shoe.png";

export function favoritePage() {
  return /* html */ `
<base-header></base-header>
<top-message-bar></top-message-bar>
<div class="px-7 py-4 pb-12 mb-12">

    <div class="hide-desktop">
        <icon-button icon="${chevron}" text="Back"></icon-button>
        <p class="text-h3 font-semibold">Favorite</p>
        <div class="text-h4 font-semibold text-center p-12 m-12">
            <p>Items added to your favorite</p>
            <p>will be saved here</p>
        </div>
    </div>

    <div class="hide-mobile hide-tablet">
        <ul class="flex gap-8 justify-center py-6 border-b text-h5">
            <li><a>Profile</a></li>
            <li><a>Orders</a></li>
            <li><a>Favorites</a></li>
            <li><a>Settings</a></li>
        </ul>
        <div class="text-h4 font-semibold text-center p-12 m-12">
            <p>Items added to your favorite will be saved here</p>
        </div>
    </div>

<!-- recommended section -->
        <div class="pb-12 mb-12">
                <h2 class="font-medium pb-5 ">You might also like</h2>

                <div class="grid-container pb-12">
                    <product-card 
                    title="Nike Sportswear Chill Knit" 
                    image="${shoe}"
                    ></product-card>
                    <product-card 
                    title="Nike Sportswear Chill Knit" 
                    image="${shoe}"
                    ></product-card>
                    <product-card 
                    title="Nike Sportswear Chill Knit" 
                    image="${shoe}"
                    ></product-card>
                    <product-card 
                    title="Nike Sportswear Chill Knit" 
                    image="${shoe}"
                    ></product-card>
                    <product-card 
                    title="Nike Sportswear Chill Knit" 
                    image="${shoe}"
                    ></product-card>
                    <product-card 
                    title="Nike Sportswear Chill Knit" 
                    image="${shoe}"
                    ></product-card>
                    <product-card 
                    title="Nike Sportswear Chill Knit" 
                    image="${shoe}"
                    ></product-card>
                </div>
        </div>
</div>
<base-footer></base-footer>
  `;
}
