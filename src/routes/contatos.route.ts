import { Router } from 'express';
import { ContatosController } from '../controller/contatos.controller';
import { ContatosService } from '../service/contatos.service';
import { ContatosRepository } from '../repository/contatos.repository';
import { validateCreateContato } from '../middleware/create.contatos';
import { createPrismaClient } from '../service/prisma.service';
import { validateUpdateContato } from '../middleware/update.contatos';

const router = Router();

const db = createPrismaClient();
const contatoRepository = new ContatosRepository(db);
const contatosService = new ContatosService(contatoRepository);
const contatosController = new ContatosController(contatosService);

router.post("/contatos",validateCreateContato,(req,res) => {
    contatosController.createContato(req,res);
});

router.get("/contatos",(req,res) => {
    contatosController.listContatosPagined(req,res);
});

router.patch("/contatos/:id",validateUpdateContato,(req,res) => {
    contatosController.updateContatos(req,res);
});

router.delete("/contatos/:id",(req,res) => {
    contatosController.deleteContatos(req,res);
});

export default router;