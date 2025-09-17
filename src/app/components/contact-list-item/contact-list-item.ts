import { Component, inject, input } from '@angular/core';
import { Contact } from './../../interfaces/Contacts';
import { ContactsService } from '../../services/contacts-services';

@Component({
  selector: 'app-contact-list-item',
  imports: [],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  contacto = input.required<Contact>()
  aleatorio = Math.random()
  contactsService = inject(ContactsService)

}
