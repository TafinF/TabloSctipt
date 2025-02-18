class Timer {
    duration_min
    end
    #tim_id
    #old_time
    #flag_pause
    #flag_work
    #ost_milsec
    out_elem
    constructor(duration_min, out_elem = null) {
        this.duration_min = duration_min;
        this.#old_time = 0 
        this.#flag_pause = false
        this.#flag_work = false 
        this.out_elem = out_elem
    }
    start(){
        if (this.#flag_work){
            return
        }
        if (this.#flag_pause) {
            let end = Date.now() + this.#ost_milsec
            this.end = new Date(end);
            this.#flag_pause = false
        } else {
            let end = Date.now() + this.duration_min * 60 * 1000
            this.end = new Date(end);         
        }
        this.#tim_id = setInterval(this.#tick.bind(this),200)
        this.#flag_work = true 
    }
    #tick(){
        let ost = this.end - Date.now()
        if (ost<0) {
            clearTimeout(this.#tim_id);
            console.log(`Время вышло!`);
            this.#flag_work = false 
            return
        }
        let ost_sec = parseInt(ost/1000)
        if (this.#old_time != ost_sec) {
            this.#old_time = ost_sec
            let out = new Date(ost);
            let out_str = this.#time_to_str(out)
            if (this.out_elem != null) {
                this.out_elem.innerHTML = out_str;
            }
            console.log(`Осталось: ${out_str}`);          
        }
    }
    #time_to_str(time){
        let min = '00'+time.getMinutes()
        let sec = '00'+time.getSeconds()
        return `${min.slice(-2)}:${sec.slice(-2)}`
    }
    pause(){
        if (this.#flag_pause){
            return
        }
        clearTimeout(this.#tim_id);
        this.#ost_milsec = this.end - Date.now()
        this.#flag_pause = true
        this.#flag_work = false 
    }
}
