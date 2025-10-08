import { Component, inject, input } from '@angular/core';
import { Contact } from './../../interfaces/Contacts';
import { ContactsService } from '../../services/contacts-services';
import { RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact-list-item',
  imports: [RouterModule, RouterLink],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  contacto = input.required<Contact>();
  aleatorio = Math.random();
  contactsService = inject(ContactsService);
  
  openLogoutModal () {
      Swal.fire({
        title: "Desea cerrar sesión?",
        showDenyButton: true,
        showCancelButton: true,
        showCloseButton: false,
        cancelButtonText: "Cancelar",
        denyButtonText: `eliminar definitivamebte`
      }).then((result) => {
        if (result.isDenied) { //reviso que haya clickeado en boton rojo: cerra sesion
          this.contactsService.deleteContact(this.contacto().id);
        }
      });
    }
  }


