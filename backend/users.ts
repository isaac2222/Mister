export class User {

    constructor(public email: string,
                public name: string, 
                private password : string){}

                matches(another: User): boolean {
                    return another !== undefined && 
                           another.email === this.email && 
                           another.password === this.password
                }
}

export const users: {[key: string]: User} = {
    "isaac@gmail.com": new User('isaac@gmail.com', 'Isaac Philippe', '212340'),
    "juliana@gmail.com": new User('juliana@gmail.com', 'Juliana', 'juliana23') 
}