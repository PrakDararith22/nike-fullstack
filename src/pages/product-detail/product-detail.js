import "@components";
import { heart, chevron } from "@assets";
import shoe from "../../assets/shoe.png";
import "./product-detail.css";

export function productDetail(data) {
  const price = data.price?.amount
    ? `${data.price.currency} ${data.price.amount.toFixed(2)}`
    : "Price Unavailable";

  return /* html */ `
    <base-header></base-header>
    <top-message-bar></top-message-bar>

    <div class="product-list">
      <!-- Mobile detail -->
      <div class="hide-desktop py-5">
        <h5 class="text-warning font-semibold">Bestseller</h5>
        <h4 class="font-medium">${data.name}</h4>
        <p class="text-p2 font-regular">${data.gender}'s Shoes</p>
        <p class="text-p2 font-regular pb-3">${data.colors?.length || 0} colours</p>
        <h4 class="font-regular">${price}</h4>
      </div>

      <div class="product-detail-detail gap-10 pt-4">
        <!-- Image -->
        <product-card image="${data.images}"></product-card>

        <!-- Size and Info -->
        <div class="flex flex-col gap-5">
          <!-- Desktop detail -->
          <div class="show-desktop text-p0">
            <h5 class="text-warning font-semibold">Bestseller</h5>
            <h4 class="font-medium">${data.name}</h4>
            <p class="font-regular">${data.gender}'s Shoes</p>
            <p class="font-regular pb-3">${data.colors?.length || 0} colours</p>
            <h4 class="text-p3 font-medium">${price}</h4>
          </div>

          <!-- Size selection -->
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <h5 class="font-semibold">Select Size</h5>
              <a href="#">Size Guide</a>
            </div>
            <div class="product-detail-size">
              ${
                data.sizes?.length
                  ? data.sizes
                      .map(
                        size => `
                        <base-button 
                          variant="secondary" 
                          type="status" 
                          text="${size.us}" 
                          class="grow"
                        ></base-button>`
                      )
                      .join("")
                  : "<p>No sizes available</p>"
              }
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col gap-2">
            <base-button text="Add to Bag"></base-button>
            <base-button text="Favorite" variant="secondary" icon="${heart}"></base-button>
          </div>

          <!-- Description -->
          <div class="flex flex-col gap-3 text-p2 font-medium">
            <p>${data.description || ""}</p>
            <ul class="pl-7">
              ${data.features?.length ? data.features.map(f => `<li>${f}</li>`).join("") : ""}
            </ul>
          </div>

          <!-- Accordion -->
          <base-accordion 
            title="Free Delivery and Returns" 
            icon="${chevron}"
          ></base-accordion>
        </div>
      </div>

      <!-- Recommended section -->
      <div class="py-4">
        <h2 class="font-medium pb-5">You might also like</h2>
        <div class="grid-container">
          ${Array(7)
            .fill("")
            .map(
              () => `
              <product-card 
                title="Nike Sportswear Chill Knit" 
                image="${shoe}"
              ></product-card>`
            )
            .join("")}
        </div>
      </div>
    </div>

    <base-footer></base-footer>
  `;
}
