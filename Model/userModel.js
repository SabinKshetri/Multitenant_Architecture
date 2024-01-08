module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      currentOrgNumber:{
        type:DataTypes.INTEGER,
        allowNull:true
      },
   
      
    });
    return user;
  };