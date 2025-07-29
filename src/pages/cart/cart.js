import "@components";
import "./cart.css";
import { StorageList } from "@utility";
import image from "../../assets/shoe.png";

export function cartPage() {
  const cart = new StorageList("cart");
  const cartItems = cart.getAll();
  const totalPrice = cartItems.reduce((total, item) => {
    const { amount, discount } = item.price;

    let finalPrice = amount;
    if (discount && discount.isActive) {
      if (discount.type === "percentage") {
        finalPrice = amount - amount * (discount.value / 100);
      } else {
        finalPrice = amount - discount.value;
      }
      if (finalPrice < 0) finalPrice = 0;
    }
    return total + finalPrice;
  }, 0);

  document.addEventListener("icon-button", event => {
    const action = event.detail?.action;
    if (action === "remove-cart-item") {
      const button = event.target.closest("icon-button");
      if (!button) return;
      const cartItem = button.closest("cart-item");
      if (!cartItem) return;
      const id = cartItem.getAttribute("data-id");
      if (!id) return;

      cart.remove(id);

      const app = document.getElementById("app");
      if (app) app.innerHTML = cartPage();
    }
  });

  return /* html */ `
<div class="cart-page flex flex-col">
    <base-header></base-header>
    <top-message-bar></top-message-bar>
    <div class="cart grow mx-auto flex flex-col px-7  gap-12 pb-12 mb-12">
        <!-- title section -->
        <div class="border-b w-full flex flex-col items-center py-6 hide-desktop">
            <p class="font-semibold text-h3 text-center">Bag</p>
            <div class="flex font-semibold text-p1 ">
                <p class="px-2 ">${cartItems.length} Items</p>
                <p class="text-center">|</p>
                <p class="px-2">QAR ${totalPrice.toFixed(2)}</p>
            </div>
        </div>

        <div class="cart-grid pt-6">
            <div class="w-full flex flex-col items-start">
                <p class="font-semibold text-h3 text-center pb-3 hide-mobile hide-tablet">Bag</p>
                <promo-banner class="w-full"></promo-banner>
                ${cartItems
                  .map(
                    item => /* html */ `
                    <cart-item 
                        class="w-full"
                        data-id="${item.id}"
                        title="${item.name}"
                        price="${item.price.amount}"
                        discount-percentage="${item?.price?.discount?.isActive ? item.price.discount.value : ""}"
                        image="${item.image || image}"
                        feature='${JSON.stringify(item.features.split(",").map(f => f.trim()))}'
                    ></cart-item>`
                  )
                  .join("")}
            </div>    
            <!-- summary section -->
            <div>
                <p class="text-h3 font-semibold">Summary</p>
                <div class="flex justify-between border-b py-5">
                    <p>Subtotal(${cartItems.length})</p>
                    <p>QAR ${totalPrice}</p>
                </div>
                <div class="flex justify-between border-b py-5">
                    <p>Total</p>
                    <p>QAR ${totalPrice}</p>
                </div>
                <base-button text="checkout" size="large" class="hide-mobile hide-tablet pt-4"></base-button>
            </div>

            <!-- favorite section -->
            <div class="pb-12">
                <p class="text-h3 font-semibold ">Favorites</p>
                <div class="flex gap-1 text-p2 font-semibold">
                    <p>Become a Nike Member to get fast and free delivery.</p>
                    <a>Join us</a> or <a>Sign In</a> 
                </div>
            </div>
        </div>
      

    </div>
    <base-footer class="justify-self-end"></base-footer>

    <!-- fixed checkout button -->
    <div class="fixed bg-white bottom-0 w-full px-3 py-6 border border-medium hide-desktop">
        <base-button text="checkout" size="large"></base-button>
    </div>
</div>
  `;
}
