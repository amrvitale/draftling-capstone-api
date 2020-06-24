const searchDraftlingsService = {
    getByTitle(knex, title) {
        console.log(title)
        return knex
            .from('draftlings')
            .select('*')
            .where('title', 'ILIKE', title)
    },

    getByGenre(knex, genre) {
        return knex
            .from('draftlings')
            .select('*')
            .where('genre', genre);
    },

    getByWordcount(knex, wordcount) {
        return knex
            .from('draftlings')
            .select('*')
            .where('wordcount', wordcount)
    },

    getAllDraftlings(knex) {
        return knex.select('*').from('draftlings');
    },
}

module.exports = searchDraftlingsService;