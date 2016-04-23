var Fields = require('bookshelf-schema/lib/fields'),
    StringField = Fields.StringField,
    BooleanField = Fields.BooleanField,
    IntField = Fields.IntField,
    EmailField = Fields.EmailField;

var Relations = require('bookshelf-schema/lib/relations'),
    HasMany = Relations.HasMany;

var User = db.Model.extend({ tableName: 'users' }, {
  schema: [
    StringField('username'),
    StringField('password'),
    EmailField('email'),
    StringField('verification'),
    IntField('level'),
    HasMany(Badge)
  ]
});

var Badge = db.Model.extend({ tableName: 'badges' }, {
  schema: [
    StringField('type')
  ]
});

module.exports = {
  User:User,
  Badge:Badge
};
