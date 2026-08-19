CREATE DATABASE IF NOT EXISTS SalesDB;
USE SalesDB;

CREATE TABLE IF NOT EXISTS Customers (
    CustomerID INT AUTO_INCREMENT,
    FullName VARCHAR(255) NOT NULL,
    Email VARCHAR(255),
    PRIMARY KEY (CustomerID)
);

CREATE TABLE IF NOT EXISTS Orders (
    OrderID INT AUTO_INCREMENT,
    OrderDate DATETIME,
    CustomerID INT,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

INSERT INTO Customers (FullName, Email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com');

INSERT INTO Orders (OrderDate, CustomerID) VALUES
('2026-08-10 10:00:00', 1),
('2026-08-10 11:30:00', 1),
('2026-08-10 14:15:00', 2);

SELECT o.OrderID, o.OrderDate, c.FullName 
FROM Orders o 
INNER JOIN Customers c ON o.CustomerID = c.CustomerID;
