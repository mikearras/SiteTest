SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `Member`;
DROP TABLE IF EXISTS `Orders`;
DROP TABLE IF EXISTS `CatalogItems`;
DROP TABLE IF EXISTS `OrderCatalogItems`;
DROP TABLE IF EXISTS `ItemData`;
DROP TABLE IF EXISTS `AuthorRecords`;
DROP TABLE IF EXISTS `AuthorItem`;
SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE `Member` (  
`memberID` int(11) NOT NULL AUTO_INCREMENT,  
`firstName` varchar(255) NOT NULL,  
`lastName` varchar(255) NOT NULL, 
PRIMARY KEY (`memberID`)
);




CREATE TABLE Orders (  
orderDate date NOT NULL,  
orderNumber int(11) NOT NULL AUTO_INCREMENT, 
memberID int(11) NOT NULL, 
PRIMARY KEY (orderNumber),
CONSTRAINT memberID FOREIGN KEY (memberID) 
    REFERENCES Member(memberID)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ItemData (
    itemID int AUTO_INCREMENT NOT NULL,
    itemType varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    datePublished DATE NOT NULL,
    PRIMARY KEY (itemID)
);

CREATE TABLE CatalogItems (
    catalogID int AUTO_INCREMENT NOT NULL,
    itemID int NOT NULL,
    checkedOut BOOLEAN NOT NULL,
    checkoutPeriod int(10) NOT NULL,
    PRIMARY KEY (catalogID),
    FOREIGN KEY (itemID) REFERENCES ItemData(itemID)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE OrderCatalogItems (
`catalogID` int(11) NOT NULL,
`orderNumber` int(11) NOT NULL,
CONSTRAINT `catalogID` FOREIGN KEY (`catalogID`) 
     REFERENCES `CatalogItems` (`catalogID`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `orderNumber` FOREIGN KEY (`orderNumber`) 
     REFERENCES `Orders` (`orderNumber`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE AuthorItem (
	`authorID` int(11) NOT NULL,
    `itemID` int(11) NOT NULL,
CONSTRAINT `authorID` FOREIGN KEY (`authorID`) 
     REFERENCES `AuthorRecords` (`authorID`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `itemID` FOREIGN KEY (`itemID`) 
     REFERENCES `ItemData` (`itemID`) ON DELETE CASCADE ON UPDATE CASCADE
);




CREATE TABLE AuthorRecords (
    authorID int AUTO_INCREMENT NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    PRIMARY KEY (authorID)
);







INSERT INTO AuthorRecords (
    firstName,
    lastName
    ) VALUES
("Roxane", "Gay"),
("Amy", "Tan"),
("Yaa", "Gyasi");



INSERT INTO
`Member` (`firstName`, `lastName`)

VALUES
('Steve', 'Jones'),
('Carla', 'Abbot'),
('Mike', 'Harris'),
('Bethany', 'Fleming'),
('Katrina', 'Pitts');




INSERT INTO ItemData (
    itemType,
    title,
    datePublished
    ) VALUES
("Book", "Hunger", "2017-06-13"),
("Book", "Joy Luck Club", "1989-01-19"),
("e-Book", "Homegoing", "2016-06-16");

INSERT INTO AuthorItem (
    authorID,
    itemID
    ) VALUES
(100, "1"),
(200, "2"),
(300, "3");



INSERT INTO CatalogItems (
    itemID,
    checkedOut,
    checkoutPeriod
    ) VALUES
('1', '1', 30),
('2', '0', 30),
('3', '1', 20);

INSERT INTO
`Orders` (`orderDate`, `memberID`)
VALUES
('2021-05-12', 1),
('2020-09-16', 3),
('2019-04-17', 5),
('2017-02-02', 2),
('2019-03-14', 1),
('2021-08-05', 3),
('2020-07-04', 4);

INSERT INTO OrderCatalogItems (
    catalogID,
    orderNumber
    ) VALUES
("10", "1"),
("20", "2"),
("30", "3"),
("10", "4"),
("20", "5"),
("30", "6"),
("10", "7");

SELECT * FROM Member;
SELECT * FROM Orders;
SELECT * FROM CatalogItems;
SELECT * FROM OrderCatalogItems;
SELECT * FROM ItemData;
SELECT * FROM AuthorRecords;
SELECT * FROM AuthorItem;
