const { getBorrowersForBook } = require("./books");

function findAccountById(accounts, id) {
  const result = accounts.find(account => account.id === id);
  return result;
}

function sortAccountsByLastName(accounts) {
  const result = accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1:-1)
  return result;
}
//first we initialize an id variable that is the accounts id
function getTotalNumberOfBorrows(account, books) {
  const id = account.id;
  let result = 0;
  for(let i = 0; i < books.length; i++){
    const borrows = books[i].borrows;
    for(let i = 0; i < borrows.length; i++){
      if(borrows[i].id === id){
      result++;
      }
    } 
  }
    return result
}
function getBooksCheckedout(books, id){
  const booksCheckedOut = books.filter(book => 
  book.borrows[0].id === id && !book.borrows[0].returned);
  return booksCheckedOut;
}

//we need to filter the books array into books that have been checked out by
//the account id
//then we need to loop through that array 
//and then for each item loop through the authors 
//and if the author id = the book's authorsId 
//then we update the book with the author added
function getBooksPossessedByAccount(account, books, authors) {
  const id = account.id;
  const checkedOutBooks = getBooksCheckedout(books, id);
  for(let i = 0; i < checkedOutBooks.length; i++){
    let book = checkedOutBooks[i];
    for(let i = 0; i < authors.length; i++){
      const author = authors[i];
      if(author.id === book.authorId){
        book["author"] = author;
      }
    }
  }
  return checkedOutBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
