const request = require('supertest');
const app = require('../app');
require('../models')

let actorId;

test('/POST /actors codigo 201 y id definido', async () => {
    const actor = {
        first_name:"Daniel",
        last_name:"Rodriguez",
        nationality:"Ecuadorian",
        image:"https://randomuser.me/api/portraits/men/27.jpg",
        birthday:"2004-06-06"
    };
    const res = await request(app).post('/actors').send(actor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('/GET /actors codigo 200 y length de 1', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].movies).toBeDefined();
});

test('/PUT /actors/:id codigo 200 y lo actualizado sea correspondiente', async () => {
    const actor = {
        first_name:"Daniel updated"
    };
    const res = await request(app).put(`/actors/${actorId}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.first_name).toBe(actor.first_name);
});

test('/DELETE /actors/:id codigo 204 ', async () => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
});