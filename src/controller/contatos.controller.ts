import { Request, Response } from "express";
import { CreateContatosDto, UpdateContatosDto } from "../dto/contatos.dto";
import { ContatosService } from "../service/contatos.service";
import { AppError } from "../utils/error";

export class ContatosController {
    constructor(private contatoService: ContatosService){}

    async createContato(req: Request,res: Response): Promise<void>{
        try {

            const createContatosDto: CreateContatosDto = req.body;
            const contatos = await this.contatoService.createContatos(createContatosDto);
            res.status(201).json(contatos);
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

    async listContatosPagined(req: Request,res: Response): Promise<void>{
        try {
            const {page,limit} = req.query;

            const pageNumber = parseInt(page as string);
            const limitNumber = parseInt(limit as string);

            const contatosPaginados = await this.contatoService.listContatosPagined(pageNumber,limitNumber);
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

    async updateContatos(req: Request, res: Response): Promise<void>{
        try {

            const { id } = req.params;
            const updateContatosDto: UpdateContatosDto = req.body;
            const numberId = Number(id);

            const updateContatos = await this.contatoService.updateContatos(numberId,updateContatosDto);
            res.status(200).json(updateContatos);
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
    
    async deleteContatos(req: Request, res: Response): Promise<void>{
        try {
            const { id } = req.params;
            const numberId = Number(id)
            const deleteContatos = await this.contatoService.deleteContatos(numberId);
            res.status(200).json(deleteContatos);
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