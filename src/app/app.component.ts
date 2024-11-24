import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './core/services/loading-service.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ToastModule,
    HttpClientModule,
    LoadingComponent
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion-proyectos';
  loading;
  constructor(
    private _loadingService: LoadingService
  ) {
    this.loading = _loadingService.loading$;
  }
}
