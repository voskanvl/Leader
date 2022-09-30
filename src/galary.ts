export class Galary {
    big: HTMLImageElement | null;
    thumbnail: HTMLImageElement[];
    active: number;
    constructor(big: string, thumbnail: string) {
        this.big = document.querySelector(big);
        this.thumbnail = Array.from(document.querySelectorAll(thumbnail));
        console.log("🚀 ~ this.thumbnail", this.thumbnail);
        this.active = 0;
        this.thumbnail.forEach(el =>
            el.addEventListener("click", ({ target }) => {
                // const {dataset} = target as HTMLImageElement
                const big = (target as HTMLImageElement).getAttribute("big");
                if (big) this.switchImage(big);
            }),
        );
    }
    private switchImage(src: string) {
        if (this.big && this.big.src) this.big.src = src;
    }
}
