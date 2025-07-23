import "@components";
import "./home-page.css";

export function homePage() {
  return /* html */ `
    <div class="page home-page flex flex-col gap-2">
       
        <base-header></base-header>
        <top-message-bar linktext="Join us!"></top-message-bar>

        <!-- hero section -->
        <showcase-card
            image="src/assets/banner.png"
            title="sfs"
            description="sdsdf"
            layout="bottomcenter"
            cta="shop"
        ></showcase-card>

        <!-- product grid -->
        <div class="product-grid">
            <showcase-card
            image="src/assets/banner.png"
            title="sfs"
            description="sdsdf"
            layout="bottomcenter"
            cta="shop"
            ></showcase-card>
            <showcase-card
            image="src/assets/banner.png"
            title="sfs"
            description="sdsdf"
            layout="bottomcenter"
            cta="shop"
            ></showcase-card>
            <showcase-card
            image="src/assets/banner.png"
            title="sfs"
            description="sdsdf"
            layout="bottomcenter"
            cta="shop"
            ></showcase-card>
            <showcase-card
            image="src/assets/banner.png"
            title="sfs"
            description="sdsdf"
            layout="bottomcenter"
            cta="shop"
            ></showcase-card>
        </div>
        <!-- spotlight section -->
        <showcase-card
            image="src/assets/banner.png"
            title="sfs"
            description="sdsdf"
            layout="bottomcenter"
            cta="shop"
        ></showcase-card>

        <!-- product show case -->
        <div 
        class="product-show-case  whitespace-nowrap  pt-8 pl-5 ">
        <h2 class="font-medium "> Shop Our Icons </h2>
            <div class="pt-5 overflow-x-auto scrollbar-hidden">
                <showcase-card 
                class="product-grid-card inline-block mr-2"
                image="src/assets/banner.png" 
                layout="bottomcenter" 
                cta="shop"
                ></showcase-card>
                <showcase-card 
                class=" product-grid-card inline-block mr-2"
                image="src/assets/banner.png" 
                layout="bottomcenter" 
                cta="shop"
                ></showcase-card>
            </div>
        </div>

        <base-footer></base-footer>

    </div>
  `;
}
