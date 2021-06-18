function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}
//we may be able to just run a for loop
//and then run .some on the book.borrows
//idk if this is the most consice way of doing this
function getBooksBorrowedCount(books) {
  let result = 0;
  for(let i = 0; i < books.length; i++){
    const borrows = books[i].borrows;
    const isBookOut = borrows.some(instance => !instance.returned);
    if(isBookOut){
      result++;
    }
  }
  return result;
}

//we need to check if there is an object with the name property of book.genre
//this should be PASSING
function getMostCommonGenres(books) {
  const result = books.reduce((acc, book) => {
    if(acc.some(bk => bk.name === book.genre)){
      for(let i = 0; i < acc.length; i++){
        if(acc[i].name === book.genre){
          acc[i].count++;
        }
      }
    }else{
      acc.push({name: book.genre, count: 1});
    }
    return acc
  }, []);
  result.sort((genreA, genreB) => genreA.count > genreB.count ? -1 : 1);
  return result.slice(0, 5);
}

function getMostPopularBooks(books) {
  const namesAndCount = books.reduce((acc, book) => {
      acc.push({name: book.title, count: book.borrows.length}); 
      console.log(acc);
    return acc
  }, []);
  const result = namesAndCount.sort((bookA, bookB) => bookA.count > bookB.count ? -1 : 1);
  console.log(result);
  return result.slice(0, 5);
  }


function getMostPopularAuthors(books, authors) {
  for(let i = 0; i < authors.length; i++){
    const author = authors[i];
    author["count"] = 0;
    for(let i = 0; i < books.length; i++){
      const book = books[i];
      if(book.authorId === author.id){
        author.count += book.borrows.length;
      }
    }
  }
  const result = authors.map(author => ({name: `${author.name.first} ${author.name.last}`, count: author.count}));
  result.sort((authorA, authorB) => authorA.count > authorB.count ? -1 : 1);
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
