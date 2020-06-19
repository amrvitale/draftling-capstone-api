const draftlingService = {

    editDraftling(knex, id, newDraftling) {
        return knex('draftlings')
            .where( { id })
            .edit(newDraftling)
    }
};

module.exports = draftlingService;