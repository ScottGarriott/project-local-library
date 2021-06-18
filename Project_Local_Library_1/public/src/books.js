function findAuthorById(authors, id) {
  const result = authors.find(author => author.id === id);
  return result;
}

function findBookById(books, id) {
  const result = books.find(book => book.id === id);
  return result;
}
//need to initialize 2 empty arrays
//then we need to loop through the books
//then we need a book variable and a borrows variable
//then we run the some method on borrows, checking if returned is false
//if it is true, therefor the book has not been returned then 
function partitionBooksByBorrowedStatus(books) {
  let returnedBooks = [];
  let notReturnedBooks = [];
  for(let i = 0; i < books.length; i++){
    const book = books[i];
    const borrows = book.borrows;
    const result = borrows.some(instance => !instance.returned);
    if(result){
      returnedBooks.push(book);
    }else{
      notReturnedBooks.push(book);
    }
  }
  return [returnedBooks, notReturnedBooks];
}
//first we destructure the book into its borrows array
//then we need to loop through all of the objects in the borrows array
//then for each object we create a new object with the appropriate accounts object added on the end
function getBorrowersForBook({borrows} = book, accounts) {
  let results = [];
  for(let i = 0; i < borrows.length; i++){
    let borrowInstance = borrows[i];
    const borrowedId = borrowInstance.id;
    for(let j = 0; j < accounts.length; j++){
      const account = accounts[j];
      if(account.id === borrowedId){
        borrowInstance = {...borrowInstance, ...account};
        results.push(borrowInstance);
      }
    }
  }
  return results.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
