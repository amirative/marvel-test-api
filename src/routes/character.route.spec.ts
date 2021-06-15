import request from 'supertest';
import app from '../app';



describe('Test /characters route', () => {

    // it('Should return 404 if any error', async () => {

    //     const result = await request(app).get('/characters').send();

    //     expect(result.status).toBe(404);
    // });

    beforeEach(() => {
        jest.setTimeout(6000000);
      });

    it('Should return 200 if character found', async () => {

        const result = await request(app).get('/characters').send();

        expect(result.status).toBe(200);
    },10000000);

    it('Should return an array', async () => {

        const result = await request(app).get('/characters').send();

        expect(Array.isArray(result.body)).toBe(true);
    });

    it('Should return an non empty numeric array', async () => {

        const result = await request(app).get('/characters').send();

        expect(result.body.length>0).toBe(true);
        expect(Number.isInteger(result.body[0])).toBe(true);
    });

});


describe('Test /characters/{id} route', () => {

    it('Should return 404 if character not found', async () => {

        const result = await request(app).get('/characters/7asdff').send();

        expect(result.status).toBe(404);
    });

    it('Should return 200 if character was found', async () => {

        const result = await request(app).get('/characters/1009165').send();

        expect(result.status).toBe(200);
    });

    it('Should return result object with id,name,description keys', async () => {

        const sampleResponse = {
            "id": "99999",
            "name": "test",
            "description": "test"
          };

        const result = await request(app).get('/characters/1009165').send();

        expect(Object.keys(result.body)).toEqual(Object.keys(sampleResponse));
    });
});