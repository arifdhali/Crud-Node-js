const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const connection = require('./db/db-config');

app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(`${__dirname}/public`)));
app.use(express.static(path.join(`${__dirname}/views`)));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    connection.query("SELECT * FROM student_details", (err, result) => {
        if (err) {
            return res.status(404).json({ message: err.message });
        } else {
            res.render("index", { result });
        }
    })
})

app.get("/create", (req, res) => {
    res.render('create');
})
// create
app.post("/create", (req, res) => {
    const { name, classs, roll, email, number } = req.body;
    if (!name || !classs || !roll) {
        return res.status(404).json({ error: "Please enter required field" });
    }
    let sql = 'INSERT INTO student_details(name,classs,roll,email,phone) values(?,?,?,?,?)';
    connection.query(sql, [name, classs, roll, email, number], (err, result) => {
        if (err) {
            console.log("Error on inserting data:", err);
            return res.status(500).json({ errorMsg: "Error on database", error: true, });
        } else {
            console.log('Data successfully inserted:', result);
            res.render("create");
        }
    })

})

// read
app.get("/read", (req, res) => {
    connection.query("SELECT * FROM student_details", (err, result) => {
        if (err) {
            return res.status(404).json({ message: err.message });
        } else {
            res.render("index", { result });
        }
    })
})

// delete
app.get("/delete/:id", (req, res) => {
    let deletSql = 'DELETE FROM student_details WHERE id=?;'
    connection.query(deletSql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(404).json({ message: err.message });
        } else {
            res.redirect("/");
        }
    })
})

app.post("/update-data", (req, res) => {
    const { name, classs, roll, email, phone, hidden_id } = req.body;
    let sql = 'UPDATE student_details SET name = ?, classs = ?, roll = ?, email = ?, phone = ? WHERE id = ?';
    connection.query(sql, [name, classs, roll, email, phone, hidden_id], (err, result) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).json({ error: "Error updating data" });
        } else {
            console.log('Data successfully updated:', result);
            res.redirect("/");
        }
    });
});

// update
app.get("/update", (req, res) => {
    let updateId = req.query.id;
    let sql = 'SELECT * FROM student_details WHERE id = ?';
    connection.query(sql, [updateId], (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Error fetching data" });
        } else {
            newData = JSON.parse(JSON.stringify(result[0]));
            res.render('update', { newData });
        }
    });
});




const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running at http://localhost:${PORT}`);
})
