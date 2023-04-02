import { DataTypes, Model } from 'sequelize';
import db from '.';
// import Matches from './MatchesModel';

class Teams extends Model {
  declare readonly id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'team_name',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

// Teams.hasMany(Matches, { foreignKey: 'team_id', as: 'team_id' });

export default Teams;
