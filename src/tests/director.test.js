const request = require('supertest');
const app = require('../app');

let directorId;

test('/POST /directors codigo 201 y id definido', async () => {
    const director = {
        first_name:"Daniel",
        last_name:"Rodriguez",
        nationality:"Ecuadorian",
        image:"https://randomuser.me/api/portraits/men/27.jpg",
        birthday:"2004-06-06"
    };
    const res = await request(app).post('/directors').send(director)
    directorId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('/GET /directors codigo 200 y que solo haya 1', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/PUT /directors/:id codigo 200 y lo actualizado sea correspondiente', async () => {
    const director = {
        first_name:"Daniel updated"
    }
    const res = await request(app).put(`/directors/${directorId}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.first_name).toBe(director.first_name);
});

test('/DELETE /directors/:id codigo 204', async () => {
    const res = await request(app).delete(`/directors/${directorId}`)
    expect(res.status).toBe(204);
});