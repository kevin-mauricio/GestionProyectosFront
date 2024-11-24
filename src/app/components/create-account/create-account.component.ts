import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CompaniaService } from '@app/core/services/compania.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '@app/core/services/loading-service.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    ToastModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MessageService],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent implements OnInit {
  @Output() isCreated = new EventEmitter<boolean>;
  visible: boolean = false;
  companies: any[];

  formCreateAccount: any = {};
  private _alert = inject(MessageService);
  private _companiaService = inject(CompaniaService);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _messageService = inject(MessageService);
  private _loadingService = inject(LoadingService);


  ngOnInit(): void {
    this.getCompanies();
  }

  private getCompanies(): void {
    this._companiaService.getAll().subscribe(response => {
      this.companies = response.data
    });
  }

  showDialog() {
    this.visible = true;
  }

  onClickCreate() {
    console.log("funciona");
    if (Object.keys(this.formCreateAccount).length === 0) {
      this._messageService.add({ severity: 'danger', summary: 'Error', detail: 'Todos los campos son obligatorios' });
      return;
    }
    this._loadingService.show();
    this.visible = false;
    this.formCreateAccount.compania_id = this.formCreateAccount.compania_id.id;
    console.log(this.formCreateAccount);
    this._authService.register(this.formCreateAccount).subscribe({
      next: response => {
        console.log('Login successful', response);
        localStorage.setItem('authToken', response.token.split('|')[1]);
        // Redirigir al usuario a la página principal
        this._router.navigate(['home']);
      },
      error: error => {
        console.log('Login failed', error);
        this._loadingService.hide();
        this._messageService.add({ severity: 'danger', summary: 'Error', detail: 'Algo salió mal' });
      },
      complete: () => {
        this._loadingService.hide();
      },
    });
  }
}
