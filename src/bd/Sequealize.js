const Sequelize=require('sequelize');
//import de los modelos
const Model_Usuarios=require('../models/Users');
const Model_Params=require('../models/Params');
const Model_Task=require('../models/Task');
//configuracion de la url de la bd
const sequelize = new Sequelize('bthjfpyzlqydbsyf8auc', 'ufxcucgalo6k3kjr', 'degpTjWVXq2sXkMjeDMo', {
    host: 'bthjfpyzlqydbsyf8auc-mysql.services.clever-cloud.com',
    dialect: 'mysql'
});
//creando la tablas tablas
const Usuarios=Model_Usuarios(sequelize,Sequelize);
const Params=Model_Params(sequelize,Sequelize);
const Task=Model_Task(sequelize,Sequelize);
//sincronizando squelize
sequelize.sync()
    .then(()=>{
        console.log('Tablas creadas');
    })
module.exports={
    Usuarios,
    Params,
    Task
}
