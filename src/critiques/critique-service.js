const critiqueService = { 
    getAllFreeforms(knex) {
        return knex.select('*').from('freeformcrits');
    },
    
    insertFreeform(knex, freeformCrit) {
        console.log(knex, freeformCrit)
        return knex
            .insert(freeformCrit)
            .into('freeformcrits')
            .returning('*')
            .then(rows => rows[0]);
    },

    getAllTemplates(knex) {
        return knex.select('*').from('templatedcrits');
    },

    insertTemplate(knex, templateCrit) {
        return knex
            .insert(templateCrit)
            .into('templatedcrits')
            .returning('*')
            .then(rows => rows[0]);
      },
}

module.exports = critiqueService;