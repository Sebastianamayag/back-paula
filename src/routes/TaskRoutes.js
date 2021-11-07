const express = require("express");
const app = express();
const { Task,Params } = require("../bd/Sequealize");
app.get('/task/all/:id',(req,res)=>{
    Task.findAll({where:{id_usuario:req.params.id}}).then((task) => {
        res.status(200).json({ task });
    });
});

app.get('/task/one/:id',async(req,res)=>{
    const taskid = req.params.id
    if (taskid) {
        const task = await Task.findOne({ where: { id: taskid }, attributes: { exclude: ['grupo','sprint']}})
        if (task) {
            res.status(200).json({task });
        }
        else {
            res.status(400).json({ "error": `No se ha encontrado la tarea con el id: ${taskid}` })
        }
    } else {
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
});

app.post('/create/task',async(req,res)=>{
    Task.create(req.body);
    res.status(200).json({ success: "Tarea creada correctamente" });
});

app.put('/edit/task/:id',async(req,res)=>{
    const task=await Task.findOne({ where: { id: req.params.id } });
    if(task){
        Task.update(
            {
                horasr:req.body.horasr,
                horasp:req.body.horasp,
                estados:req.body.estados,
                actividadnp:req.body.actividadnp
            },
            { 
                where: 
                {
                    id: req.params.id
                }
            }
        ).then(() => { res.json({ mensaje:'Tarea Actualizada'});}
        ).catch((error) => { throw new Error(error)});
    }else{
        res.status(400).json({error:"No se ha encontrado la tarea"})
    }
})

app.delete("/task/delete/:id", async (req, res) => {
    if (req.params.id) {
        const task = await Task.findOne({ where: { id: req.params.id } });
        if (task) {
            task.destroy().then(() => {
                res.status(200).json({ mensaje: "Task Eliminado" });
            });
        }
        else {
            res.status(400).json({ error: "No se ha podido encontrar el Task" });
        }
    } else {
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})


module.exports = app;