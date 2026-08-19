USE LibraryDB;

SELECT * FROM Books;

INSERT INTO Books (Title, Author, PublishedYear) VALUES
('To Kill a Mockingbird', 'Harper Lee', 1960),
('1984', 'George Orwell', 1949),
('The Great Gatsby', 'F. Scott Fitzgerald', 1925);

SELECT * FROM Books;

UPDATE Books SET PublishedYear = 1950 WHERE BookID = 2;

SELECT * FROM Books;

DELETE FROM Books WHERE BookID = 3;

SELECT * FROM Books;
