import { Counter } from "./counter";
import "./sass/style.sass";
import { MSplides } from "./initSlides";
import "@splidejs/splide/css";
import toggleSidePanel from "./toggleSlidePanel";
import { Tabs } from "./tabs";
import { Galary } from "./galary";
import { CardStage } from "./cardStage";

const splidesInstance = new MSplides();
const tiserEl = document.querySelector("#tiser");
const cardListEl = document.querySelector("#card-list");
const galaryEl = document.querySelector("#galary");
tiserEl &&
    splidesInstance.add("#tiser", {
        type: "loop",
        arrows: false,
        pagination: false,
        perPage: 1,
    });
cardListEl &&
    splidesInstance.add("#card-list", {
        type: "loop",
        arrows: false,
        pagination: false,
        autoWidth: true,
    });
galaryEl &&
    splidesInstance.add("#galary", {
        type: "loop",
        arrows: false,
        pagination: false,
        perPage: 4,
        perMove: 1,
        direction: "ttb",
    });

const tiserControls = document.querySelector(".tiser__controls")?.children;
tiserControls?.length &&
    tiserControls[0].addEventListener("click", () => {
        splidesInstance.instances["#tiser"].go("<");
    });
tiserControls?.length &&
    tiserControls[1].addEventListener("click", () => {
        splidesInstance.instances["#tiser"].go(">");
    });

const cardListControls = document.querySelectorAll(".card-list > .arrow");
cardListControls.length === 2 &&
    cardListControls[0].addEventListener("click", () =>
        splidesInstance.instances["#card-list"].go("<"),
    );
cardListControls.length === 2 &&
    cardListControls[1].addEventListener("click", () =>
        splidesInstance.instances["#card-list"].go(">"),
    );

const galaryControls = document.querySelectorAll(".galary__slider > .arrow");
galaryControls.length === 2 &&
    galaryControls[0].addEventListener("click", () => splidesInstance.instances["#galary"].go("<"));
galaryControls.length === 2 &&
    galaryControls[1].addEventListener("click", () => splidesInstance.instances["#galary"].go(">"));

new Tabs(".tabs__button", ".tabs__item");
new Galary(".galary__big > img", ".galary__slider > .splide img");

new Counter(".counter");

toggleSidePanel(".side-panel", "#burger");

new CardStage(document.querySelector("#trigger"));

/* TABS */
let activeTab = "0";
const tabs = document.querySelector(".materials__grid.tabs");
const figures = document.querySelectorAll(".materials__figure");
tabs &&
    tabs.addEventListener("click", ({ target }: Event) => {
        activeTab = (target as HTMLElement).dataset.id || "0";
        console.log(activeTab);
        // for(let i = 0; i < tabs.children.length, i)
        Array.from(tabs.children).forEach((e: Element) => {
            if ((e as HTMLElement).dataset.id === activeTab) {
                (e as HTMLElement).setAttribute("open", "open");
            } else {
                (e as HTMLElement).setAttribute("open", "close");
            }
        });
        figures.forEach((e: Element) => {
            const { dataset } = e as HTMLElement;
            if (dataset.id === activeTab) {
                (e as HTMLElement).setAttribute("open", "open");
            } else {
                (e as HTMLElement).setAttribute("open", "close");
            }
        });
    });

/* #buttons */
const simplecheckoutButtonConfirm = document.querySelector("#simplecheckout_button_confirm");
simplecheckoutButtonConfirm &&
    simplecheckoutButtonConfirm.addEventListener("click", () => {
        const trigger = document.querySelector("#trigger");
        trigger && trigger instanceof HTMLButtonElement && trigger.click();
    });
/* price */
const form = document.querySelector<HTMLFormElement>("form.price__form");
const priceSubmit = document.querySelector("form.price__form button.button");
if (form && priceSubmit) {
    priceSubmit.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        const resp = await fetch("/mail.php", {
            method: "POST",
            body: new FormData(form),
        });
        if (resp.ok) {
            Array.from(form.elements).forEach(e => ((e as HTMLInputElement).value = ""));
        }
    });
}
