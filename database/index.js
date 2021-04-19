const connection = process.env.MONGODB_CONNECTION;
const categories = require('./categories');
const formTemplates = require('./formTemplates');
const photos = require('./photos');
const tags = require('./tags');
const userRoles = require('./userRoles');
const users = require('./users');

module.exports = {
    ...categories(connection),
    ...formTemplates(connection),
    ...photos(connection),
    ...tags(connection),
    ...userRoles(connection),
    ...users(connection),
}