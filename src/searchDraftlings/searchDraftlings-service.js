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

    searchDraftlings(knex, title=null, genre=null, wordcount=null) {
        console.log('title', title);
        console.log('genre', genre);
        console.log('wordcount', wordcount);
        let results = knex
            .from('draftlings')
            .select('*');
        if (title != null) results = results.where('title', 'ILIKE', `%${title}%`);
        if (genre != null) results = results.where('genre', 'ILIKE', `%${genre}%`);
        if (wordcount != null) results = results.where('wordcount', 'ILIKE', `%${wordcount}%`);
        return results;
    },
}

module.exports = searchDraftlingsService;