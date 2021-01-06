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

  shelves = [
    {val: 'currentlyReading', name: 'Currently Reading'},
    {val: 'wantToRead', name: 'Want to Read'},
    {val: 'read', name: 'Read'}
  ];

  getBooks = async () => {
    const books = await BooksAPI.getAll();
    this.setState({ books });
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
        <Route path='/search'>
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
        </Route>
        <Route exact path='/'>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.shelves.map((shelf,index)=>(
                  <BookShelf key={index} shelfTitle={shelf.name} books={books.filter(book=>{ return book.shelf === shelf.val })} onUpdate={this.changeShelf} />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        </Route>
      </div>
    )
  }
}

export default BooksApp