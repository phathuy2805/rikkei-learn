USE LibraryDB;

SELECT * FROM Books WHERE PublishedYear > 2020;

SELECT * FROM Books WHERE Author = 'Nguyen Van A' OR Title LIKE 'Lập trình%';

SELECT * FROM Books ORDER BY PublishedYear DESC, Title ASC LIMIT 2;
