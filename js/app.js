
// Spinner Toggle
const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.display = displayStyle;
}

// Books Data Loading
const loadBooks = () =>{
    const searchText = document.getElementById('input-field').value;
   // show spinner
    toggleSpinner('block');
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
     fetch(url)
    .then(res =>res.json())
    .then( data => displayBooks(data.docs.slice(0,20)));
     
}

// Total Found Books
const loadFound = () =>{
    const searchText = document.getElementById('input-field').value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res =>res.json())
    .then( data => displayFoundResult(data));
    document.getElementById('input-field').value ='';

}
// Display Total Found Results
const displayFoundResult = (total) =>{
    const foundResult = document.getElementById('found-result');
    foundResult.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <p>Total Books Founds: ${total.numFound}</p>
    `;
    foundResult.appendChild(div);
    // Hide Spinner
    toggleSpinner('none');
}

// Display Books
const displayBooks = (books) =>{
  
  const displayBooks = document.getElementById('display-book')
  displayBooks.textContent = '';
 
  if(!books){
    const input = document.getElementById('found-result');
    const p = document.createElement('p');
    p.classList.add('text-danger');
    p.innerText = 'No Result Found';
    input.appendChild(p);
  }
  else{
    books.forEach(book =>{

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-75 p-3 shadow">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i: `Not Available`}-M.jpg" class="card-img-top h-50 mb-4 rounded" alt="...">
            <h5 class="card-title text-primary">Book Name: ${book.title}</h5>
            <p class="card-text text-primary">Publish Date: ${book.publish_date === undefined ? `Not Available `: book.publish_date[0]}</p>
            <p class="text-primary">Author Name: ${book.author_name ? book.author_name:'Not Available'}</p>
           
        </div>
        `;
    displayBooks.appendChild(div);
    });
   
  }
}
