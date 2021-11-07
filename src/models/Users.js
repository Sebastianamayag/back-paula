module.exports=(sequelize,type)=>{
    const User=sequelize.define('User',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type:type.STRING,
            allownull:false
        },
        username:{
            type:type.STRING,
            allownull:false
        },
        password:{
            type:type.STRING,
            allownull:false
        },
        tipo:{
            type:type.STRING,
            allownull:false
        }
    },{
        timestamps:false
    })
    return User;
}