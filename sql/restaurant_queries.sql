
-- 1  List all the reviews for a given restaurant given a specific restaurant ID.
SELECT * FROM restaurant
INNER JOIN review
ON review.restaurant_id = restaurant.id
WHERE restaurant.id = 2; -- id here can change

-- 2  List all the reviews for a given restaurant, given a specific restaurant name.
SELECT * FROM restaurant
INNER JOIN review
ON review.restaurant_id = restaurant.id
WHERE restaurant.name = 'Cilantros';

-- 3  List all the reviews for a given reviewer, given a specific author name.
SELECT * FROM reviewer
INNER JOIN review
ON review.reviewer_id = reviewer.id
WHERE reviewer.name = 'Erik';


-- 4  List all the reviews along with the restaurant they were written for. In
-- the query result, select the restaurant name and the review text.
SELECT restaurant.name, review.review FROM restaurant
INNER JOIN review
ON review.restaurant_id = restaurant.id


-- 5  Get the average stars by restaurant. The result should have the restaurant
-- name and its average star rating.
SELECT restaurant.name, AVG(review.stars) AS avg_stars FROM restaurant
INNER JOIN review
ON restaurant.id = review.restaurant_id
GROUP BY restaurant.name;

-- 6  Get the number of reviews written for each restaurant. The result should
-- have the restaurant name and its review count.
SELECT restaurant.name, count(review) AS avg_stars FROM restaurant
INNER JOIN review
ON restaurant.id = review.restaurant_id
GROUP BY restaurant.name;

-- 7  List all the reviews along with the restaurant, and the reviewer's name.
-- The result should have the restaurant name, the review text, and the reviewer name. Hint: you will need to do a three-way join - i.e. joining all three tables together.
SELECT restaurant.name, reviewer.name, review.review FROM restaurant
INNER JOIN review
ON restaurant.id = review.restaurant_id
INNER JOIN reviewer
ON reviewer.id = review.reviewer_id
ORDER BY restaurant.name;

-- 8  Get the average stars given by each reviewer. (reviewer name, average star
-- rating)
SELECT reviewer.name, AVG(review.stars) FROM reviewer
INNER JOIN review
ON review.reviewer_id = reviewer.id
GROUP BY reviewer.name
ORDER BY avg DESC;

-- 9  Get the lowest star rating given by each reviewer. (reviewer name, lowest
-- star rating)
SELECT DISTINCT(reviewer.name), MIN(review.stars) AS min FROM reviewer
RIGHT OUTER JOIN review
ON review.reviewer_id = reviewer.id
GROUP BY reviewer.name
ORDER BY min

-- 10  Get the number of restaurants in each category. (category name,
-- restaurant count)
SELECT DISTINCT(restaurant.category), COUNT(restaurant) FROM restaurant
GROUP BY restaurant.category
ORDER BY count DESC

-- 11  Get number of 5 star reviews given by restaurant. (restaurant name,
-- 5-star count)
SELECT DISTINCT(restaurant.name), COUNT(review.stars) FROM restaurant
INNER JOIN review
ON review.restaurant_id = restaurant.id
WHERE review.stars = 5
GROUP BY restaurant.name, review.stars

-- 12  Get the average star rating for a food category. (category name,
-- average star rating)
SELECT restaurant.category, AVG(review.stars) AS avg_stars FROM restaurant
INNER JOIN review
ON review.restaurant_id = restaurant.id
GROUP BY restaurant.category
ORDER BY avg_stars DESC
