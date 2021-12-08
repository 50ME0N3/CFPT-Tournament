const {request, response} = require("express");
const controller = import("../controllers/tournoisController.mjs");
const {create_a_player, list_all_team, list_all_player} = import("../controllers/tournoisController.mjs");
module.exports = function(app) {
    let controller = import('../controllers/tournoisController.mjs');

    app.route('/teams')
        //send the page to get or create team
        .post(controller.create_a_team)
        .get(controller.list_all_team);

    app.route('/teamsWithId')
        .get(controller.list_all_teamWithId)

    app.route('/player')
        //send the page to get or create players
        .get(controller.list_all_player)
        .post(controller.create_a_player);

    app.route('/score')
        .post(controller.setTempScore);
}