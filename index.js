const { query } = require("express");
const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()) // =>req.body

//ROUTES//

//get all somethings
app.get("/somethings", async (req, res) =>{
    try{
        const allSomethings = await pool.query("SELECT * FROM something");

        res.json(allSomethings.rows)
    }catch(err){
        console.error(err.message);
    }
});

//get a something
app.get("/somethings/:id", async (req, res) =>{
    const { id } = req.params;
    try {
        const something  = await pool.query("SELECT * FROM something WHERE something_id = $1", [id]);

        res.json(something.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//create a something
app.post("/somethings", async(req, res)=>{
    try{
        //await
        const {description} = req.body;
        const newSomething = await pool.query("INSERT INTO something (description) VALUES ($1) RETURNING *",
        [description]
        );
        res.json(newSomething.rows[0]);
    }
    catch(err){
        console.error(err.message)
    }
});
//update a something
app.put("/somethings/:id", async (req, res) =>{
    try {
        const {id} = req.params; //WHERE
        const {description} = req.body //SET

        const updateSomething = await pool.query("UPDATE something SET description = $1 WHERE something_id = $2", [description, id]);

        res.json("something was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//delete a something
app.delete("/somethings/:id", async (req, res) =>{
    try {
        const{id} = req.params;
        const deleteSomething = await pool.query("DELETE FROM something WHERE something_id = $1", [id]);

        res.json("something was successfuly deleted");
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () =>{
    console.log("server is listening on port 5000");
});