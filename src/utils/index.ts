export const debounce = (func:Function, timeout = 300) =>{
    let timer: NodeJS.Timeout ;
    return (...args:any)=>{
        
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            func(...args);
        },timeout)
    }
}
