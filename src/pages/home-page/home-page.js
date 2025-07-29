import "@components";
import "./home-page.css";
import { shuffleObjectValues } from "@utility";
import { banner, banner2, banner3, banner4, banner5 } from "../../assets/banner";

export function homePage(product) {
  const showcaseCards = [
    {
      to: "women",
      image: banner,
      title: "Nike National Team Collections",
      description: "Fear Nothing",
      layout: "bottomleft",
      cta: "shop",
    },
    {
      to: "man",
      image: banner2,
      title: "Total 90",
      description: "Look of Football",
      layout: "bottomleft",
      cta: "shop",
    },
    {
      to: "kids",
      image: banner4,
      title: "Turn Offseason On",
      description: "Summer Ready",
      layout: "bottomleft",
      cta: "shop",
    },
    {
      to: "jordan",
      image: banner3,
      title: "Structure 26",
      description: "Just In",
      layout: "bottomleft",
      cta: "shop",
    },
  ];
  return /* html */ `
    <div>
        <div>
          <base-header></base-header>
          <top-message-bar linktext="Join us!"></top-message-bar>
        </div>
            <a href="new-and-featured">
            <showcase-card
                image="${banner2}"
                title="HOME AGAIN"
                description="Celebrate the Lionesses' histroric second win."
                layout="bottomleft"
                cta="shop"
                type2= "lifestyle"
            ></showcase-card>
          </a>
          <div class="home-page py-2">
              <div class="home-page-product-grid">
                  ${showcaseCards
                    .map(
                      item => `
                            <a href="${item.to}">
                                <showcase-card
                                    image="${item.image}"
                                    title="${item.title}"
                                    description="${item.description}"
                                    layout="${item.layout}"
                                    cta="${item.cta}"
                                    ${item.type2 ? `type2="${item.type2}"` : ""}
                                    ${item.color ? `color="${item.color}"` : ""}
                                ></showcase-card>
                            </a>`
                    )
                    .join("")}
              </div>

                <a href="jordan">
                  <showcase-card
                      image="${banner5}"
                      title="Athlete Picks"
                      description="Kylian Mbappe"
                      layout="bottomleft"
                      cta="shop"
                      type2= "lifestyle"
                      color="black"
                  ></showcase-card>
                </a>

                <!-- product show case -->
                <div class=" home-page-icon-container whitespace-nowrap ">
                  <h2 class="font-medium "> Shop Our Icons </h2>
                    <div class="py-5 overflow-x-auto scrollbar-hidden">
                       ${shuffleObjectValues(product)
                         .map(
                           item => `
                           <a href="${item.gender}/${item.id}">
                                <showcase-card
                                class="home-page-product-grid-card inline-block mr-2"
                                image="${item.images}"
                                layout="bottomcenter"
                                cta="shop"
                                type2="lifestyle"
                                ></showcase-card>
                            <a>`
                         )
                         .join("")}
                    </div>
                </div>

          </div>   

        </div>

        <base-footer></base-footer>

    </div>
  `;
}
