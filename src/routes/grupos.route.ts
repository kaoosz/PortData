import { Router } from 'express';
import { GruposRepository } from '../repository/grupos.repository';
import { GruposService } from '../service/grupos.service';
import { GruposController } from '../controller/grupos.controller';
import { createPrismaClient } from '../service/prisma.service';
import { validateCreateGrupos } from '../middleware/create.grupos';
import { ContatosRepository } from '../repository/contatos.repository';

const router = Router();

const db = createPrismaClient();
const contatosRepository = new ContatosRepository(db);
const gruposRepository = new GruposRepository(db);
const gruposService = new GruposService(gruposRepository,contatosRepository);
const gruposController = new GruposController(gruposService);

router.post("/grupos",validateCreateGrupos, (req,res) => {
    gruposController.createGrupo(req,res);
});

router.get("/grupos/:id/contatos",(req,res) => {
    gruposController.getGruposIdContatos(req,res);
});

router.get("/relatorio/contatos-grupos",(req,res) => {
    gruposController.getReport(req,res);
});

router.patch("/grupos/:id",validateCreateGrupos,(req,res) => {
    gruposController.updateGrupos(req,res);
});

router.delete("/grupos/:id",(req,res) => {
    gruposController.deleteGrupos(req,res);
});

router.post("/contatos-grupos",(req,res) => {
    gruposController.createContatosGrupos(req,res);
});

export default router;