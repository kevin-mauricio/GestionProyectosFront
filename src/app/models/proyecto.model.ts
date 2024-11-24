import { Compania } from "./compania.model";

export interface Proyecto {
    id: number,
    nombre: string,
    compania_id: number,
    created_at: string,
    updated_at: string,
    compania?: Compania
}