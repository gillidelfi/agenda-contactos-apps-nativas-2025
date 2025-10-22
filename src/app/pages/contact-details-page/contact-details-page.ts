import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Contact } from '../../interfaces/Contacts';
import { ContactsService } from '../../services/contacts-services';
@Component({
  selector: 'app-contact-details-page',
  imports: [RouterModule],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss'
})
export class ContactDetailsPage {
  contactsService = inject (ContactsService)

  id = input<number>(); // Ensure input is typed correctly

  contact: Contact | undefined = undefined;
contacto: any;

  async ngOnInit(){
    console.log()
    this.contact = await this.contactsService.getContactById(Number(this.id()))
  }
}