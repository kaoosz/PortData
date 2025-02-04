import express from "express";
import contatosRoute from "./routes/contatos.route";
import gruposRoute from "./routes/grupos.route";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(contatosRoute);
app.use(gruposRoute);
