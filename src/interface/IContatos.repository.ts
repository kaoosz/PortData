import { CreateContatosDto } from "../dto/contatos.dto";
import { IContatos } from "../models/IContatos.interface";

export interface IContatosRepository {
    create(data: CreateContatosDto): Promise<IContatos>;
    list(page:number,limit:number): Promise<IContatos[] | []>;
    patch(id: number,data: any): Promise<IContatos>;
    delete(id: number): Promise<IContatos>;
    findExistsByPhone(phone: string): Promise<IContatos | null>
    findById(id: number): Promise<IContatos | null>
}