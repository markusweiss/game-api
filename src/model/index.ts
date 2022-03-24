import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface DataAttributes {
    id: string;
    title: string;
    completed: boolean;
}

export class DataInstance extends Model<DataAttributes> {}

DataInstance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize: db,
        tableName: 'TestTable'
    }
);
