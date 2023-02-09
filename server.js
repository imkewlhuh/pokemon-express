import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import setupPokemonRouter from "./routes/pokemonRoutes.js";

export default async function createServer() {
    const database = new JSONFile("db.json");
    const db = new Low(database);

    await db.read();

    db.data = db.data || { pokemon: [] };

    await db.write();

    const app = express();

    app.use(express.json());
    app.use("/pokemon", setupPokemonRouter(db));

    return app;
};