require("dotenv").config();
const { Console } = require("console");
const express = require("express");
const App = express();

App.set(("view engine"),("ejs"));
App.use(express.static("public"));

App.get("/", (req, res) => { res.redirect("/HomePage"); });
App.get("/HomePage", (req, res) => { res.render("index"); });






App.use((req,res)=>{res.status(404).render("Error");});

App.listen((process.env.pp),()=>{console.log(`Porting To ${process.env.pp}`);});