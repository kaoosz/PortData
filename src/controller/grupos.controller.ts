import { Request, Response } from "express";
import { AppError } from "../utils/error";
import { GruposService } from "../service/grupos.service";
import { CreateGruposDto, UpdateGruposDto } from "../dto/grupos.dto";
import { CreateContatosGruposDto } from "../dto/contatos.grupos.dto";

export class GruposController {
    constructor(private grupoService: GruposService){}

    async createGrupo(req: Request,res: Response): Promise<void>{
        try {

            const createGruposDto: CreateGruposDto = req.body;
            const grupos = await this.grupoService.createGrupos(createGruposDto);
            res.status(201).json(grupos);
        } catch (error) {
            if(error instanceof AppError){
                const status = error.statusCode || 500;
                const message = error.message || "Internal server error";
                res.status(status).json({ message });
            }else {
                res.status(500).json({ 
                    error: "Internal server error"
                });
            }
                
        }
    }

    async createContatosGrupos(req: Request,res: Response): Promise<void>{
        try {

            const createContatosGruposDto: CreateContatosGruposDto = req.body;
            const contatosGrupos = await this.grupoService.createContatosGrupos(createContatosGruposDto);
            res.status(201).json(contatosGrupos);
        } catch (error) {
            if(error instanceof AppError){
                const status = error.statusCode || 500;
                const message = error.message || "Internal server error";
                res.status(status).json({ message });
            }else {
                res.status(500).json({ 
                    error: "Internal server error"
                });
            }
                
        }
    }

    async getGruposIdContatos(req: Request,res: Response): Promise<void>{
        try {
            const { id } = req.params;
            const numberId = Number(id)

            const contatosPaginados = await this.grupoService.listGruposIdContatos(numberId);
            
            res.status(200).json(contatosPaginados);
        } catch (error) {
            if(error instanceof AppError){
                const status = error.statusCode || 500;
                const message = error.message || "Internal server error";
                res.status(status).json({ message });
            }else {
                res.status(500).json({ 
                    error: "Internal server error"
                });
            } 
        }
    }

    async getReport(req: Request,res: Response): Promise<void>{
        try {
            const contatosPaginados = await this.grupoService.listReportedGrupos();
            res.status(200).json(contatosPaginados);
        } catch (error) {
            if(error instanceof AppError){
                const status = error.statusCode || 500;
                const message = error.message || "Internal server error";
                res.status(status).json({ message });
            }else {
                res.status(500).json({ 
                    error: "Internal server error"
                });
            } 
        }
    }

    async updateGrupos(req: Request, res: Response): Promise<void>{
        try {

            const { id } = req.params;
            const updateGruposDto: UpdateGruposDto = req.body;
            const numberId = Number(id);

            const updateGrupo = await this.grupoService.updateGrupos(numberId,updateGruposDto);
            res.status(200).json(updateGrupo);
        } catch (error) {
            if(error instanceof AppError){
                const status = error.statusCode || 500;
                const message = error.message || "Internal server error";
                res.status(status).json({ message });
            }else {
                res.status(500).json({ 
                    error: "Internal server error"
                });
            } 
        }
    }
    
    async deleteGrupos(req: Request, res: Response): Promise<void>{
        try {
            const { id } = req.params;
            const numberId = Number(id)
            const deleteGrupo = await this.grupoService.deleteGrupos(numberId);
            res.status(200).json(deleteGrupo);
        } catch (error) {
            if(error instanceof AppError){
                const status = error.statusCode || 500;
                const message = error.message || "Internal server error";
                res.status(status).json({ message });
            }else {
                res.status(500).json({ 
                    error: "Internal server error"
                });
            } 
        }
    }
}