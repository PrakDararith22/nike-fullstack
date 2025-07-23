import "@components";
import { heart, chevron } from "@assets";
import shoe from "../../assets/shoe.png";
import "./product-detail.css";

export function productDetail() {
  return /* html */ `
    <base-header></base-header>
    <top-message-bar></top-message-bar>
        <div class=" product-list">
            <!-- detail section -->
            <div class="hide-desktop py-5">
                <h5 class="text-warning font-semibold">Bestseller<h5>
                <h4 class="font-medium">Air Jordan 1 High OG 'Shattered Backboard' </h4>
                <p class="text-p2 font-regular">Men's Shoes</p>
                <p class="text-p2 font-regular pb-3">8 colours</p>
                <h4 class="font-regular">QAR 899.00</h4>
            </div>
            <div class="product-detail-detail gap-10 pt-4">
                <!-- image -->
                <product-card
                image=${shoe}
                ></product-card>

                <!-- size section -->
                <div class="flex flex-col gap-5">
                    <!-- detail section -->
                    <div class="show-desktop text-p0">
                        <h5 class="text-warning font-semibold">Bestseller<h5>
                        <h4 class="font-medium">Air Jordan 1 High OG 'Shattered Backboard' </h4>
                        <p class="font-regular">Men's Shoes</p>
                        <p class="font-regular pb-3">8 colours</p>
                        <h4 class=" text-p3 font-medium">QAR 899.00</h4>
                    </div>

                    <!-- size buttons -->
                    <div class="flex flex-col gap-4">
                        <div class="flex justify-between items-center ">
                            <h5 class="font-semibold">Select Size</h5> 
                            <a>Size Guide</a> 
                        </div>
                        <div class="product-detail-size">
                            <base-button variant="secondary" type="status" text="XS" class="grow"></base-button>
                            <base-button variant="secondary" type="status" text="SM" class="grow"></base-button>
                            <base-button variant="secondary" type="status" text="X" class="grow"></base-button>
                            <base-button variant="secondary" type="status" text="XL" class="grow"></base-button>
                        </div>
                    </div>

                    <!-- buttons -->
                    <div class="flex flex-col gap-2">
                        <base-button text="Add to Bag" ></base-button>
                        <base-button text="Favorite" variant="secondary" icon="${heart}"></base-button>
                    </div>


                    <!-- description buttons -->
                    <div class="flex flex-col gap-3 text-p2 font-medium">
                            <p>Made from smooth jersey, this fitted tank top is stretchy with a slight drape, making it perfect for everyday wear.</p>
                            <ul class="pl-7">
                                <li>Colour Shown: Smoky Blue</li>
                                <li>Style: HF9719-006</li>
                            </ul>
                    </div>

                    <base-accordion title="Free Delivery and Returns"  icon="${chevron}"></base-accordion>
                </div>

            </div>
    


        <!-- recommended section -->
        <div class="py-4">
                <h2 class="font-medium pb-5 ">You might also like</h2>

                <div class="grid-container">
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
  `;
}
