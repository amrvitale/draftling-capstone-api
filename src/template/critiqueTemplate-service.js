const critiqueTemplateService = { 

  insertTemplate(knex, templateCrit) {
  return knex
      .insert(templateCrit)
      .into('templatedcrits')
      .returning('*')
      .then(rows => rows[0]);
},
}

module.exports = critiqueTemplateService;