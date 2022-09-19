import './sass/style.sass'
import { MSplides } from "./initSlides"
import '@splidejs/splide/css'
import toggleSidePanel from "./toggleSlidePanel"

const splidesInstance = new MSplides()
splidesInstance.add('#chairtypes', {
    type: 'loop',
    autoplay: false,
    perMove: 1,
    direction: 'rtl',
    arrows: false,
    focus: 'center',
    pagination: false,
    autoWidth: true
})
splidesInstance.add('#blog-slider', { type: 'loop', arrows: false, pagination: false, })

const chairtypesButtons = document.querySelectorAll(".chairtypes__button")
chairtypesButtons[0].addEventListener("click", () => {
    splidesInstance.instances['#chairtypes'].go('<')
})
chairtypesButtons[1].addEventListener("click", () => {
    splidesInstance.instances['#chairtypes'].go('>')
})

const blogButtons = document.querySelectorAll(".blog__button")
const blogContents = document.querySelectorAll(".blog__content")

const removeActive = () => {
    blogContents.forEach(e => e.removeAttribute("active"))
}
const setActive = (index: number) => {
    removeActive()
    blogContents.forEach(e => {
        if (e.getAttribute("data-id") === String(index))
            e.setAttribute("active", "active")
    })
}

blogButtons[0].addEventListener("click", () => {
    splidesInstance.instances['#blog-slider'].go('>')
    setActive(splidesInstance.instances['#blog-slider'].index)
    console.log(splidesInstance.instances['#blog-slider'].index)

})
blogButtons[1].addEventListener("click", () => {
    splidesInstance.instances['#blog-slider'].go('<')
    removeActive()
    setActive(splidesInstance.instances['#blog-slider'].index)
    console.log(splidesInstance.instances['#blog-slider'].index)
})

splidesInstance.instances['#blog-slider'].on("moved",()=>setActive(splidesInstance.instances['#blog-slider'].index))

setActive(0)

toggleSidePanel(".side-panel","#trigger")