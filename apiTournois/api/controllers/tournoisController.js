const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const lodash = require('lodash')
const shortid = require('shortid')

let sql = require("mysql");
let db = require("../db.js");

const axios = require("axios");

/**
 * return all the team stocked in database
 * @param req request
 * @param res response
 */
exports.list_all_team = function(req, res) {
    let team = [];
    db.query("SELECT name FROM team", function(err, result, fields) {
        if (err) throw err;
        Object.keys(result).forEach(function(key) {
            team[key] = result[key].name;
        });
        console.log("list of all teams")
        console.log(JSON.stringify(team))
        console.log("\n\r")
        res.send(JSON.stringify(team));
    });
};

/**
 * return all the team stocked in database with id
 * @param req request
 * @param res response
 */
exports.list_all_teamWithId = function(req, res) {
    let team = {};
    db.query("SELECT idTeam, name FROM team", function(err, result, fields) {
        if (err) throw err;
        Object.keys(result).forEach(function(key) {
            team = Object.values(JSON.parse(JSON.stringify(result)))
        });
        console.log("teams with id")
        console.log(team);
        console.log("\n\r")
        res.send(team);
    });
};

/**
 * add a team in the databased
 * @param req request
 * @param res response
 */
exports.create_a_team = function(req, res) {
    db.query("INSERT INTO team(name,discordId) VALUES ('" + req.body["teamName"] + "', '" + req.body["discordId"] + "');", function(err, result, fields) {
        if (err) throw err;
    });
    console.log("A team has been created")
    console.log("\n\r")
};

/**
 * list all the player in the database
 * @param req request
 * @param res response
 */
exports.list_all_player = function(req, res) {
    let players = [];
    db.query("SELECT nickname FROM player INNER JOIN team ON player.idTeam = team.idTeam WHERE team.name = '" + req.query["teamName"] + "'", function(err, result, fields) {
        if (err) throw err;
        Object.keys(result).forEach(function(key) {
            players[key] = result[key].nickname;
        });
        console.log("list of all players")
        console.log(JSON.stringify(players))
        console.log("\n\r")
        res.json(JSON.stringify(players));
    });
};

/**
 * add a player in the database and link the team
 * @param req request
 * @param res response
 */
exports.create_a_player = function(req, res) {
    let date = new Date();
    let time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    db.query("INSERT INTO player(nickname, discordId, dateRegistration, idTeam) SELECT '" + req.body["playerName"] + "', '" + req.body["playerId"] + "', '" + time + "', idTeam from team where name LIKE '" + req.body["teamName"] + "'", function(err, result, fields) {
        if (err) throw err;
    });
    console.log("A player has been created ")
    console.log("\n\r")
};

/**
 * verify if the score is the same than in the db
 * @param req request 
 * @param res response
 */
exports.setTempScore = async function(req, res) {

    const adapter = new FileSync('tmpScore.json')
    const JSONdb = new low(adapter)
    let tmpScore = req.body

    JSONdb.defaults({ match: [] }).write();
    const scores = JSONdb.get('match').find({ id: req.body.id }).value();

    if (isObject(scores)) {
        if (scores["id"] === req.body.id) {
            if (scores["scoreA"] === req.body.scoreA && scores["scoreB"] === req.body.scoreB) {
                console.log("same score");
                sendScoreToBracket(scores);
                console.log("\n\r")
                res.send("same score");
            } else {
                console.log("different score")
                console.log("\n\r")
                res.send("alert")
            }
        } else {
            JSONdb.get("match").push(tmpScore).write();
            console.log("score added")
            console.log("\n\r")
            res.send("score added")
        }
    } else {
        JSONdb.get("match").push(tmpScore).write();
        console.log("score added to tempScore")
        console.log("\n\r")
        res.send("score added")
    }
}

/**
 * send all the match with ready status
 * @param req request  
 * @param res response
 */
exports.getReadyStatedMatch = async function(req, res) {
    const file = new FileSync('db.json');
    const bracket = new low(file);
    let response = {};
    response.channelToCreate = [];
    for (const [key, value] of Object.entries(bracket.get('match').__wrapped__.match)) {
        if (value.status === 2) {
            let channel = {
                "id": value.id,
                "team1": value.opponent1.id,
                "team2": value.opponent2.id
            }
            response.channelToCreate.push(channel);
        }
    }
    console.log("all match with ready state")
    console.log("\n\r")
    res.send(response);
}

/**
 * check if the variable is an object
 * @param val the variable to test
 * @returns 
 */
function isObject(val) {
    return val instanceof Object;
}

/**
 * send scores to the db of the bracket
 * @param scores the score to put in the brackets
 */
function sendScoreToBracket(scores) {
    axios
        .put('http://localhost:7000/bracket', {
            "matchId": parseInt(scores["id"]),
            "scoreA": parseInt(scores["scoreA"]),
            "scoreB": parseInt(scores["scoreB"])
        })
        .then(res => {
            console.log("data send to bracket");
            console.log("\n\r")
        })
        .catch(error => {
            console.error(error)
        })
}

exports.getTeamNameWithId = async function(req, res) {
    db.query("SELECT name, discordId FROM team WHERE idTeam = '" + req.query.id + "';", function(err, result, fields) {
        if (err) throw err;
        console.log("list of all team name with id")
        console.log(result)
        console.log("\n\r")
        res.send(result)
    });
}