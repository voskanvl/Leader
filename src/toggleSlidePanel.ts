function toggleSidePanel(selector: string, triggerSelector: string) {
    const panel = document.querySelector(selector);
    const trigger = document.querySelector(triggerSelector);
    if (!panel || !trigger) return;

    const close = ({ target }: Event) => {
        if ((target as Element).closest(selector) !== panel) panel.removeAttribute("open");
    };

    trigger.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        panel.setAttribute("open", "open");
    });
    document.addEventListener("click", close);
    const closeElement = document.querySelector(".side-panel__close");
    closeElement && closeElement.addEventListener("click", () => panel.removeAttribute("open"));
}

export default toggleSidePanel;
