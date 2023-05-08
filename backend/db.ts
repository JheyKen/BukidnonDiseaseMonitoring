const db = require('rethinkdbdash')({
    db: "bpdms_database",
    host: "localhost",
    port: 28015
})

export default db