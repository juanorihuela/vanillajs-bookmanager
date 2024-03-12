import PageManager from './pageManager.js';


async function page_manager_init() {
    // init PageManager
    let url = 'http://127.0.0.1:8000/books/api/page-manager/';
    let token = '0f13bb8c06e92ea56969f07ceddf2e8a21b36fc4'
    let pageManager = new PageManager(url, token);
    await pageManager.init();
}
page_manager_init();
