const critiqueFreeformService = { 
    getAllFreeforms(knex) {
        return knex.select('*').from('freeformcrits');
    },
    
    insertFreeform(knex, freeformcrit) {
        return knex
            .insert(freeformcrit)
            .into('freeformcrits')
            .returning('*')
            .then(rows => rows[0]);
    },
}

module.exports = critiqueFreeformService;