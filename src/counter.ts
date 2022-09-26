export class Counter{
    private _value:number=1;
    private incEl:HTMLElement|null = null
    private decEl:HTMLElement|null = null
    private display:HTMLElement|null = null
    private input:HTMLInputElement|null = null
    constructor(selector:string){
        const element = document.querySelector(selector)
        if(!element) return
        this.incEl = (element as HTMLElement).querySelector("#inc")
        this.decEl = (element as HTMLElement).querySelector("#dec")
        this.display = (element as HTMLElement).querySelector("#display")
        this.input = (element as HTMLElement).querySelector("input")
        this.incEl?.addEventListener("click",e=>{
            e.preventDefault()
            this.inc()
        })
        
        this.decEl?.addEventListener("click",e=>{
            e.preventDefault()
            this.dec()
        })
        
    }
    inc(){
        this.value++
    }
    dec(){
        this.value--
    }
    reset(){
        this.value=0
    }
    get value(){
        return this._value
    }
    set value(x:number){
        if(x<1) return
        this._value=x
        if(this.display) this.display.innerHTML=String(this._value)
        if(this.input) this.input.value=String(this._value)
    }

}