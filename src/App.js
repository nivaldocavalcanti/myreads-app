import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  componentDidMount() {
    this.getBooks();
  }

  state = {
    books: []
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
    let books = this.state.books.map(b=>{ if(b.id === book.id) b.shelf = shelf; return b; });
    this.setState(() => ({
      books: books
    }))
    BooksAPI.update(book,shelf);
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className='close-search'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
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
                <BookShelf shelfTitle="Currently Reading" books={this.state.books.filter(book=>{ return book.shelf === 'currentlyReading' })} onUpdate={this.changeShelf} />
                <BookShelf shelfTitle="Want to Read" books={this.state.books.filter(book=>{ return book.shelf === 'wantToRead' })} onUpdate={this.changeShelf} />
                <BookShelf shelfTitle="Read" books={this.state.books.filter(book=>{ return book.shelf === 'read' })} onUpdate={this.changeShelf} />
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