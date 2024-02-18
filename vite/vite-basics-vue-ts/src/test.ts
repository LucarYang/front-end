import { Person } from "./types"

declare const enum Age{
    
    age1=18,
    age2=19
    
}
let person:Person={
    name:'felix',
    age:Age.age1
}

export {
    person
}
export type { Person }
