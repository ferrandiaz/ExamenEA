module.exports = function (app) {

    var Object = require('../models/race.js');

    getObjects = function (req, res) {

        Object.find(function (err, objects) {
            if (!objects) {
                res.send(404, 'There are no Objects');
            }
            else {
                if (err) console.log("ERROR: " + err);
                else res.send(200, objects);
            }
        });
    };

    findObject = function (req, res) {

        Object.findOne({"Name": req.params.param}, function (err, object) {

            if (!object) {
                res.send(404, 'Object not Found');
            }
            else {
                if (err) res.send(500, 'Error:' + err);
                else
                    res.send(200, object);
            }
        });
    };
    postObject = function (req, res) {
        var race = new Object({
            Name: req.body.Name,
            Level: req.body.Level,
            Distance: req.body.Distance,
            Date: req.body.Date,
            LocationIni: req.body.LocationIni
        });
        race.save(function (err) {
            if (!err) {
                console.log('Created');
            } else {
                res.send(500, "Mongo Error");
                console.log('ERROR: ' + err);
            }
        });

        res.send(200, race);

    };
    updateObject = function (req, res) {

        Object.findOne({"Name": req.params.param}, function (err, object) {
            if (!object) {
                res.send(404, 'Object Not Found');
            }
            else {
                if (req.body.Name != null) object.Name = req.body.Name;
                if (req.body.Level != null) object.Level = req.body.Level;
                if (req.body.Distance != null) object.Distance = req.body.Distance;
                if (req.body.Date != null) object.Date = req.body.Date;
                if (req.body.LocationIni != null) object.LocationIni = req.body.LocationIni;

                object.save(function (err) {
                    if (err) res.send(500, "Error: " + err);
                    else  res.send(200,object);
                });
            }
        });
    };

    deleteObject = function (req, res) {

        Object.findOne({"Name": req.params.param}, function (err, object) {
            if (!object) {
                res.send(404, 'Object Not Found');
            }
            else {
                object.remove(function (err) {
                    if (err) res.send(500, "Error: " + err);
                    else res.send(200, 'Object Deleted');
                });
            }
        });

    };


    app.get('/examen', getObjects);
    app.post('/examen', postObject);
    app.get('/examen/:param', findObject);
    app.put('/examen/:param', updateObject);
    app.delete('/examen/:param', deleteObject);
};