import { Counter } from "./counter";
import "./sass/style.sass";
import { MSplides } from "./initSlides";
import "@splidejs/splide/css";
import toggleSidePanel from "./toggleSlidePanel";
import { Tabs } from "./tabs";
import { Galary } from "./galary";

const splidesInstance = new MSplides();
const tiserEl = document.querySelector("#tiser");
const cardListEl = document.querySelector("#card-list");
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

new Tabs(".tabs__button", ".tabs__item");
new Galary(".galary__big > img", ".galary__thumbnail");

new Counter(".counter");

toggleSidePanel(".side-panel", "#burger");

function generateRule(el?: HTMLElement, n: number = 1) {
    if (el) {
        const { height } = el.getBoundingClientRect();
        const rule = document.createElement("style");
        rule.innerHTML = `.accordion__section:not(:last-child) > input:checked ~ .accordion__body{height: ${height}px !important;}`;
        document.head.append(rule);
    }
}

const shopCardData = document.querySelector(
    ".shop-card__article[data-id='0']",
) as HTMLElement;
generateRule(shopCardData, 1);

const button = document.querySelector(
    ".shop-card__article[data-id='0'] > button.button",
);
const sign = document.querySelector(
    ".accordion__section:nth-child(2) > .accordion__trigger > .accordion__sign",
);
const article1 = document.querySelector(".shop-card__article[data-id='1']");
if (button) {
    button.addEventListener("click", () => {
        if (sign && article1) {
            (sign as HTMLElement).style.background = "#FFCC00";
            (article1 as HTMLElement).style.display = "flex";
            (button as HTMLButtonElement).style.display = "none";
            const button2 = document.querySelector(
                ".shop-card__article[data-id='1']  button.button",
            );
            console.log("🚀 ~ button2", button2);
            const form = document.querySelector(
                "form.contact-form",
            ) as HTMLFormElement;
            if (button2 && form.checkValidity()) {
                const shopCardData1 = document.querySelector(
                    ".shop-card__article[data-id='1']",
                ) as HTMLElement;
                button2.addEventListener("click", e => {
                    e.preventDefault();
                    generateRule(shopCardData1, 2);
                });
            }
        }
    });
}
