const { request, response } = require("express");
const controller =
    import ("../controllers/tournoisController.js");

module.exports = function(app) {
    let {
        list_all_teamWithId,
        list_all_player,
        list_all_team,
        create_a_player,
        create_a_team,
        setTempScore,
        getReadyStatedMatch,
        getTeamNameWithId,
        getNumberOfTeams,
        verifyIfAPlayerExist
    } = require("../controllers/tournoisController.js");

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

    app.route('/readyState')
        .get(getReadyStatedMatch)

    app.route('/team')
        .get(getTeamNameWithId)

    app.route('/numberOfTeams')
        .get(getNumberOfTeams)

    app.route('/verifyIfPlayerExist')
        .post(verifyIfAPlayerExist)
}