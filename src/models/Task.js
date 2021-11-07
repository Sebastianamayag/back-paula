module.exports=(sequelize,type)=>{
    const Task=sequelize.define('Task',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type:type.STRING,
            allownull:false
        },
        grupo:{
            type:type.STRING,
            allownull:false
        },
        horasr:{
            type:type.STRING,
            allownull:false
        },
        horasp:{
            type:type.STRING,
            allownull:false
        },
        estados:{
            type:type.STRING,
            allownull:false
        },
        actividadnp:{
            type:type.STRING,
            allownull:false
        },
        sprint:{
            type:type.STRING,
            allownull:false
        },
        id_usuario:{
            type:type.INTEGER, 
            allownull:false
        }
    },{
        timestamps:false
    })
    return Task;
}