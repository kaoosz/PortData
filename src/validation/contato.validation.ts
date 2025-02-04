import { z } from "zod";
import {requiredMessage,invalidTypeMessage} from "./validation.functions";


export const contatosSchema = z.object({
    nome: z.string({
        required_error: requiredMessage('nome'),
        invalid_type_error: invalidTypeMessage('nome', 'string'),
    }).superRefine((check,error) => {
            let len = check.trim().split(" ")
            if(len.length < 2){
                error.addIssue({
                    code: z.ZodIssueCode.too_small,
                    minimum: 2,
                    type: "string",
                    inclusive: true,
                    message: "Minimo duas palavras"
                })
            }
        }),
    telefone: z.string({
        required_error: requiredMessage('telefone'),
        invalid_type_error: invalidTypeMessage('telefone', 'string'),
    })
    .transform((str) => str.replace(/[()\-\s]/g, ''))
    .refine((val) => /^\d{10,11}$/.test(val), {
        message: "Telefone deve conter 10 ou 11 dígitos (com DDD).",
    }),
});