import "@components";
import { heart, chevron } from "@assets";
import "./product-detail.css";
import { StorageList } from "@utility";
import shoe from "../../assets/shoe.png";

export function productDetail(data) {
  const cart = new StorageList("cart");
  let selectedSize = null;

  document.addEventListener("base-button", event => {
    const action = event.detail?.action;
    if (action === "select-size") {
      document.querySelectorAll(".product-detail-size base-button").forEach(btn => {
        btn.classList.remove("border", "border-black", "rounded");
      });
      event.target.classList.add("border", "border-black", "rounded");
      document.querySelector(".text-error").classList.add("hidden");
      document.querySelector(".product-detail-size").classList.remove("border", "border-warning");
      selectedSize = event.target.getAttribute("text") || event.target.dataset.size;
    }
    if (action === "add-cart") {
      const button = event.target.closest("base-button");
      if (selectedSize === null) {
        document.querySelector(".product-detail-size").classList.add("border", "border-warning");
        document.querySelector(".text-error").classList.remove("hidden");
        return;
      }
      if (!button) return;

      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        brand: button.dataset.brand,
        category: button.dataset.category,
        gender: button.dataset.gender,
        image: button.dataset.image,
        size: selectedSize,
        features: button.dataset.features,
        description: button.dataset.description,
        price: {
          currency: button.dataset.currency,
          amount: parseFloat(button.dataset.amount),
        },
      };
      cart.add(product);
    }
  });

  const price = data.price?.amount
    ? `${data.price.currency} ${data.price.amount.toFixed(2)}`
    : "Price Unavailable";

  return /* html */ `
    <base-header></base-header>
    <top-message-bar></top-message-bar>

    <div class="product-list">
      <!-- Detail Section -->
      <div class="product-detail-detail gap-10 pt-4">
        <product-card image="${data.images}"></product-card>

        <div class="flex flex-col gap-5">
          <!-- Product Info -->
          <div class="show-desktop text-p0">
            <h5 class="text-warning font-semibold">Bestseller</h5>
            <h4 class="font-medium">${data.name}</h4>
            <p class="font-regular">${data.gender}'s Shoes</p>
            <p class="font-regular pb-3">${data.colors?.length || 0} colours</p>
            <h4 class="text-p3 font-medium">${price}</h4>
          </div>

          <!-- Size Selection -->
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <h5 class="font-semibold">Select Size</h5>
              <a href="#">Size Guide</a>
            </div>
              <div>
                <div class="product-detail-size rounded">
                  ${
                    data.sizes
                      ? Object.keys(data.sizes)
                          .map(
                            size => `
                            <base-button 
                              variant="secondary" 
                              type="status" 
                              text="${size}" 
                              class="grow"
                              action="select-size"
                            ></base-button>`
                          )
                          .join("")
                      : "<p>No sizes available</p>"
                  }
                </div>
               <p class='hidden text-error text-p2 pt-2'>Please select a size.</p>
             </div>
          </div>

          <!-- action Button  -->
          <div class="flex flex-col gap-2">
              <base-button 
              text="Add to Bag" 
              action="add-cart"
              data-id="${data.id}"
              data-name="${data.name}"
              data-brand="${data.brand}"
              data-category="${data.category}"
              data-gender="${data.gender}"
              data-image="${data.images}"
              data-currency="${data.price?.currency || ""}"
              data-amount="${data.price?.amount || 0}"
              data-features="${data.features}"
              data-description="${data.description}"
            ></base-button>
            <base-button 
              text="Favorite" 
              variant="secondary" 
              icon="${heart}" 
              data-id="${data.id}"
              data-name="${data.name}"
              data-brand="${data.brand}"
              data-category="${data.category}"
              data-gender="${data.gender}"
              data-image="${data.images}"
              data-currency="${data.price?.currency || ""}"
              data-amount="${data.price?.amount || 0}"
              data-features="${data.features}"
              data-description="${data.description}"
            ></base-button>
          </div>

          <!-- Description -->
          <div class="flex flex-col gap-3 text-p2 font-medium">
            <p>${data.description || ""}</p>
            <ul class="pl-7">
              ${data.features?.map(f => `<li>${f}</li>`).join("") || ""}
            </ul>
          </div>

          <base-accordion 
            title="Free Delivery and Returns" 
            icon="${chevron}"
          ></base-accordion>
        </div>
      </div>

      <!-- Recommendations -->
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
