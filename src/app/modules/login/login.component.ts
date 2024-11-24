import { Component, inject } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CreateAccountComponent } from "../../components/create-account/create-account.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtil } from '@app/utils/form';
import { AuthService } from '@app/core/services/auth.service';
import { Login } from '@app/models/auth.model';
import { LoadChildren, Router } from '@angular/router';
import { LoadingService } from '@app/core/services/loading-service.service';
import { LoadingComponent } from "../../components/loading/loading.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DividerModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CommonModule,
    CardModule,
    CreateAccountComponent,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  visible = false;
  form: FormGroup;
  formUtil = new FormUtil();
  isInvalidForm: boolean = false;
  loading;

  constructor(
    private _messageService: MessageService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _loadingService: LoadingService
  ) {
    this.initForm();
    this.loading = _loadingService.loading$;
  }

  private initForm(): void {
    localStorage.clear()
    console.log(localStorage)
    this.form = this._formBuilder.group({
      email: [null, Validators.required],
      pass: [null, Validators.required]
    });
  }

  showDialog() {
    this.visible = true;
  }

  showAlert() {
    this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Cuenta creada con éxito' });
  }



  onSubmitLogin() {
    console.log("funciona");
    if (this.form.invalid) {
      this.isInvalidForm = true;
      return;
    }
    this._loadingService.show();
    const body: Login = {
      email: this.form.get('email')?.value,
      password: this.form.get('pass')?.value
    }
    this._authService.login(body).subscribe({
      next: response => {
        console.log('Login successful', response);
        localStorage.setItem('authToken', response.token.split('|')[1]);
        // Redirigir al usuario a la página principal
        this._router.navigate(['home']);
      },
      error: error => {
        console.log('Login failed', error);
        this._messageService.add({ severity: 'danger', summary: 'Error', detail: 'Inicio de sesión incorrecto' });
        this._loadingService.hide();
      },
      complete: () => {
        this._loadingService.hide();
      },
    });
  }
}
