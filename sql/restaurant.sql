CREATE TABLE restaurant (
id SERIAL NOT NULL PRIMARY KEY,
name VARCHAR,
distance REAL,
stars INTEGER,
category VARCHAR,
favorite_dish VARCHAR,
does_takeout BOOLEAN,
last_ate DATE
);
INSERT INTO restaurant VALUES (DEFAULT, 'Cilantros', 21.5, 4, 'Mexican', 'Fajitas', TRUE, '2017-05-12');

INSERT INTO restaurant VALUES (DEFAULT, 'Mellow Mushroom', 27.4, 5, 'Pizza', 'Pesto pizza', TRUE, '2017-04-26');

INSERT INTO restaurant VALUES (DEFAULT, 'Moontower', 0.25, 5, 'Bar', 'Hot dog', FALSE, '2017-05-08');

INSERT INTO restaurant VALUES (DEFAULT, 'PseudoBQ', 1.5, 2, 'BBQ', 'Sandwich', FALSE, '2017-02-12');

INSERT INTO restaurant VALUES (DEFAULT, 'Cheddars', 26, 2, 'American', 'Steak', FALSE, '2017-05-07');

INSERT INTO restaurant VALUES (DEFAULT, '5.Ate', 24, 5, 'American', 'Pizza', FALSE, '2017-03-15');

-- test queries

-- return name of all 5 star restaurants
SELECT name FROM restaurant WHERE stars = 5;

-- return name and dish from all 5 star restaurants
SELECT name, favorite_dish FROM restaurant WHERE stars = 5;

-- return id of restaurant named Cilantros
SELECT id FROM restaurant WHERE name='Cilantros';

-- return name of all BBQ restaurants
SELECT name FROM restaurant WHERE category='BBQ';

-- return name of all restaurants that do takeout
SELECT name FROM restaurant WHERE does_takeout=TRUE;

-- return all pizza restaurants that do takeout
SELECT name FROM restaurant WHERE does_takeout=TRUE AND category='Pizza';

-- return all restaurants within 2 miles
SELECT name FROM restaurant WHERE distance < 2;

-- return all restaurants not eaten at within the last week
SELECT name, last_ate  FROM restaurant WHERE last_ate <= (NOW() - interval '1 week');

-- return all 5 star restaurants not eaten at wthin the last week
SELECT name, last_ate  FROM restaurant WHERE last_ate <= (NOW() - interval '1 week') AND stars = 5;

-- return all restaurants sorted by distance
SELECT name, distance FROM restaurant ORDER BY distance;

-- return 2 closest restuanrats
SELECT name, distance FROM restaurant ORDER BY distance LIMIT 2;

-- return 2 highest starred restaurants
SELECT * FROM restaurant ORDER BY stars DESC LIMIT 2;

-- return 2 highest starred restaurants within 2 miles
SELECT * FROM restaurant WHERE distance < 2 ORDER BY stars DESC LIMIT 2;

-- count number of restuanrats in table
SELECT COUNT(*) FROM restaurant;

-- count number of restaurants sorted by category
SELECT category, COUNT(*) AS count FROM restaurant GROUP BY category;

-- return avg star count by category
SELECT category, AVG(stars) as Average FROM restaurant GROUP BY category;

-- return max star rating within category
SELECT category, MAX(stars) as Average FROM restaurant GROUP BY category;
