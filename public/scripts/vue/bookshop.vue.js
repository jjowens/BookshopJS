const app = new Vue({
    el: '#app',
    mounted: function() {
        this.preload();
    },
    data: {
        title: "Meh",
        books: [],
        genres: [],
        authors: [],
        filteredGenres: []
    },
    methods: {
        preload: function(event) {
            fetch("data/books.json")
            .then(response => response.json())
            .then(data => (this.parseData(data)))
        },
        parseData: function(data) {
            this.books = data.books;

            let tempGenres = [];
            let tempAuthors = [];

            this.books.forEach(element => {
                element.genres.forEach(genre => {
                    if (tempGenres.indexOf(genre) === - 1) {
                        tempGenres.push(genre);
                    }
                });

                element.authors.forEach(author => {
                    if (tempAuthors.indexOf(author) === - 1) {
                        tempAuthors.push(author);
                    }
                });

                this.genres = tempGenres;
                this.authors = tempAuthors;

            });
        }
     },
    computed: {
        orderAuthorsByLastName: function() {
            return this.authors.sort((a,b) => {
                if(a.lastname < b.lastname) return -1;
                if(a.lastname > b.lastname) return 1;
                return 0;
            });
        },
        orderGenres: function() {
            return this.genres.sort((a,b) => {
                if(a < b) return -1;
                if(a > b) return 1;
                return 0;
            });
        },
        orderBooksByTitle: function() {
            return this.books.sort((a,b) => {
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
                return 0;
            });
        }
    }
});