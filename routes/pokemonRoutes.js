import express from "express";

export default function setupPokemonRouter(db) {
    const router = express.Router();

    //GET all pokemon route
    router.get("/", function(_req, res) {
        res.status(200).json({
            success: true,
            pokemon: db.data.pokemon
        });
    });

    //GET one pokemon route
    router.get("/:pokemon", function(req, res) {
        const name = req.params.pokemon;

        const monIndex = db.data.pokemon.findIndex(mon => mon.name === name);

        res.status(200).json({
            success: true,
            pokemon: db.data.pokemon[monIndex]
        });
    });

    //POST new pokemon
    router.post("/", function(req, res) {
        db.data.pokemon.push({
            name: req.body.name
        });

        db.write();

        res.status(200).json({
            success: true
        });
    });

    //PUT different pokemon name
    router.put("/:pokemon", function(req, res) {
        const name = req.params.pokemon;

        const monIndex = db.data.pokemon.findIndex(mon => mon.name === name);

        db.data.pokemon[monIndex].name = req.body.name;

        db.write();

        res.status(200).json({
            success: true
        });
    });

    //DELETE a pokemon
    router.delete("/:pokemon", function(req, res) {
        const name = req.params.pokemon;

        const monIndex = db.data.pokemon.findIndex(mon => mon.name === name);

        db.data.pokemon.splice(monIndex, 1);

        db.write();

        res.status(200).json({
            success: true
        });
    });

    return router;
}