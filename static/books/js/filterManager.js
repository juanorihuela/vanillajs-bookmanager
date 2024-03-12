import BookManager from './bookManager.js';


// Filter
class FilterManager {
    constructor(books) {
        this.bookManager = new BookManager();
        this.activeFilter = null;
        this.books = books;
        this.genres = [];
    }

    // Extract Genres from book
    extractGenres() {
        this.books.forEach(book => {
            book.genre.forEach(item => {
                // validate if genre name is registered
                let valData = this.genres.find(g => g.id == item.id);
                if(!valData){
                    this.genres.push(item);
                }
            });
        })
    }

    // Template Element
    createTemplateElement() {
        // genre menu
        let ul = document.getElementById('genre_list');

        // all genres by default
        let all = document.createElement('a');
        all.appendChild(document.createTextNode('Todos'));
        all.classList.add('filtro-item');
        all.classList.add('active', 'disabled');
        all.setAttribute('data-filter', 'all');
        
        this.activeFilter = all;
        ul.appendChild(all);

        // add genres to list
        this.genres.forEach(genre => {
            let ahref = document.createElement('a');
            ahref.appendChild(document.createTextNode(genre.name));
            ahref.classList.add('filtro-item');
            ahref.setAttribute('data-filter', genre.id);

            ul.appendChild(ahref);
        });
    }

    // Filter
    createBooksByGenre() {
        let genre_id = this.activeFilter.getAttribute('data-filter');
        let result = null;

        // all
        if (genre_id == 'all'){
            result = this.books;
        } else {
            result = this.books.filter(book => {
                return book.genre.some(genre => genre.id === parseInt(genre_id));
            });
        }
        
        // clean container & create elements
        this.bookManager.cleanContainer();
        result.forEach(book => {
            this.bookManager.createTemplateElements(book);
        });
    }

    // Handle Click Event
    handleFilterClick(clickedFilter) {
        // add class active
        if (this.activeFilter) {
            this.activeFilter.classList.remove('active', 'disabled');
        }
        clickedFilter.classList.add('active', 'disabled');
        this.activeFilter = clickedFilter;

        // create books
        this.createBooksByGenre();
    }

    // Add Events
    addFilterEventListeners() {
        let filter_items = document.querySelectorAll('.filtro-item')
        filter_items.forEach(filter_item => {

            // click
            filter_item.addEventListener('click', () => {
                // handle click event
                this.handleFilterClick(filter_item);
            });

        });
    }

    // init
    init() {
        this.extractGenres();

        // Create Elements
        this.createTemplateElement();
        this.addFilterEventListeners();

        this.createBooksByGenre();
    }
}

export default FilterManager;
