(()=>{
    const per={
        name:'he55',
        age:18,
        *[Symbol.iterator](){
            for(const key in this){
                yield [key, this[key]]
            }
        }
    }
    console.log(per)
    console.log([...per])
    console.log()
})()
