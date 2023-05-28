const request = require('supertest');
const app = require('../app');
require('../models')

let movieId;

test('/POST /movies codigo codigo 201 y id definido', async () => {
    const movie = {
        name:"Jurassic Park",
        image:"http://jusasic.jpg",
        synopsis:"Dinosaurios en un parque jsjsj",
        release_year:2054
    };
    const res = await request(app).post('/movies').send(movie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('/GET /movies codigo 200 y length de 1', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/PUT /movies/id codigo 200 y lo actualizado sea correspondiente', async () => {
    const movie = {
        name:"Jurassic Park Updated"
    };
    const res = await request(app).put(`/movies/${movieId}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('/DELETE /movies/:id codigo 204', async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});