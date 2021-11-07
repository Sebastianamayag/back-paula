module.exports=(sequelize,type)=>{
    const Params=sequelize.define('Params',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        nombre_parametro:{
            type:type.STRING,
            allownull:false
        },
        parametro1:{
            type:type.STRING,
            allownull:false
        },
        parametro2:{
            type:type.STRING,
            allownull:false
        },
        parametro3:{
            type:type.STRING,
        },
        parametro4:{
            type:type.STRING,
        },
        parametro5:{
            type:type.STRING,
        },
        parametro6:{
            type:type.STRING,
        },
        parametro7:{
            type:type.STRING,
        },
        parametro8:{
            type:type.STRING,
        }

    },{
        timestamps:false
    })
    return Params;
}