let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');
let cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./api/routes/route'); //importing route
routes(app); //register the route


app.listen(port);


console.log('Tournament RESTful API server started on: ' + port);