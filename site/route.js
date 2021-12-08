const express = require('express');
const app = express();
const {BracketsManager} = require('brackets-manager');
const {JsonDatabase} = require('brackets-json-db');
const {create} = require("brackets-manager/dist/create");
const axios = require('axios');
const bp = require('body-parser')
const {parse} = require("nodemon/lib/cli");

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/static'));

const storage = new JsonDatabase();
const manager = new BracketsManager(storage);


app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile("C:\\Users\\antoi\\Desktop\\perso\\site\\index.html");
});

app.get('/teams', (req, res) => {
    console.log(__dirname);
    res.sendFile("C:\\Users\\antoi\\Desktop\\perso\\site\\team.html");
});

app.get("/regles", (req, res) => {
    res.sendFile("C:\\Users\\antoi\\Desktop\\perso\\site\\regles.html");
})

app.get("/brackets", (req, res) => {
    res.sendFile("C:\\Users\\antoi\\Desktop\\perso\\site\\bracket.html");
})

app.route("/bracket")
    .get(async (req, res) => {
        const data = await manager.get.stageData(0);
        res.json(data);
    })
    .post((req, res) => {
        createTournament().then(r => "");
        res.send("Brackets created")
    })
    .delete((req, res) => {
        manager.delete.stage(0).then(r => "")
        manager.reset.seeding(0).then(r => "");
        res.send("Brackets deleted");
    })
    .put(async (req, res) => {
        let match = req.body
        let updatedMatch
        if(parseInt(match.opponent1) === 2){
            updatedMatch = {
                id: parseInt(match.matchId),
                opponent1: {
                    score: parseInt(match.scoreA),
                    result: 'win'
                },
                opponent2: {
                    score: parseInt(match.scoreB),
                    result: 'loss'
                }
            }
        }
        else{
            updatedMatch = {
                id: parseInt(match.matchId),
                opponent1: {
                    score: parseInt(match.scoreA),
                    result: 'loss'
                },
                opponent2: {
                    score: parseInt(match.scoreB),
                    result: 'win'
                }
            }
        }

        await manager.update.match(updatedMatch);
        res.send("all good");
    })

async function createTournament() {
    const response = await axios.get("http://localhost:3000/teamsWithId", {})
        .then((res) => res.data)
        .catch((error) => console.error(error));

    const teams = response.map(team => ({id: team.idTeam, tournament_id: 0, name: team.name}));
    await storage.insert('participant', teams);

    const seeding = response.map(team => team.name);
    await manager.create({
        name: 'Amateur',
        tournamentId: 0,
        type: 'double_elimination',
        seeding,
        settings: {seedOrdering: ['natural'], grandFinal: 'simple'},
    });
}

const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});