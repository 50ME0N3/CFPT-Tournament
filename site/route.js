const express = require('express');
const app = express();
const {BracketsManager} = require('brackets-manager');
const {JsonDatabase} = require('brackets-json-db');
const {create} = require("brackets-manager/dist/create");
const axios = require('axios');
const bp = require('body-parser')
const config = require("./config.js");
const logger = require('../logger.js').logger
const fs = require('fs');
const https = require('https');

const options = {
  key: fs.readFileSync(__dirname + '/ssl/privkey.pem'),
  cert: fs.readFileSync(__dirname + '/ssl/cert.pem')
};

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/static'));


const storage = new JsonDatabase(__dirname + '/../db.json');
const manager = new BracketsManager(storage);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/bracket.html");
})

app.put("/status", async (req,res) => {
        let changedStatus = {
            id: parseInt(req.query.id),
            status: 6
        }
        await manager.update.match(changedStatus)
        res.send("status changed")
    }) 
app.get("/bracket", async (req, res) => {
        const data = await manager.get.stageData(0);
        res.json(data);
})
app.post("/bracket", (req, res) => {
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
app.delete("/bracket", (req, res) => {
    if(req.body["API_KEY"] === config.API_KEY){
        manager.delete.stage(0).then(r => "")
        manager.reset.seeding(0).then(r => "");
        res.send("Brackets deleted");
        logger.log('info','SITE - The bracket has been deleted');
    }
    else{
        logger.log('warn','SITE - A bracket suppression has been attempted. But the API KEY was a fake one.');
        res.send("wrong api key")
    }
})
app.put("/bracket", async (req, res) => {
    if(req.body["API_KEY"] === config.API_KEY){
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
    }
    else{
        logger.log('warn','SITE - A score submission has been attempted. But the API KEY was a fake one.');
        res.send("wrong api key")
    }
})

async function createTournament() {
    const response = await axios.get("http://83.166.147.192:3000/teamsWithId", {})
        .then((res) => res.data)
        .catch((error) => {});

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


const serverHTTPS = https.createServer(options, app).listen(443);

