const critiqueFreeformService = { 
    getAllFreeforms(knex) {
        return knex.select('*').from('freeformcrits');
    },
    
    insertFreeform(knex, freeFormCrit) {
        console.log(knex, freeFormCrit)
        return knex
            .insert(freeFormCrit)
            .into('freeformcrits')
            .returning('*')
            .then(rows => rows[0]);
    },
}

module.exports = critiqueFreeformService;