import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserDTO } from 'src/app/DTOs/user.dto';
import { UserService } from 'src/app/servicii/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class UserManagementComponent implements OnInit {

  listaUseri: UserDTO[] = [];
  incarcat: boolean = false;
  showDialogEditare: boolean = false;
  nume: any;
  prenume: any;
  username: any;
  email: any;
  selectedUser: any;
  optiuniRoluri = [
    {name: 'EDITOR', code: 'EDITOR'},
    {name: 'ADMIN', code: 'ADMIN'}
  ];
  selectedRoluri: any[] = [];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUseri().subscribe(data => {
      data.forEach(returnedUser => {
        let userDTO = {} as UserDTO;
        userDTO.id = returnedUser.id;
        userDTO.email = returnedUser.email;
        userDTO.nume = returnedUser.nume;
        userDTO.prenume = returnedUser.prenume;
        userDTO.username = returnedUser.username;
        userDTO.roluri = [];
        returnedUser.roluri.forEach((rol: any) => {
          userDTO.roluri.push(rol.nume);
        });
        this.listaUseri.push(userDTO);
      });
      this.incarcat = true;
    }, errror => {
      this.messageService.add({ severity: 'error', summary: 'Eroare', detail: 'Lista de useri nu a putut fi recuperata.' });
    });
  }

  deleteUser(user: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(data => {
          this.listaUseri = [];
          this.getAllUsers();
          this.messageService.add({ severity: 'succes', summary: '', detail: "User-ul a fost sters cu succes." });
        }, error => {
          this.messageService.add({ severity: 'error', summary: '', detail: "Eroare la stergerea user-ului." });
        });
      },
      reject: () => { }
    });
  }

  editeazaUser(user: any) {
    this.selectedUser = user;
    this.nume = this.selectedUser.nume;
    this.prenume = this.selectedUser.prenume;
    this.email = this.selectedUser.email;
    this.username = this.selectedUser.username;
    this.selectedUser.roluri.forEach((rol: any) => {
      this.selectedRoluri.push(
        {name: rol, code: rol}
      );
    });
    this.showDialogEditare = true;
  }

  salveaza() {
    let userDTO = {} as UserDTO;
    userDTO.email = this.email;
    userDTO.nume = this.nume;
    userDTO.prenume = this.prenume;
    userDTO.username = this.username;
    userDTO.roluri = [];
    this.selectedRoluri.forEach(sr => {
      userDTO.roluri.push(sr.code);
    });
    this.userService.editeazaUser(this.selectedUser.id, userDTO).subscribe(data => {
      this.showDialogEditare = false;
      this.listaUseri = [];
      this.getAllUsers();
    }, errror => {
      this.messageService.add({severity: 'error', summary: 'Eroare', detail: 'Eroare la editarea user-ului.'});
    });    
  }
}
