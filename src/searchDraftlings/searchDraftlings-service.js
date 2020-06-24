const searchDraftlingsService = {
    getByTitle(knex, title) {
        console.log(title)
        return knex
            .from('draftlings')
            .select('*')
            .where('title', title)
    },

    getByGenre(knex, genre) {
        return knex
            .from('draftlings')
            .select('*')
            .where('genre', genre);
    },

    getByWordcounte(knex, wordcount) {
        return knex
            .from('draftlings')
            .select('*')
            .where('wordcount', wordcount)
    }
}

module.exports = searchDraftlingsService;