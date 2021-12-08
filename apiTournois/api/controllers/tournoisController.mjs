import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import lodash from 'lodash'

let sql = require("mysql");
let db = require("../db.js");

/**
 * return all the team stocked in database
 * @param req request
 * @param res response
 */
exports.list_all_team = function (req, res) {
    let team = [];
    db.query("SELECT name FROM team", function (err, result, fields) {
        if (err) throw err;
        Object.keys(result).forEach(function (key) {
            team[key] = result[key].name;
        });
        console.log(JSON.stringify(team))
        res.send(JSON.stringify(team));
    });
};

/**
 * return all the team stocked in database with id
 * @param req request
 * @param res response
 */
exports.list_all_teamWithId = function (req, res) {
    let team = {};
    db.query("SELECT idTeam, name FROM team", function (err, result, fields) {
        if (err) throw err;
        Object.keys(result).forEach(function (key) {
            team = Object.values(JSON.parse(JSON.stringify(result)))
        });
        console.log(team);
        res.send(team);
    });
};

/**
 * add a team in the databased
 * @param req request
 * @param res response
 */
exports.create_a_team = function (req, res) {
    db.query("INSERT INTO team(name,discordId) VALUES ('" + req.body["teamName"] + "', '" + req.body["discordId"] + "');", function (err, result, fields) {
        if (err) throw err;
        console.log(result)
    });
};

/**
 * list all the player in the database
 * @param req request
 * @param res response
 */
exports.list_all_player = function (req, res) {
    let players = [];
    db.query("SELECT nickname FROM player INNER JOIN team ON player.idTeam = team.idTeam WHERE team.name = '" + req.query["teamName"] + "'", function (err, result, fields) {
        if (err) throw err;
        Object.keys(result).forEach(function (key) {
            players[key] = result[key].nickname;
        });
        console.log(JSON.stringify(players))
        res.json(JSON.stringify(players));
    });
};

/**
 * add a player in the database and link the team
 * @param req request
 * @param res response
 */
exports.create_a_player = function (req, res) {
    let date = new Date();
    let time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    db.query("INSERT INTO player(nickname, discordId, dateRegistration, idTeam) SELECT '" + req.body["playerName"] + "', '" + req.body["playerId"] + "', '" + time + "', idTeam from team where name LIKE '" + req.body["teamName"] + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result)
    });
};

exports.setTempScore = async function (req, res) {

    // Use JSON file for storage
    const file = join(__dirname, 'tmpScores.json')
    const adapter = new JSONFile(file)
    const JSONdb = new Low(adapter)

    await JSONdb.read();

    db.chain = lodash.chain(JSONdb.data)

    let tmpScore = req.body["score"]
    console.log(tmpScore);

    /*const scores = JSONdb.chain
        .get('scores')
        .find({id:1})
        .value();*/
}