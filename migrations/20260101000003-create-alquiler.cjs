'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('alquiler', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fechaInicio: { type: Sequelize.DATE },
            fechaFin: { type: Sequelize.DATE },
            clienteId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'clientes', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            autoId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'autos', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            estado: {
                allowNull: false,
                defaultValue: 'activo',
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('alquiler');
    }
};