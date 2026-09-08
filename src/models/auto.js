import {Model, DataTypes} from 'sequelize';

export default (sequelize) => {
    class Auto extends Model {
        static associate(models) {
            Auto.hasMany(models.Alquiler, {
                foreignKey: 'autoId',
            });
        }
    }

    Auto.init({
        marca: {
            type: DataTypes.STRING
        },
        modelo: {
            type: DataTypes.STRING
        },
        imagen: {
            type: DataTypes.STRING
        },
        valorAlquiler: {
            type: DataTypes.FLOAT
        },
        anio: {
            type: DataTypes.STRING
        },
        disponibilidad: {
            allowNull: false,
            defaultValue: 1,
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'Auto',
        tableName: 'autos',
    });

    return Auto;
}