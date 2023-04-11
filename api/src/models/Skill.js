const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('skill', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        breedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        force: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        agility: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        loyalty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        affectivity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
        { timestamps: false }
    );
};