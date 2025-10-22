import { Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ContactsService } from '../../services/contacts-services';
import { Contact } from '../../interfaces/Contacts';
@Component({
  selector: 'app-contact-details-page',
  imports: [RouterModule],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss'
})
export class ContactDetailsPage implements OnInit{
  contactsService = inject(ContactsService)

  idContacto = input.required<number>();

  contact: Contact | undefined = undefined;

  router = inject(Router);

  async ngOnInit(){
    this.contact = await this.contactsService.getContactById(this.idContacto()) as Contact;
  }
  async toggleFavorite(){
    if(this.contact){
      const res= await this.contactsService.setFavourite(this.contact.id);
      if(res) this.contact.isFavorite = !this.contact.isFavorite;
    }
  }
  
  async deleteContact(id: string | number){
    const ok = await this.contactsService.deleteContact(id);
    if(ok){
      this.router.navigate(['/contacts']);
    }
  }
}
