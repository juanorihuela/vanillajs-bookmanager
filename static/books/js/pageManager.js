// Page
class PageManager {
    constructor (url, token) {
        this.url = url;
        this.token = token;
    }

    // Get Data from service
    async fetchData() {
        try {
            let response = await fetch(this.url, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Authorization': 'Token ' + this.token,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
    
            let data = await response.json();
            return data;
        } catch (error) {
            window.alert(`Error al cargar la página: ${error.message}`);
            console.error(error);
        }
    }

    // Create Template elements
    createTemplateElements(data) {
        // banner
        function createBanner(banner) {
            let img = document.createElement('img');
            img.setAttribute('src', banner.image);
            img.setAttribute('alt', 'banner image');
            img.setAttribute('class', 'd-block w-100');

            let image_container = document.getElementById('banner_image_container');
            image_container.appendChild(img);
            
            let title = document.createElement('h1');
            title.appendChild(document.createTextNode(banner.title));
            let subtitle = document.createElement('p');
            subtitle.setAttribute('class', 'd-none d-md-block');
            subtitle.appendChild(document.createTextNode(banner.subtitle));

            let overlay_container = document.getElementById('overlay_container');
            overlay_container.appendChild(title);
            overlay_container.appendChild(subtitle);
        }

        // phrase
        function createPhrase(phrase) {
            let container = document.getElementById('phrase_div');

            let quote = document.createElement('small');
            quote.setAttribute('class', 'quote-text');
            quote.appendChild(document.createTextNode(phrase.quote));

            container.appendChild(quote);

            let book = document.createElement('h2');
            book.setAttribute('class', 'quote-title');
            book.appendChild(document.createTextNode(phrase.book));

            container.appendChild(book);

            let author = document.createElement('small');
            author.setAttribute('class', 'quote-author');
            author.appendChild(document.createTextNode(phrase.author));

            container.appendChild(author);
        }

        /*
         * Create elements
        */

        createBanner(data.page.banner);
        createPhrase(data.page.phrase);
    }

    // init
    async init() {
        // Get data
        let data = await this.fetchData();
        console.log(data);
        // Create template elements
        // this.createTemplateElements(data);
    }
}

export default PageManager;
