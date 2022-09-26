import { Counter } from './counter'
import "./sass/style.sass"
import { MSplides } from "./initSlides"
import "@splidejs/splide/css"
import toggleSidePanel from "./toggleSlidePanel"
import { Tabs } from "./tabs"
import { Galary } from './galary'

const splidesInstance = new MSplides()
const tiserEl = document.querySelector("#tiser")
const cardListEl = document.querySelector("#card-list")
tiserEl && splidesInstance.add("#tiser", {
    type: "loop",
    arrows: false,
    pagination: false,
    perPage: 1,
})
cardListEl && splidesInstance.add("#card-list", {
    type: "loop",
    arrows: false,
    pagination: false,
    autoWidth: true,
})

const tiserControls = document.querySelector(".tiser__controls")?.children
tiserControls?.length &&
    tiserControls[0].addEventListener("click", () => {
        splidesInstance.instances["#tiser"].go("<")
    })
tiserControls?.length &&
    tiserControls[1].addEventListener("click", () => {
        splidesInstance.instances["#tiser"].go(">")
    })

const cardListControls = document.querySelectorAll(".card-list > .arrow")
cardListControls.length === 2 &&
    cardListControls[0].addEventListener("click", () =>
        splidesInstance.instances["#card-list"].go("<"),
    )
cardListControls.length === 2 &&
    cardListControls[1].addEventListener("click", () =>
        splidesInstance.instances["#card-list"].go(">"),
    )

new Tabs(".tabs__button", ".tabs__item")
new Galary(".galary__big > img", ".galary__thumbnail")

new Counter(".counter")

toggleSidePanel(".side-panel", "#burger")

const shopCardData = document.querySelector(".shop-card__article[data-id='0']")
if (shopCardData) {
    const { height } = shopCardData.getBoundingClientRect()
    console.log("🚀 ~ height", height)
    const rule = document.createElement("style")
    rule.innerHTML = `section.accordion__section:nth-child(1) > div[class='accordion__body']{height: ${height}px !important;}`
    document.head.append(rule)

    const button = document.querySelector(".shop-card__data > button.button, .shop-card__article[data-id='0'] > button.button")
    const sign = document.querySelector(".accordion__section:nth-child(2) > .accordion__trigger > .accordion__sign")
    const article1 = document.querySelector(".shop-card__article[data-id='1']")
    if (button) {
        button.addEventListener("click", () => {
            if (sign && article1) {
                (sign as HTMLElement).style.background = "#FFCC00";
                (article1 as HTMLElement).style.display = "flex"

            }

        })
    }
}
