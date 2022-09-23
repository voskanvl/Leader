export class Galary{
    big: HTMLImageElement | null
    thumbnail: HTMLImageElement[]
    active: number
    arr:{big:string,small?:string}[]
    constructor(big:string,thumbnail:string, arr:{big:string,small?:string}[]){
        this.big = document.querySelector(big)
        this.thumbnail = Array.from(document.querySelectorAll(thumbnail))
        this.active=0
        this.arr=arr
        this.thumbnail.forEach(el=>el.addEventListener("click",({target})=>{
            const {dataset} = target as HTMLImageElement
            if(dataset && dataset.id) this.switchImage(+dataset.id)
        }))
    }
    private switchImage(idx:number){
        if(this.big && this.big.src) this.big.src = this.arr[idx].big 
    }
}