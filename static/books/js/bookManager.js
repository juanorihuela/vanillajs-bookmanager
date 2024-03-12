// Books
class BookManager {
    constructor() {
        this.books_container = document.getElementById('books_container');
    }

    // Create Book Element
    createTemplateElements(book) {
        // image
        function createImage(image_url) {
            let image = document.createElement('img');
            image.src = image_url;
            image.classList.add('card-img-top');
            image.setAttribute('alt', 'book_image');

            return image;
        }

        // content
        function createGenres(genres) {
            let div_genre = document.createElement('div');

            genres.forEach(genre => {
                let span = document.createElement('span');

                span.classList.add('badge');
                span.classList.add('text-bg-' + genre.color);
                span.appendChild(document.createTextNode(genre.name));

                div_genre.appendChild(span);
            });

            return div_genre;
        }
        function createContent(title, genre, author) {
            // container
            let book_container = document.createElement('div');
            book_container.classList.add('card-body');
            book_container.classList.add('text-center');

            // title
            let h3 = document.createElement('h3');
            h3.appendChild(document.createTextNode(title));

            book_container.appendChild(h3);

            // genre
            let genre_element = createGenres(genre);

            book_container.appendChild(genre_element);

            // separator
            let hr = document.createElement('hr');
            book_container.appendChild(hr);

            // author
            author.forEach(item => {
                let h5 = document.createElement('h5');
                h5.appendChild(document.createTextNode(item));
                h5.classList.add('card-title');
                h5.classList.add('mb-2');

                book_container.appendChild(h5);
            });

            return book_container;
        }

        // container
        function createContainer(image, content) {
            let card = document.createElement('div');
            card.classList.add('card');

            card.appendChild(image);
            card.appendChild(content);

            let ahref = document.createElement('a');
            ahref.classList.add('book_link');
            ahref.setAttribute('data-bs-toggle', 'modal');
            ahref.setAttribute('data-bs-target', '#book_modal');

            ahref.appendChild(card);

            let col = document.createElement('div');
            col.classList.add('col-md-4');
            col.classList.add('col-sm-6');
            col.classList.add('col-12');
            col.classList.add('mb-4');

            col.appendChild(ahref);

            return col;
        }

        /*
         * Create elements
        */

        let image = createImage(book.image);
        let content = createContent(book.name, book.genre, book.author);
        let container = createContainer(image, content);

        this.books_container.appendChild(container);
    }

    cleanContainer() {
        this.books_container.innerHTML = '';
    }
}

export default BookManager;
