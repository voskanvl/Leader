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
    galaryControls[0].addEventListener("click", () =>
        splidesInstance.instances["#galary"].go("<"),
    );
galaryControls.length === 2 &&
    galaryControls[1].addEventListener("click", () =>
        splidesInstance.instances["#galary"].go(">"),
    );

new Tabs(".tabs__button", ".tabs__item");
new Galary(".galary__big > img", ".galary__slider > .splide img");

new Counter(".counter");

toggleSidePanel(".side-panel", "#burger");

if (document.querySelector(".shop-card"))
    new CardStage(
        [0, 1, 2].map(e =>
            document.querySelector(
                `.shop-card__article[data-id='${e}'] > button.button `,
            ),
        ),
    );
