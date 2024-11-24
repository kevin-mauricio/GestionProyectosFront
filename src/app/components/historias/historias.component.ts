import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HistoriasService } from '@app/core/services/historias.service';
import { Historia } from '@app/models/historia.model';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { LoadingComponent } from "../loading/loading.component";
import { LoadingService } from '@app/core/services/loading-service.service';
import { TableModule } from 'primeng/table';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TicketService } from '@app/core/services/ticket.service';

@Component({
  selector: 'app-historias',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TableModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './historias.component.html',
  styleUrl: './historias.component.css'
})
export class HistoriasComponent implements OnInit {
  @Input() project_id: number;
  visible: boolean = false;
  visibleCreate: boolean = false;
  visibleTickets: boolean = false;
  visibleCreateTicket: boolean = false;
  stories: Historia[];
  loading;
  title: string = "";
  storyId: number;
  tickets: any[];
  formTicket = {
    descripcion: '',
    comentarios: '',
    estado: '',
    historia_usuario_id: ''
  }

  constructor(
    private _historiasService: HistoriasService,
    private _loadingService: LoadingService,
    private _messageService: MessageService,
    private _ticketService: TicketService
  ) {
    this.loading = _loadingService.loading$;
  }

  ngOnInit(): void {
    console.log("id", this.project_id)
  }

  getStories() {
    this._loadingService.show();
    this._historiasService.getByProject(this.project_id).subscribe({
      next: response => {
        this.stories = response;
        console.log("historias", this.stories)
      },
      complete: () => {
        this._loadingService.hide();
      }
    });
  }

  getTickets() {
    this._loadingService.show();
    this._ticketService.getByHistoriaId(this.storyId).subscribe({
      next: response => {
        this.tickets = response;
        console.log("tickets", this.tickets)
      },
      complete: () => {
        this._loadingService.hide();
      }
    });
  }

  create() {
    this._loadingService.show();

    if (this.title === "") {
      this._loadingService.hide();
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'La descripción no puede estar vacía' });
      return;
    }

    const body = {
      "titulo": this.title,
      "proyecto_id": this.project_id
    };
    this._historiasService.create(body).subscribe({
      next: () => {
        this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Cuenta creada con éxito' });
      },
      error: () => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
        this._loadingService.hide();

      },
      complete: () => {
        this.visibleCreate = false;
        this.title = "";
        this._loadingService.hide();
        this.getStories();
      }
    });
  }

  createTicket() {
    this._loadingService.show();

    if (this.formTicket.descripcion === '' || this.formTicket.comentarios === '') {
      this._loadingService.hide();
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son necesarios' });
      return;
    }

    const body = {
      "descripcion": this.formTicket.descripcion,
      "comentarios": this.formTicket.comentarios,
      "estado": 'Activo',
      "historia_usuario_id": this.storyId
    };

    this._ticketService.create(body).subscribe({
      next: () => {
        this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Cuenta creada con éxito' });
      },
      error: () => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
        this._loadingService.hide();
      },
      complete: () => {
        this.visibleCreateTicket = false;
        this.formTicket = {
          descripcion: '',
          comentarios: '',
          estado: '',
          historia_usuario_id: ''
        }
        this._loadingService.hide();
        this.getTickets();
      }
    });
  }

  setColor(estado: string): string {
    const estados: any = {
      activo: {
        text: 'Activo',
        color: 'green'
      },
      proceso: {
        text: 'En Proceso',
        color: 'orange'
      },
      finalizado: {
        text: 'Finalizado',
        color: 'red'
      }
    };
  
    for (const key in estados) {
      if (estados[key].text === estado) {
        return estados[key].color;
      }
    }
  
    return ''; // Devuelve una cadena vacía si no se encuentra el estado
  }

  showDialog() {
    this.visible = true;
  }

  showDialogCreate() {
    this.visibleCreate = true;
  }

  showDialogCreateTicket() {
    this.visibleCreateTicket = true;
  }

  showDialogTicket(storyId: number) {
    this.storyId = storyId;
    this.visibleTickets = true;
    this.getTickets();
  }

  onClickStorie() {
    this.showDialog();
    this.getStories();
  }
}
