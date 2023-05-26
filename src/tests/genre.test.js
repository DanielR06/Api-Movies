const request = require('supertest');
const app = require('../app');

let genreId;

test('/POST /genres code 201 y id definido', async () => {
    const genre = {
        name:"Action"
    };
    const res = await request(app).post('/genres').send(genre);
    genreId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('/GET /genres codigo 200 y traiga 1', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/PUT /genres/:id codigo 200 y el nombre actualizado sea el correcto', async () => {
    const genre = {
        name:"Action updated"
    };
    const res = await request(app).put(`/genres/${genreId}`).send(genre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
})

test('/DELETE /genres/:id', async () => {
    const res = await request(app).delete(`/genres/${genreId}`);
    expect(res.status).toBe(204);
});