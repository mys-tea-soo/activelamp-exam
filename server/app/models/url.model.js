module.exports = (sequelize, Sequelize) => {
    const Url = sequelize.define("urls", {
      id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      full_address: {
        type: Sequelize.STRING
      },
    });
    return Url;
  };