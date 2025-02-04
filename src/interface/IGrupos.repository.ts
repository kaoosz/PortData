import { CreateGruposDto } from "../dto/grupos.dto";
import { IContatosGrupos } from "../models/IContatos.grupos.interface";
import { IGrupos } from "../models/IGrupos.interface";
import { CreateContatosGruposDto } from "../dto/contatos.grupos.dto";

export interface IGruposRepository {
    create(data: CreateGruposDto): Promise<IGrupos>;
    patch(id: number,data: any): Promise<IGrupos>;
    delete(id: number): Promise<IGrupos>;
    listByIdContatos(id: number): Promise<IGrupos | null>;
    createContatosGrupos(data: CreateContatosGruposDto): Promise<IContatosGrupos>;
    reportContatosGrupos(): Promise<Array<{grupo: string, quantidade_contatos: number} | [] >>;
    findExistsByName(name: string): Promise<IGrupos | null>
    findById(id: number): Promise<IGrupos | null>
    findContatoGruposExist(id_grupo: number,id_contato: number): Promise<any>;
}