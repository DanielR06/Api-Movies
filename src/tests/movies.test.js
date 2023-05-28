const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
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
    expect(res.body[0].actors).toBeDefined();
    expect(res.body[0].directors).toBeDefined();
    expect(res.body[0].genres).toBeDefined();
});

test('/PUT /movies/id codigo 200 y lo actualizado sea correspondiente', async () => {
    const movie = {
        name:"Jurassic Park Updated"
    };
    const res = await request(app).put(`/movies/${movieId}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('/POST /movies/:id/actors codigo 200 y seteo de los actores', async () => {
    const actor = await Actor.create({
        first_name:"Daniel",
        last_name:"Rodriguez",
        nationality:"Ecuadorian",
        image:"https://randomuser.me/api/portraits/men/27.jpg",
        birthday:"2004-06-06"
    });
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/POST /movies/:id/directors codigo 200 y seteo de los actores', async () => {
    const director = await Director.create({
        first_name:"Daniel",
        last_name:"Rodriguez",
        nationality:"Ecuadorian",
        image:"https://randomuser.me/api/portraits/men/27.jpg",
        birthday:"2004-06-06"
    });
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/POST /movies/:id/genres codigo 200 y seteo de los actores', async () => {
    const genre = await Genre.create({
        name:"Action"
    });
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/DELETE /movies/:id codigo 204', async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});