import { CreateContatosGruposDto } from "../dto/contatos.grupos.dto";
import { CreateGruposDto, UpdateGruposDto } from "../dto/grupos.dto";
import { IContatosRepository } from "../interface/IContatos.repository";
import { IGruposRepository } from "../interface/IGrupos.repository";
import { IGrupos } from "../models/IGrupos.interface";
import { AppError } from "../utils/error";


export class GruposService {
    constructor(
        private gruposRepository: IGruposRepository,
        private contatosRepository: IContatosRepository
    ){}

    async createGrupos(data: CreateGruposDto): Promise<IGrupos>{
        const existNome = await this.gruposRepository.findExistsByName(data.nome);

        if(existNome){
            throw new AppError("O nome já existe.", 409);
        }

        return await this.gruposRepository.create(data);
    }

    async createContatosGrupos(data: CreateContatosGruposDto): Promise<any>{
        const existIdGrupo = await this.gruposRepository.findById(data.id_grupo);
        const existIdContato = await this.contatosRepository.findById(data.id_contato);


        if(!existIdGrupo){
            throw new AppError("O id_grupo não encontrado.", 400);
        }

        if(!existIdContato){
            throw new AppError("O id_contato não encontrado.", 400);
        }

        const contatosGruposExists = await this.gruposRepository.findContatoGruposExist(data.id_grupo,data.id_contato);

        if(contatosGruposExists){
            throw new AppError("Esta associação entre contato e grupo já existe.", 400);
        }
        return await this.gruposRepository.createContatosGrupos(data);
    }

    async listGruposIdContatos(id: number): Promise<IGrupos | string> {

        const result =  await this.gruposRepository.listByIdContatos(id);
        if(!result){
            return "não há contatos vinculados a esse grupo";
        }
        return result;
    }

    async listReportedGrupos(): Promise< Array<{grupo: string, quantidade_contatos: number}> | string | Array<{}>> {
        const report = await this.gruposRepository.reportContatosGrupos() as Array<{grupo: string, quantidade_contatos: number}>;

        const removeZerosQuantidade_Contatos = report.map(item => ({
            grupo: item.grupo,
            quantidade_contatos: item.quantidade_contatos.toString()
        })).filter(item => item.quantidade_contatos != "0");

        if(removeZerosQuantidade_Contatos.length == 0){
            return "Nenhum relatório disponivel";
        }

        return removeZerosQuantidade_Contatos;
    }

    async updateGrupos(id: number,data:UpdateGruposDto): Promise<IGrupos> {

        const exists = await this.gruposRepository.findById(id);
        
        if(!exists){
            throw new AppError("id não encontrado.", 400);
        }

        const existName = await this.gruposRepository.findExistsByName(data.nome!);

        if(existName){
            throw new AppError("nome já existe.", 409);
        }

        return await this.gruposRepository.patch(id,data);
    }
    
    async deleteGrupos(id: number): Promise<string>{
        const exists = await this.gruposRepository.findById(id);
        
        if(!exists){
            throw new AppError("id não encontrado.", 400);
        }

        await this.gruposRepository.delete(id);
        return "Sucesso delete.";
    }
}