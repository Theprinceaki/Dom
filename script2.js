const input = document.querySelector('input');
const items = document.querySelector('#items');          // e.g. <div id="items"></div>

input.addEventListener('keyup', () => {
    const query = input.value.trim();
    if (query.length > 2) {
        searchbooks(query);
    }
});

async function searchbooks(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    displaybooks(data.docs);
}

function displaybooks(books) {
    items.innerHTML = '';
    if (!books || !books.length) return;
    books.slice(0, 10).forEach(book => {
        const card = document.createElement('div');
        card.classList.add('title');
        card.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author_name?.[0] ?? 'unknown'}</p>
            <p><strong>first published:</strong> ${book.first_published_year ?? '?'}</p>`;
        items.appendChild(card);
    });
}