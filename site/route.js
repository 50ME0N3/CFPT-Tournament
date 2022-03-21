const express = require('express');
const app = express();
const {BracketsManager} = require('brackets-manager');
const {JsonDatabase} = require('brackets-json-db');
const {create} = require("brackets-manager/dist/create");
const axios = require('axios');
const bp = require('body-parser')
const config = require("./config.js");
const logger = require('../logger.js').logger

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/static'));

const storage = new JsonDatabase();
const manager = new BracketsManager(storage);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/bracket.html");
})

app.route("/status")
    .put(async (req,res) => {
        let changedStatus = {
            id: parseInt(req.query.id),
            status: 6
        }
        await manager.update.match(changedStatus)
        res.send("status changed")
    }) 
app.route("/bracket")
    .get(async (req, res) => {
        const data = await manager.get.stageData(0);
        res.json(data);
    })
    .post((req, res) => {
        if(req.body["API_KEY"] === config.API_KEY){
            createTournament().then(r => "");
            res.send("Brackets created")
            logger.log('info','SITE - The bracket has been generated');
        }
        else{
            logger.log('warn','SITE - A bracket creation has been attempted. But the API KEY was a fake one.');
            res.send("wrong api key")
        }

    })
    .delete((req, res) => {
        manager.delete.stage(parseInt(req.body.id)).then(r => "")
        manager.reset.seeding(parseInt(req.body.id)).then(r => "");
        manager.reset.participant();
        res.send("Brackets deleted");
    })
    .put(async (req, res) => {
        let match = req.body
        let updatedMatch
        if(parseInt(match.scoreA) === 2){
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