const searchDraftlingsService = {
    getByTitle(knex, title) {
        console.log(title)
        return knex
            .from('draftlings')
            .select('*')
            .where('title', title).first();
    },

    getByGenre(knex, genre) {
        return knex
            .from('draftlings')
            .select('*')
            .where('genre', genre);
    },

    getByTitleAndGenre(knex, title, genre) {
        return knex
            .from('draftlings')
            .select('*')
            .where('title', title).first()
            .andWhere('genre', genre).first();
    }
}

module.exports = searchDraftlingsService;