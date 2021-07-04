const express = require("express");
const config = require("./config");
var app = (module.exports = express());
app.use(express.json());
const path = require("path");
const fetch = require("node-fetch");

module.exports.server = {
  path: path,
  app: app,
  express: express,

  Start: function () {
    const port = config.PORT;
    app.listen(port, "0.0.0.0", () =>
      console.log("Servidor para cors, en puerto : " + port + " ")
    );
  },
  GetIDsMarker: function () {
    //Forward Data from the endpoint to the react client

    app.get("/markers/:city", (req, res) => {
      console.log("Get ids of City");
      var url =
        "https://www.spotahome.com/api/public/listings/search/markers/" +
        req.params.city;
      fetch(url)
        .then((res) => res.json())
        .then((json) => res.send(json));
    });
  },
  GetDetailsOfMarker: function () {
    //Forward Data from the endpoint to the react client

    app.get("/markers/ids/:ids", (req, res) => {
      console.log("Get Info Homecards of ids");
      var url =
        `https://www.spotahome.com/api/public/listings/search/homecards_ids?ids[]=` +
        req.params.ids;
      fetch(url)
        .then((res) => res.json())
        .then((json) => res.send(json));
    });
  },
  GetTypes: function () {
    app.get("/getApartments_types/:city/:option", (req, res) => {
      const optionChoose = req.params.option;
      const cityChoose = req.params.city;
      console.log("Get apartments types of city and Option Choose");
      var url =
        `https://www.spotahome.com/api/public/listings/search/markers/` +
        cityChoose +
        `?type[]=` +
        optionChoose;
      fetch(url)
        .then((res) => res.json())
        .then((json) => res.send(json));
    });
  },
};
