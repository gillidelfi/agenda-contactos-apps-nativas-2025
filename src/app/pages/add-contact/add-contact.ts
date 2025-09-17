import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { ContactsService } from '../../services/contacts-services';
import { NewContact } from '../../interfaces/Contacts';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../interfaces/Contacts';

@Component({
  selector: 'app-add-contact',
  imports: [FormsModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.scss'
})
export class AddContact {
  authService = inject(AuthService);
  contactsService = inject(ContactsService);

  createContact(form:any){
    const nuevoContacto: NewContact ={
      Firstname: form.firstName,
      lastname: form.lastName,
      adress: form.address,
      email: form.email,
      image: form.image,
      number: form.number,
      company: form.company,
      isFavorite: form.isFavorite
    }

    this.contactsService.createContact(nuevoContacto)
  }
}
