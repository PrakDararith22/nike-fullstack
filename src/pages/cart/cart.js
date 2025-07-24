import "@components";
import "./cart.css";

export function cartPage() {
  return /* html */ `
<div>
    <base-header></base-header>
    <top-message-bar></top-message-bar>
    <div class="cart mx-auto flex flex-col px-7  gap-12 pb-12 mb-12">
        <!-- title section -->
        <div class="border-b w-full flex flex-col items-center py-6 hide-desktop">
            <p class="font-semibold text-h3 text-center">Bag</p>
            <div class="flex font-semibold text-p1 ">
                <p class="px-2 ">0 Items</p>
                <p class="text-center">|</p>
                <p class="px-2">QAR 0.00</p>
            </div>
        </div>

        <div class="cart-grid pt-6">
            <div class="w-full flex flex-col items-start">
                <p class="font-semibold text-h3 text-center pb-3 hide-mobile hide-tablet">Bag</p>
                <promo-banner class="w-full"></promo-banner>
            </div>    
            <!-- summary section -->
            <div>
                <p class="text-h3 font-semibold">Summary</p>
                <div class="flex justify-between border-b py-5">
                    <p>Subtotal(0 items)</p>
                    <p>QAR 0.00</p>
                </div>
                <div class="flex justify-between border-b py-5">
                    <p>Total</p>
                    <p>QAR 0.00</p>
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
