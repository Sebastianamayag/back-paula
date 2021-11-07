const express=require('express');
const app=express();
const cors=require('cors');
app.set('port',process.env.PORT || 4000);
app.use(express.json({limit:'15MB'}));
app.use(cors());

app.use(require('./src/routes/UserRoutes'));
app.use(require('./src/routes/ParamsRoutes'));
app.use(require('./src/routes/TaskRoutes'))

app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en el puerto',app.get('port'));
});