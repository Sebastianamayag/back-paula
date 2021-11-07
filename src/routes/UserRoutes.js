const express = require("express");
const app = express();
const { Usuarios } = require("../bd/Sequealize");
const bcrypt = require('bcryptjs');
app.get('/users',(req,res)=>{
    Usuarios.findAll().then((users) => {
        res.status(200).json({ users });
    });
})

app.get("/users/:id", async (req, res) => {
    const usersid = req.params.id
    if (usersid) {
        const users = await Usuarios.findOne({ where: { id: usersid }, attributes: { exclude: ['password'] } })
        if (users) {
            res.status(200).json({users });
        }
        else {
            res.status(400).json({ "error": `No se ha encontrado el usuario con el id: ${usersid}` })
        }
    } else {
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})


app.put("/password", async (req, res) => {
    if(req.body.username && req.body.password){
        const usuario = await Usuarios.findOne({ where: { username: req.body.username } });
        if (usuario) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            Usuarios.update(
                {
                    password: req.body.password
                },
                { 
                    where: 
                    {
                        username: usuario.username
                    }
                }
            ).then(() => { res.json({ mensaje:'Cuenta Actualizada'});}
            ).catch((error) => { throw new Error(error)});
        } else {
            res.status(400).json({ mensaje:'El Usuario no Existe' })
        }
    }else{
        res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }
});

app.put("/change/user/:id", async (req, res) => {
    if(req.body.username && req.body.nombre && req.params.id){
        const usuario = await Usuarios.findOne({ where: { id: req.params.id } });
        if (usuario) {
            Usuarios.update(
                {
                    username: req.body.username,
                    nombre:req.body.nombre
                },
                { 
                    where: 
                    {
                        id: usuario.id
                    }
                }
            ).then(() => { res.json({ mensaje:'Cuenta Actualizada'});}
            ).catch((error) => { throw new Error(error)});
        } else {
            res.status(400).json({ mensaje:'El Usuario no Existe' })
        }
    }else{
        res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }
});

app.post('/login',async(req,res)=>{
    if(req.body.username && req.body.password){
        const usuario = await Usuarios.findOne({ where: { username: req.body.username } });
        if (usuario){
            const iguales = bcrypt.compareSync(req.body.password, usuario.password);
            if(iguales){
                res.status(200).json({success:"Bienvenido",id:usuario.id,tipo:usuario.tipo});
            }else{
                res.status(400).json({error:"Usuario o Password incorrectos"});
            }
        }else{
            res.status(400).json({ error: 'Usuario o Password incorrectos'})
        }
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
});

app.post('/create',async(req,res)=>{
    if(req.body.nombre && req.body.username && req.body.tipo){
        const usuario = await Usuarios.findOne({ where: { username: req.body.username } });
        if (!usuario){
            Usuarios.create(req.body);
            res.status(200).json({ mensaje: "Usuario Creado correctamente" });
        }else{
            res.status(400).json({ error: 'Error ya hay un usuario creado con ese UserName'})
        }
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})


app.delete("/user/delete/:id", async (req, res) => {
    if (req.params.id) {
        const users = await Usuarios.findOne({ where: { id: req.params.id } });
        if (users) {
            users.destroy().then(() => {
                res.status(200).json({ mensaje: "Usuario Eliminado" });
            });
        }
        else {
            res.status(400).json({ error: "No se ha podido encontrar el usuario" });
        }
    } else {
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})

module.exports = app;
