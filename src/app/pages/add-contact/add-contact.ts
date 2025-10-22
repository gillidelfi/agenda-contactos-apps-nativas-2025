import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { ContactsService } from '../../services/contacts-services';
import { NewContact } from '../../interfaces/Contacts';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../../interfaces/Contacts';
import { Router } from '@angular/router';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-add-contact',
  imports: [FormsModule, Spinner],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.scss'
})
export class AddContact implements OnInit{
//createContact(arg0: any) {
//throw new Error('Method not implemented.');
//}
  contactsService = inject(ContactsService);
  idContacto = input<number>();
  contactoOriginal: Contact | undefined = undefined;
  errorEnBack = false;
  router= inject(Router);
  form = viewChild<NgForm>('newContactForm');
  isLoading = false;
  
  async ngOnInit() {
    if(this.idContacto()){
      this.contactoOriginal = await this.contactsService.getContactById(this.idContacto()!);
      // Cambio los valores del formulario
      this.form()?.setValue({
        firstName: this.contactoOriginal!.firstName,
        lastName: this.contactoOriginal!.lastName,
        address: this.contactoOriginal!.address,
        email: this.contactoOriginal!.email,
        image: this.contactoOriginal!.image,
        number: this.contactoOriginal!.number,
        company: this.contactoOriginal!.company,
        isFavorite: this.contactoOriginal!.isFavorite
      })
    }
  }

   /** Revisa si estamos editando o creando un contacto y ejecuta la función correspondiente del servicio de contactos */
   async handleFormSubmission(form:NgForm){

    this.errorEnBack = false;
    const nuevoContacto: NewContact ={
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number, 
      company: form.value.company,
      isFavorite: form.value.isFavorite
    }
    console.log(nuevoContacto);
    let res;
    // const res = await this.contactsService.createContact(nuevoContacto);
    this.isLoading = true;
    if(this.idContacto()){
      res = await this.contactsService.editContact({...nuevoContacto, id: this.idContacto()!.toString()})
    } else {
      res = await this.contactsService.createContact(nuevoContacto);
    }
    console.log(res);
    this.isLoading = false;
    if(!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/contacts", res.id]);
  }

}
