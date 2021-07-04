const endpoints = require("./endpoints");
//Server in node to skip cors
endpoints.server.Start();
endpoints.server.GetIDsMarker();
endpoints.server.GetDetailsOfMarker();
endpoints.server.GetTypes();
