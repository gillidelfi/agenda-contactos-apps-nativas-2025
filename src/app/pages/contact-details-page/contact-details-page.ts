import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Contact } from '../../interfaces/Contacts';
import { ContactsService } from '../../services/contacts-services';
@Component({
  selector: 'app-contact-details-page',
  imports: [RouterModule],
  templateUrl: './contact-details-page.html',
  styleUrls: ['./contact-details-page.scss']
})
export class ContactDetailsPage {
  contactsService = inject (ContactsService)

  id = input<number>();   
  contact: Contact | undefined = undefined;

  async ngOnInit(){
    console.log()
    this.contact = await this.contactsService.getContactById(this.id()!)
  }
}