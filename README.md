# LibraryWebApp


## Entities

- Book(_id (string), Title(string), releaseDate(ISO 8601 format date string), pages(Number), quantity(Number), author(Array of author model IDs));

- Author(_id (string), fname(string), lname(string), pseudonym(string), releaseDate(ISO 8601 format date string), deadDate(ISO 8601 format date string), books(Array of books model IDs));

- Librarian(_id (string), fname(string), lname(string), phoneNumber(String), email(String));

- Reader(_id (string), fname(string), lname(string), phoneNumber(String), email(String),orders(Array of orders model IDs));

- Order(_id (string), librarian(librarian model ID), reader(reader model ID), books(Array of books model IDs), returnDate(ISO 8601 format date string),takenDate(ISO 8601 format date string));

## REST API


Framework: Node.js Database: MongoDB

### Book route

- GET /books/ - returns all book objects
- GET /books/{id} - returns one book object
- POST /books/ - creates book object
- POST /books/addAuthors/{bookID} - push author ID to book object with bookID id
- POST /books/removeAuthors/{bookID} - pull author ID from book object with bookID id
- PUT /books/{id} - updates book object
- DELETE /books/{id} - deletes book object

### Author route

- GET /authors/ - returns all author objects
- GET /authors/{id} - returns one author object
- POST /authors/ - creates author object
- POST /authors/addBook/{authorID} - push book ID to author object with authorID id
- POST /authors/removeBook/{authorID} - pull book ID from author object with authorID id
- PUT /authors/{id} - updates author object
- DELETE /authors/{id} - deletes author object

### Librarian route

- GET /librarians/ - returns all librarian objects
- GET /librarians/{id} - returns one librarian object
- POST /librarians/ - creates librarian object
- PUT /librarians/{id} - updates librarian object
- DELETE /librarians/{id} - deletes librarian object

### Reader route

- GET /readers/ - returns all reader objects
- GET /readers/{id} - returns one reader object
- POST /readers/ - creates reader object
- POST /readers/addOrder/{orderID} - push order ID to reader object with orderID id
- POST /readers/removeOrder/{orderID} - pull order ID from reader object with orderID id
- PUT /readers/{id} - updates reader object
- DELETE /readers/{id} - deletes reader object

### Order route

- GET /orders/ - returns all order objects
- GET /orders/{id} - returns one order object
- POST /orders/ - creates order object
- PUT /orders/{id} - updates order object
- DELETE /orders/{id} - deletes order object


## UI


Framework: Angular Design: Material

### Main window

- Menu where you can select book page, order page, reader page;

https://wireframe.cc/pro/pp/f12e0d89a162572#1

### Book page

- List of all books, remove book, add book, place order, search for book, add author to book, remove author from book, update book info;

https://wireframe.cc/pro/pp/f12e0d89a162572#ddziu7u1

### Reader page

- List of all readers, remove reader, add new reader, see reader orders, what books are he taken, update reader info;

https://wireframe.cc/pro/pp/f12e0d89a162572#hmvuzcli

### Author page

- List of all authors, remove author, add new author, see author books, add author books, remove author books, update author info;

https://wireframe.cc/pro/pp/f12e0d89a162572#qwuo99vz

### Librarian page

- List of all librarians, remove librarian, add new librarian, update librarian info;

https://wireframe.cc/pro/pp/f12e0d89a162572#30ff8ch6

### Order page

https://wireframe.cc/pro/pp/f12e0d89a162572#tl50yofw
