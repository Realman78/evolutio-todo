import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../config/db'

interface TodoAttributes {
    id?: string;
    text: string;
    done?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}


class Todo extends Model<TodoAttributes> implements TodoAttributes {
    public id!: string;
    public text!: string;
    public done!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Todo.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'todos'
});

export default Todo