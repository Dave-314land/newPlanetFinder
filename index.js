const { parse } = require ('csv-parse');
const fs = require('fs');


const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36
    && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

const reader = fs.createReadStream('kepler_data.csv');

reader.pipe(parse({
    columns: true,
    comment: "#"
}))
.on('data', (data) => {
    if (isHabitablePlanet(data)){
        habitablePlanets.push(data);
    }
})
.on('error', (err) => {
    console.log(err);
})
.on('end', () => {
    console.log(habitablePlanets.map((planet) => {
        return planet['kepler_name'];
    }));
    console.log(`Number of habitable planets: ${habitablePlanets.length}`);
});
