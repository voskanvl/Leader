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

if (location.pathname === "/product.html"){
    new Tabs(".tabs__button", ".tabs__item")
    const arr = [
        {big: "../../assets/images/product/1.jpg"},
        {big: "../../assets/images/product/2.jpg"},
        {big: "../../assets/images/product/3.jpg"},
        {big: "../../assets/images/product/4.jpg"},
   ]
    new Galary(".galary__big > img",".galary__thumbnail", arr)

    new Counter(".counter")
}

toggleSidePanel(".side-panel", "#burger")
