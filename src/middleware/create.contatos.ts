import { NextFunction, Request, Response } from 'express';
import { contatosSchema } from '../validation/contato.validation';

export const validateCreateContato = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsed = contatosSchema
    .strip()
    .safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: parsed.error.errors.map((err) => err.message),
    });
    return;
  }
  req.body = parsed.data;
  next();
};
