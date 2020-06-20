const draftlingService = {
    getAllDraftlings(knex) {
        return knex.select('*').from('draftlings');
    },

    insertDraftling(knex, newDraftling) {
        return knex
            .insert(newDraftling)
            .into('draftlings')
            .returning('*')
            .then(rows => rows[0]);
    },

    getById(knex, id) {
        return knex
            .from('draftlings')
            .select('*')
            .where('id', id).first();
    },

    deleteDraftling(knex, id) {
        return knex('draftlings')
        .where({ id })
        .delete();
    },

   
};

module.exports = draftlingService;