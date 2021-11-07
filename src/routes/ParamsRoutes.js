const express = require("express");
const app = express();
const { Params } = require("../bd/Sequealize");
const { Op } = require("sequelize");
app.get('/params',(req,res)=>{
    Params.findAll().then((params) => {
        res.status(200).json({ params });
      });
});

app.get("/params/:id", async (req, res) => {
    const paramsid = req.params.id
    if (paramsid) {
        const params = await Params.findOne({ where: { id: paramsid } })
        if (params) {
            res.status(200).json({params});
        }
        else {
            res.status(400).json({ "error": `No se ha encontrado el parametro con el id: ${paramsid}` })
        }
    } else {
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
});


app.get("/find/sprint", async (req, res) => {
    const params = await Params.findAll({ where: { nombre_parametro: {[Op.like]: `Sprint%`} } })
    if (params) {
        res.status(200).json({params});
    }
    else {
        res.status(400).json({ "error": `No se han encontrado el sprint : ` })
    }
})

app.get("/find/params/persona/:nombre", async (req, res) => {
    const paramsnombre = req.params.nombre;
    if (paramsnombre) {
        console.log(paramsnombre);
        const params = await Params.findOne({ where: { parametro1:{[Op.like]: `${paramsnombre}%`}  } });
        if (params) {
            res.status(200).json({params});
        }
        else {
            res.status(400).json({ "error": `No se ha encontrado la persona con el nombre: ${paramsnombre}` })
        }
    } else {
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})

app.post('/create/params',async(req,res)=>{
    Params.create(req.body);
    res.status(200).json({ success: "Parametro creado correctamente" });
})

app.put("/change/params/:id", async (req, res) => {
    if(req.body.nombre_parametro){
        const params = await Params.findOne({ where: { id: req.params.id } });
        if (params) {
            Params.update(
                {
                    nombre_parametro: req.body.nombre,
                    parametro1:req.body.parametro1,
                    parametro2: req.body.parametro2,
                    parametro3:req.body.parametro3,
                    parametro4: req.body.parametro4,
                    parametro5:req.body.parametro5,
                    parametro6: req.body.parametro6,
                    parametro7:req.body.parametro7,
                    parametro8: req.body.parametro8
                },
                { 
                    where: 
                    {
                        id: params.id
                    }
                }
            ).then(() => { res.json({ mensaje:'Params Actualizada'});}
            ).catch((error) => { throw new Error(error)});
        } else {
            res.status(400).json({ mensaje:'El Param no Existe' })
        }
    }else{
        res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }
});

app.delete("/params/delete/:id", async (req, res) => {
    if (req.params.id) {
        const params = await Params.findOne({ where: { id: req.params.id } });
        if (params) {
            params.destroy().then(() => {
                res.status(200).json({ mensaje: "Params Eliminado" });
            });
        }
        else {
            res.status(400).json({ error: "No se ha podido encontrar el params" });
        }
    } else {
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})

module.exports = app;
