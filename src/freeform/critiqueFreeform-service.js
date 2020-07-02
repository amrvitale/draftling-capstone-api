const critiqueFreeformService = { 
    
    insertFreeform(knex, freeformcrit) {
        return knex
            .insert(freeformcrit)
            .into('freeformcrits')
            .returning('*')
            .then(rows => rows[0]);
    },
}

module.exports = critiqueFreeformService;