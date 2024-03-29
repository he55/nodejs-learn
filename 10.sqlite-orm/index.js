import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'db.sqlite'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
const User = sequelize.define('User', {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20),
  });
  
  const users = await User.findAll();
  console.log(users)
  debugger


(async function(){

    try {
       
    } catch (error) {
        console.log(error)
    }
   
    
})()
