import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    };
    
    shelves = [
        {val: 'currentlyReading', name: 'Currently Reading'},
        {val: 'wantToRead', name: 'Want to Read'},
        {val: 'read', name: 'Read'},
        {val: 'none', name: 'None'}
    ];

    updateShelf = (event) => {
        let newShelf = event.target.value;
        this.props.onUpdateShelf(this.props.book,newShelf);
    }

    render() {
        const {book} = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : 'https://via.placeholder.com/128x193/?text=NO+COVER'})` }}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={book.shelf ? book.shelf : 'none'} onChange={this.updateShelf}>
                            <option value="move" disabled>Move to...</option>
                            {this.shelves.map((shelf,index)=>(
                                <option key={index} value={shelf.val}>{shelf.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && book.authors.map((author, index)=>(<div key={index} className="book-authors">{author}{(index === 0 && book.authors.length > 1) && ','}</div>))}
            </div>
        );
    }
}

export default Book;