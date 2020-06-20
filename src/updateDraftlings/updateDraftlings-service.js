const updateDraftlingsService = {

    getById(knex, id) {
        return knex
            .from('draftlings')
            .select('*')
            .where('id', id).first();
    },

    editDraftling(knex, id, newDraftling) {
        return knex('draftlings')
            .where( { id })
            .edit(newDraftling)
    }
};

module.exports = updateDraftlingsService;