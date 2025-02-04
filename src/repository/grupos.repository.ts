import { IGruposRepository } from "../interface/IGrupos.repository";
import { CreateGruposDto } from "../dto/grupos.dto";
import { IGrupos } from "../models/IGrupos.interface";
import { DatabaseClient } from "../service/prisma.service";
import { IContatosGrupos } from "../models/IContatos.grupos.interface";
import { CreateContatosGruposDto } from "../dto/contatos.grupos.dto";

export class GruposRepository implements IGruposRepository {
        
    constructor(private prisma: DatabaseClient){}

    async create(data: CreateGruposDto): Promise<IGrupos> {
        return await this.prisma.grupo.create({data});
    }

    async createContatosGrupos(data:CreateContatosGruposDto): Promise<IContatosGrupos> {
        return await this.prisma.contatos_Grupos.create({
            data
        });
    }

    async patch(id: number, data: any): Promise<IGrupos> {
        return await this.prisma.grupo.update({
            data: data,
            where:{
                id: id
            }
        });
    }
    
    async delete(id: number): Promise<IGrupos> {
        return await this.prisma.grupo.delete({
            where:{
                id:id
            }
        });
    }

    async listByIdContatos(id: number): Promise<IGrupos | null> {
        return await this.prisma.grupo.findUnique({
            where: {
                id: id
            },
            include: {
                contatos:{
                    include:{
                        contato: true
                    }
                }
            }
        });
    }

    async reportContatosGrupos(): Promise<Array<{grupo: string, quantidade_contatos: number}>> {
        return (await this.prisma.$queryRaw`
        SELECT 
            g.nome AS grupo,
            COUNT(cg.id_contato) AS quantidade_contatos
            FROM Grupo g
            LEFT JOIN Contatos_Grupos cg ON cg.id_grupo = g.id
            GROUP BY g.nome
            ORDER BY quantidade_contatos DESC;
        `) as Array<{grupo: string, quantidade_contatos: number}>

    }
    
    async findExistsByName(name: string): Promise<IGrupos | null> {
        return await this.prisma.grupo.findFirst({
            where: {
                nome: name
            }
        })
    }

    async findById(id: number): Promise<IGrupos | null> {
        return await this.prisma.grupo.findUnique({
            where: {
                id: id
            }
        })
    }

    async findContatoGruposExist(id_grupo: number,id_contato: number): Promise<any> {
        return await this.prisma.contatos_Grupos.findFirst({
            where:{
                id_contato: id_contato,
                id_grupo:id_grupo
            }
        })
    }
}