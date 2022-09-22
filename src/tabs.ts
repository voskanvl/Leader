export class Tabs {
    buttons: HTMLElement[]
    contents: HTMLElement[]
    activeIndex: number
    constructor(buttons: string, contents: string) {
        this.buttons = Array.from(document.querySelectorAll(buttons))
        this.contents = Array.from(document.querySelectorAll(contents))
        this.activeIndex = 0
        this.buttons.forEach(el => el.addEventListener("click", event => {
            event.preventDefault()
            const { id } = el.dataset
            this.changeActive(Number(id))
        }))
    }
    private changeActive(newActive: number) {
        const activeButton = this.buttons.find(el => el.getAttribute("active"))
        const activeContent = this.contents.find(el => el.dataset.id === activeButton?.dataset.id)
        const buttonCandidat = this.buttons.find(el => Number(el.dataset.id) === newActive)
        const contentCandidat = this.contents.find(el => el.dataset.id === buttonCandidat?.dataset.id)

        activeButton?.removeAttribute("active")
        activeContent?.removeAttribute("active")

        buttonCandidat?.setAttribute("active", "active")
        contentCandidat?.setAttribute("active", "active")

    }
}