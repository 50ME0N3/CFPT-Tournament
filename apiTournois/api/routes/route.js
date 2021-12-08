const {request, response} = require("express");
const controller = import("../controllers/tournoisController.js");

module.exports = function (app) {
    let {list_all_teamWithId, list_all_player, list_all_team, create_a_player, create_a_team, setTempScore} = require("../controllers/tournoisController.js");

    console.log()
    app.route('/teams')
        //send the page to get or create team
        .post(create_a_team)
        .get(list_all_team);

    app.route('/teamsWithId')
        .get(list_all_teamWithId)

    app.route('/player')
        //send the page to get or create players
        .get(list_all_player)
        .post(create_a_player);

    app.route('/score')
        .post(setTempScore);
}