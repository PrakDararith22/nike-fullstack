import "@components";

export function productList() {
  return /* html */ `
     <base-header></base-header>
    <top-message-bar></top-message-bar>
    <h2 class="font-medium pl-4 pb-7 border-b">EC25</h2>
    <div class="flex py-2">
      <product-card
        status="Bestseller"
        title="Air Jordan 1 High OG 'Shattered Backboard'"
        category="Men's Shoes"
        price="QAR 629.00"
      ></product-card>
      <product-card
        status="Bestseller"
        title="Air Jordan 1 High OG 'Shattered Backboard'"
        category="Men's Shoes"
        price="QAR 629.00"
      ></product-card>
    </div>

    <base-footer></base-footer>
  `;
}
