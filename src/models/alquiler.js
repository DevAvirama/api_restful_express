import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Alquiler extends Model {
    static associate(models) {
      Alquiler.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
      Alquiler.belongsTo(models.Auto, { foreignKey: 'autoId' });
    }
  }

  Alquiler.init({
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
    clienteId: DataTypes.INTEGER,
    autoId: DataTypes.INTEGER,
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'activo'
    }
  }, {
    sequelize,
    modelName: 'Alquiler',
    tableName: 'alquiler'
  });

  return Alquiler;
};