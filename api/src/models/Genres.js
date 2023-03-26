const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "genres",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.ENUM(
          "Action",
          "Indie",
          "Adventure",
          "RPG",
          "Strategy",
          "Shooter",
          "Casual",
          "Simulation",
          "Puzzle",
          "Arcade",
          "Platformer",
          "Racing",
          "Massively Multiplayer",
          "Sports",
          "Fighting",
          "Family",
          "Board Games",
          "Educational",
          "Card"
        ),
        unique: true,
        allowNull: false
      },
    },
    { timestamps: false }
  );
};
