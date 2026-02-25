const title=document.querySelector('title');
const input=document.querySelector('input');
const items=document.querySelectorAll('item');

input.addEventListener('keyup', ()=>{
    const query = input.value.trim();
    if(query.length > 2){
        searchbooks(query);
    }
});


async function searchbooks(query){
    const url=`https://openlibrary.org/search.json?q${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    displaybooks(data.docs);
}