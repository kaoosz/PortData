import { NextFunction, Request, Response } from 'express';
import { gruposSchema } from '../validation/grupo.validation';

export const validateCreateGrupos = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsed = gruposSchema
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
