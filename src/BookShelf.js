import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = ({ shelfTitle, books, onUpdate }) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
            {books.map(book=>(
                <li key={book.id}>
                    <Book book={book} onUpdateShelf={onUpdate} />
                </li>
            ))}
            </ol>
        </div>
    </div>
);

BookShelf.propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
};


export default BookShelf;