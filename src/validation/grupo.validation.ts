import { z } from "zod";
import {requiredMessage,invalidTypeMessage} from "./validation.functions";

export const gruposSchema = z.object({
    nome: z.string({
        required_error: requiredMessage('nome'),
        invalid_type_error: invalidTypeMessage('nome', 'string'),
    })
});