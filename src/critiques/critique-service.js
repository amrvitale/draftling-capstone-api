const critiqueService = { 
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