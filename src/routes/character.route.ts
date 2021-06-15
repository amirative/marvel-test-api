import { Router, Request, Response } from "express";
import { getAllCharacterIds, findById } from '../controllers/character.controller'
const router: Router = Router();

router.get('/',getAllCharacterIds);

router.get('/:id', findById);

export default router;

