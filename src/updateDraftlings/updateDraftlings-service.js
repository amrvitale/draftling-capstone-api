
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
            .update(newDraftling)
    },

   publishDraftling(knex, id) {
        return knex('draftlings')
        .where('id', id)
        .update({status: 'published'})
    }
};

module.exports = updateDraftlingsService;