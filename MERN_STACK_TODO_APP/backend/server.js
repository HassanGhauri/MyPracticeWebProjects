require('dotenv').config()
const express = require("express");
const mongoose  = require("mongoose");
const Person = require("./models/personModel")
const Task = require("./models/taskModel")
const cors = require("cors")
const app = express()

app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


app.get("/",async(req,res)=>{
    const persons = await Person.find({})

    res.status(200).json(persons)
})

app.get("/tasks",async(req,res)=>{
    const tasks = await Task.find({})

    res.status(200).json(tasks)
})
app.post("/tasks",async(req,res)=>{
    const {value} = req.body
    try{
        const new_task = await Task.create({value})
        res.status(200).json(new_task)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
})

app.get("/:id",async(req,res)=>{
    const {id} = req.params
    const person = await Person.findById(id)
   
    res.status(200).json(person)
})

app.post("/",async(req,res)=>{
    const {name,age,profession,password} = req.body
    try{
        const person = await Person.create({name,age,profession,password})
        res.status(200).json(person)
    } catch(error){
        res.status(400).json({error:error.message})
    }
})

app.post("/login",async(req,res)=>{
    const {name,password} = req.body
    const persons = await Person.findOne({name:name,password:password})
    if(persons){
        let {_id} = persons 
        res.status(200).json({name,password,_id})
    }
    else{
        res.status(400).json({mssg:"error"})
    }
    
})


app.delete("/:id",async(req,res)=>{
    const {id} = req.params

    const person = await Person.findByIdAndDelete({_id:id})
    res.status(200).json(person)
})

app.patch("/:id",async(req,res)=>{
    const {id} = req.params

    const person = await Person.findByIdAndUpdate({_id:id},{
        ...req.body
    })
    res.status(200).json(person)
})



mongoose.connect(process.env.db_url)
    .then(()=>{
        app.listen(4000,()=>{
            console.log("Connected to port 4000")
        })
    })
    .catch((error)=>{
        console.log(error)
    })
  