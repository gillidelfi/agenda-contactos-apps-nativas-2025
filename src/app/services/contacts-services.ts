
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { Contact, NewContact } from '../interfaces/Contacts';

@Injectable({
  providedIn: 'root'
})

export class ContactsService {
  aleatorio = Math.random();
  authService = inject(AuthService);

  contacts: Contact[] = []

  /** Obtiene los contactos del backend */
  async getContacts() {
    const res = await fetch("https://agenda-api.somee.com/api/contacts",
      {
        headers:{
          Authorization: "Bearer "+this.authService.token,
        }
      }
    )
    const resJson: Contact[] = await res.json()
    this.contacts = resJson;
  }

  /** Devuelve un contato en particular segun su ID */
  async getContactById(id: string | number) {
    const res = await fetch('https://agenda-api.somee.com/api/Contacts/'+ "/" + id,
      {
        headers:{
          Authorization: "Bearer "+this.authService.token,
        },
      });
    
    if (!res.ok) return;
    const resContact: Contact = await res.json();
    return resContact;

  }

  /** Crea un contacto */
  async createContact(nuevoContacto:NewContact) {
      const res = await fetch("https://agenda-api.somee.com/api/Contacts",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer "+this.authService.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoContacto)
          });

      if (!res.ok) return;
      const resContact:Contact = await res.json();
      this.contacts.push(resContact);
      return resContact;
    }
  
      /** Edita un contacto */
  async editContact(contactoEditado: Contact) { 
    const res = await fetch ("https://agenda-api.somee.com/api/Contacts/"+ "/" + contactoEditado.id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token,
      },
      body: JSON.stringify(contactoEditado)
      });
      if (!res.ok) return;

      /**edita la lista reemplazando solamente el que editamos  */
      this.contacts = this.contacts.map(contact => {
        if (contact.id === contactoEditado.id) {
          return contactoEditado;
        };
        return contact;
      });
      return contactoEditado;
    }

  /** Borra un contacto */
  async deleteContact(id:string | number) {
    const res = await fetch('https://agenda-api.somee.com/api/Contacts/'+ "/" + id,
      {
        method: "DELETE",
        headers:{
          Authorization: "Bearer "+this.authService.token,
        },
      });
    if (!res.ok) return;
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    return true;
  }
   
  /** Marca/desmarca un contacto como favorito */
  async setFavourite(id: string | number) { 
    const res = await fetch('https://agenda-api.somee.com/api/Contacts/'+ "/" + id + "favorite",
      {
        method: "POST",
        headers:{
          Authorization: "Bearer "+this.authService.token,
        },
      });
    if (!res.ok) return;
/**edita la lista reemplazando solamente el que editamos  */
this.contacts = this.contacts.map(contact =>{
  if (contact.id === id) {
    return {...contact, isFavorite: !contact.isFavorite};
  };
  return contact;
});
return true;
 }
} 

