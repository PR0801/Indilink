module.exports = {
  HOST: "localhost",
  USER: "root",///techsphere
  PASSWORD: "123456",//SIH1757
  DB: "temp",
  dialect: "mysql",
  charset: "utf8mb4",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
