import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelf extends Component {
    static propTypes = {
        shelfTitle: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    };

    shelves = [
        {val: 'currentlyReading', name: 'Currently Reading'},
        {val: 'wantToRead', name: 'Want to Read'},
        {val: 'read', name: 'Read'},
        {val: 'none', name: 'None'}
    ];

    render() {
        const { shelfTitle, books } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.map(book=>(
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select defaultValue={book.shelf}>
                                            <option value="move" disabled>Move to...</option>
                                            {this.shelves.map((shelf,index)=>(
                                                <option key={index} value={shelf.val}>{shelf.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                {book.authors.map((author, index)=>(<div key={index} className="book-authors">{author}{index === 0 && ','}</div>))}
                            </div>
                        </li>
                    ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;