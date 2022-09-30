/*
accordion
    - accordion__section
        - accordion__trigger
            - accordion__sign
        - accordion__body
    - accordion__section
    - accordion__section

shop-card__article data-id="0"
*/

export class CardStage {
    accordionSections: HTMLElement[];
    cardArticles: HTMLElement[];
    triggers: (HTMLButtonElement | null)[];
    private _stage: number = 0;
    accordionClass: string;
    sectionClass: string;
    rule: HTMLStyleElement | null = null;
    constructor(
        triggers: (HTMLButtonElement | null)[],
        accordionClass: string = ".accordion",
        sectionClass: string = ".shop-card",
    ) {
        this.accordionClass = accordionClass;
        this.sectionClass = sectionClass;
        this.accordionSections = Array.from(
            document.querySelectorAll(accordionClass + "__section"),
        ) as HTMLElement[];
        this.cardArticles = Array.from(
            document.querySelectorAll(sectionClass + "__article"),
        ) as HTMLElement[];
        this.triggers = triggers;
        this.triggers.forEach(
            trigger =>
                trigger &&
                trigger.addEventListener("click", e => {
                    e.preventDefault();
                    if (this.stage === 1) {
                        if (!this.cardArticles[1]) return;
                        const form = this.cardArticles[1].querySelector("form");
                        if (form?.checkValidity()) {
                            this.stage++;
                        } else {
                            form?.reportValidity();
                        }
                        return;
                    }
                    this.stage++;
                }),
        );
        this.setHeightAccordionSection(0);
        window.addEventListener("resize", () => {
            this.setHeightAccordionSection(0);
            this.setHeightAccordionSection(1);
        });
    }
    get stage() {
        return this._stage;
    }
    set stage(x) {
        this._stage = x;
        console.log("🚀 ~ this._stage", this._stage);
        if (x === 1) {
            if (this.triggers[0]) this.triggers[0].style.display = "none";
            if (this.accordionSections[1]) {
                this.accordionSections[1].setAttribute("done", "done");
                this.accordionSections[1].setAttribute("open", "open");
            }
            this.cardArticles[1].setAttribute("open", "open");
            const handle = () => this.setHeightAccordionSection(1);
            setTimeout(handle, 400);
        }
        if (x === 2) {
            if (this.triggers[1]) this.triggers[1].style.display = "none";
            this.cardArticles[2].setAttribute("open", "open");
        }
        if (x === 3) {
            if (this.accordionSections[2]) {
                this.accordionSections[2].setAttribute("done", "done");
            }
            this.cardArticles.forEach(e => e.removeAttribute("open"));
            this.accordionSections.forEach(e => e.removeAttribute("open"));
            const text = document.querySelector(this.sectionClass + "__text");
            const button = document.querySelector(
                this.sectionClass + "__button",
            );
            const img = document.querySelector(this.sectionClass + "__img");
            if (text) text.innerHTML = `Ваша заявка успешно отправлена!`;
            if (button) button.setAttribute("open", "open");
            if (img) img.setAttribute("open", "open");
            window.scrollTo({ top: 0 });
        }
    }
    setHeightAccordionSection(n: number) {
        const { height } = this.cardArticles[n].getBoundingClientRect();
        this.rule = document.createElement("style");
        this.rule.innerHTML = `${this.accordionClass}__section:nth-child(${
            n + 1
        })[open] ${this.accordionClass}__body{height: ${height}px !important;}`;
        if (!document.head.contains(this.rule)) document.head.append(this.rule);
        // const body = this.accordionSections[0].querySelector(this.accordionClass + "__body") as HTMLElement
        // body.style.height = height + "px"
    }
}
