function toggleSidePanel(selector:string, triggerSelector: string){
    const panel = document.querySelector(selector)
    const trigger = document.querySelector(triggerSelector)
    if(!panel || !trigger) return
    trigger.addEventListener("click",(e)=>{
        e.preventDefault()
        e.stopPropagation()
        panel.setAttribute('open','open')
    })
    document.addEventListener("click",({target})=>{
        if((target as Element).closest(selector) !== panel) panel.removeAttribute("open")
    })
}

export default toggleSidePanel