
exports.up = function(knex, Promise) {
    return knex.schema.createTable("cohorts", table => {
        table.increments("id");
        table.string("members");
        table.string("name");
        table.string("logoUrl");
        table.timestamp("createdAt").default(knex.fn.now());
        table.timestamp("updatedAt").default(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("cohorts");
};
