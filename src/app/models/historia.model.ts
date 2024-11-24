import { Proyecto } from "./proyecto.model";

export interface Historia {
    id: number,
    titulo: string,
    proyecto_id: number,
    created_at: string,
    updated_at: string,
    proyecto: Proyecto
}