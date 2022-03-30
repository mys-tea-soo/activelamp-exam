module.exports = {
    HOST: "localhost:8080",
    USER: "root",
    PASSWORD: "123456",
    DB: "active_lamp_exam",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };