import { CreateContatosDto, UpdateContatosDto } from "../dto/contatos.dto";
import { IContatosRepository } from "../interface/IContatos.repository";
import { IContatos } from "../models/IContatos.interface";
import { AppError } from "../utils/error";


export class ContatosService {
    constructor(private contatosRepository: IContatosRepository ){}

    async createContatos(data: CreateContatosDto): Promise<IContatos>{
        const existeTelefone = await this.contatosRepository.findExistsByPhone(data.telefone);

        if(existeTelefone){
            throw new AppError("O telefone já existe.", 409);
        }

        return await this.contatosRepository.create(data);
    }

    async listContatosPagined(page:number,limit:number): Promise<IContatos[] | []> {
        return await this.contatosRepository.list(page,limit);
    }

    async updateContatos(id: number,data:UpdateContatosDto): Promise<IContatos> {

        let existeTelefone;

        const exists = await this.contatosRepository.findById(id);
        
        if(!exists){
            throw new AppError("id não encontrado.", 400);
        }

        if(data.telefone){
            existeTelefone = await this.contatosRepository.findExistsByPhone(data.telefone);
        }
        
        if(existeTelefone){
            throw new AppError("O telefone já existe.", 409);
        }
        
        return await this.contatosRepository.patch(id,data);
    }
    
    async deleteContatos(id: number): Promise<string>{
        const exists = await this.contatosRepository.findById(id);
        if(!exists){
            throw new AppError("Id não encontrado.", 400);
        }
        await this.contatosRepository.delete(id);
        return "Sucesso delete.";
    }
}