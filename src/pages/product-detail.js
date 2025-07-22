import "@components";

export function productDetail() {
  return /* html */ `
    <div class="page home-page">
       
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
        <div class="product-show-case flex overflow-x-auto">
            <showcase-card 
            image="src/assets/banner.png" 
            layout="bottomcenter" cta="shop"
            ></showcase-card>
            <showcase-card 
            image="src/assets/banner.png" 
            layout="bottomcenter" 
            cta="shop"
            ></showcase-card>
        </div>

        <base-footer></base-footer>

    </div>
  `;
}
