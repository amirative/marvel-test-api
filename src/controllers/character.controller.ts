import { Request, Response } from "express";
import { getAllCharactersIds,getCharacterById } from '../services/character.service';

export async function getAllCharacterIds(req:Request,res:Response){

    try {
        let result:any = await getAllCharactersIds();
        return res.status(200).json(result);
    } catch (error) {
        // console.log(error);
        return res.status(404).json({'result':'error'});
    }
    
}

export async function findById(req:Request,res:Response){

    if(!req.params.id) return res.status(422).json({'error':'ID is required'});
    
    try {
        let result:any = await getCharacterById(req.params.id)
        if(!result){
            return res.status(404).json({'result':'Not Found'});
        }
        return res.status(200).json(result);
    } catch (error) {
        // console.log(error);
        return res.status(404).json({'result':'error'});
        
    }
    
}

