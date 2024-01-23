//////////////////////////////////////////////////////////////////////////
//                            DATABASE CONNECTION                       //
//////////////////////////////////////////////////////////////////////////

import mongoose from "mongoose";
import config from "../config.js";

const { connect, connection: _connection } = mongoose;
const { DBURL } = config;
connect(DBURL);

let connection = _connection;

connection.on(
  "error",
  console.error.bind(console, "Erreur lors de la connexion")
);
connection.once("open", () => {
  console.log("Connexion à la base OK");
});

export default connection;
