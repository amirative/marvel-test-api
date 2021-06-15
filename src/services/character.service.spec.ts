import {getCharacterById} from './character.service'

describe('Test character service', () => {
 

    describe('Test getCharacterById function', () => {
        it('Should return null if character is not found', async () => {
            let result:any = await getCharacterById('randomid36672')
            expect(result).toBe(null);
        });

        it('Should return results if character exists', async () => {
            const id:any = '1009165';
            const sampleResponse = {
                "id": "99999",
                "name": "test",
                "description": "test"
              };
            let result:any = await getCharacterById(id);

            expect(result.id).toBe(id*1);
         
        });

        it('Result object should have id,name,description keys', async () => {
            const id:string = '1009165';
            const sampleResponse = {
                "id": "99999",
                "name": "test",
                "description": "test"
              };
            let result:any = await getCharacterById(id);

            expect(Object.keys(result)).toEqual(Object.keys(sampleResponse));
           
        });

    })
})