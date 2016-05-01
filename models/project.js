var Fields = require('bookshelf-schema/lib/fields'),
    StringField = Fields.StringField,
    BooleanField = Fields.BooleanField,
    IntField = Fields.IntField,
    EmailField = Fields.EmailField;

var Relations = require('bookshelf-schema/lib/relations'),
    HasMany = Relations.HasMany,
    HasOne = Relations.HasOne;
    
module.exports = function project(db){
var Project = require('./project')

var app = require('../app');
var db = app.db;

var Project = db.Model.extend({ tableName: 'projects' }, {
  schema: [
    StringField('name'),
    IntField('difficulty'),
    IntField('completion'),
    StringField('description'),
    StringField('git'),
//    HasMany(require('./account').User),
//    HasOne(require('./account').User)
  ]
});

return Project;
}
