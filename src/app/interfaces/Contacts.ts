export interface Contact {
    id:string
    Firstname:string,
    lastname:string,
    adress:string
    email:string, 
    image:string,
    number: string,
    company:string,
    isFavorite: boolean // es opcional(?),

}
export type NewContact =  Omit<Contact, 'id'> 