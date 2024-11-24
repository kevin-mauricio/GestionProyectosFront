import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '@app/core/services/proyecto.service';
import { Proyecto } from '@app/models/proyecto.model';
import { TableModule } from 'primeng/table';
import { CreateAccountComponent } from "../../components/create-account/create-account.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { LoadingService } from '@app/core/services/loading-service.service';
import { HistoriasComponent } from "../../components/historias/historias.component";
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule,
    HistoriasComponent,
    ButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  projects: Proyecto[];
  loading;

  constructor(
    private _proyectoService: ProyectoService,
    private _loadingService: LoadingService,
    private _authService: AuthService,
    private _router: Router,

  ) {
    this.loading = _loadingService.loading$;
  }

  ngOnInit(): void {
    this.getProjects();
    console.log(localStorage.authToken.split('|')[1])
  }

  getProjects(): void {
    this._loadingService.show();
    this._proyectoService.getAll().subscribe({
      next: response => {
        this.projects = response;
      },
      error: error => {
        console.log('Error fetching projects', error);
      },
      complete: () => {
        this._loadingService.hide();

      }
    });
  }

  logout() {
    this._loadingService.show();
    this._authService.logout().subscribe({
      next: response => {
        this._router.navigate(['login']);
        localStorage.clear();
      },
      complete: () => {
        this._loadingService.hide();

      }
    });
  }

}
