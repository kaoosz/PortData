import { CreateContatosDto } from "../dto/contatos.dto";
import { IContatosRepository } from "../interface/IContatos.repository";
import { IContatos } from "../models/IContatos.interface";
import { DatabaseClient } from "../service/prisma.service";

export class ContatosRepository implements IContatosRepository {
    constructor(private prisma: DatabaseClient){}

    async create(data: CreateContatosDto): Promise<IContatos> {
        return await this.prisma.contato.create({data});
    }

    async list(page: number, limit: number): Promise<IContatos[] | []> {
        return await this.prisma.contato.findMany({
            orderBy:{
                nome: "asc"
            },
            skip: page,
            take: limit
        });
    }

    async patch(id: number,data: any): Promise<IContatos> {
        return await this.prisma.contato.update({
            data: data,
            where:{
                id: id
            }
        });
    }

    async delete(id: number): Promise<IContatos> {
        return await this.prisma.contato.delete({
            where:{
                id:id
            }
        });
    }
    
    async findExistsByPhone(phone: string): Promise<IContatos | null> {
        return await this.prisma.contato.findFirst({
            where: {
                telefone: phone
            }
        })
    }

    async findById(id: number): Promise<IContatos | null> {
        return await this.prisma.contato.findUnique({
            where: {
                id: id
            }
        })
    }
}