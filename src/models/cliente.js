import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize) => {
    class Cliente extends Model {
        static associate(models) {
            Cliente.hasMany(models.Alquiler, {
                foreignKey: 'clienteId',
            });
        }
    }

    Cliente.init({
        nombre: {
            type: DataTypes.STRING

        },
        correo: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,

        },
        numLic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Cliente',
        tableName: 'clientes',
        hooks: {
            beforeCreate: async (cliente) => {
                const salt = await bcrypt.genSalt(10);
                cliente.password = await bcrypt.hash(cliente.password, salt);
            },
            beforeUpdate: async (cliente) => {
                if (cliente.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    cliente.password = await bcrypt.hash(cliente.password, salt);
                }
            }
        }
    });

    return Cliente;
};