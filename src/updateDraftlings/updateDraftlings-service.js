
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
       console.log('in the publish function')
        return knex('draftlings')
        .where('id', id)
        .update({status: 'published'})
    }
};

module.exports = updateDraftlingsService;