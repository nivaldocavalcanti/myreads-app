import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { Link, Route } from 'react-router-dom'
import Book from './Book'

class BooksApp extends React.Component {
  componentDidMount() {
    this.getBooks();
  }

  state = {
    books: [],
    query: '',
    search: []
  }

  getBooks = () => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books: books
      }))
    })
  }

  changeShelf = (book,shelf) => {
    book.shelf = shelf;
    let books = this.state.books.filter(b=>(b.id !== book.id));
    this.setState(() => ({
      books: [...books,book]
    }))
    BooksAPI.update(book,shelf);
  }

  searchBooks = (query) => {
    this.setState(() => ({
      query: query
    }))
    if(query !== ''){
      BooksAPI.search(query).then(books=>{
        if(books && books.length > 0 && this.state.query !== ''){
          this.setState(() => ({
            search: books
          }))
        } else {
          this.setState(() => ({
            search: []
          }))
        }
      });
    } else {
      this.setState(() => ({
        search: []
      }))
    }
  }

  render() {
    const { books, query, search } = this.state;
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className='close-search'>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.searchBooks(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {search.length !== 0 && search.map(book=>{
                  let match = books.find((b)=>{ return b.id === book.id });
                  book.shelf = match ? match.shelf : null;
                  return (
                    <li key={book.id}>
                      <Book book={book} onUpdateShelf={this.changeShelf} />
                    </li>
                  )  
                })}
              </ol>
            </div>
          </div>
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelfTitle="Currently Reading" books={books.filter(book=>{ return book.shelf === 'currentlyReading' })} onUpdate={this.changeShelf} />
                <BookShelf shelfTitle="Want to Read" books={books.filter(book=>{ return book.shelf === 'wantToRead' })} onUpdate={this.changeShelf} />
                <BookShelf shelfTitle="Read" books={books.filter(book=>{ return book.shelf === 'read' })} onUpdate={this.changeShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp