
-- 1 What are tracks for a given album?
SELECT song.name FROM track  -- if only track had its own name field
INNER JOIN album
ON album.id = track.album_id
INNER JOIN song
ON track.song_id = song.id
WHERE album.name = 'Moving Pictures'
ORDER BY track.id

-- 2 What are the albums produced by a given artist?
SELECT album.name FROM album
INNER JOIN artist
ON artist.id = album.lead_artist_id
WHERE artist.name = 'Pink Floyd'

-- 3 What is the track with the longest duration?
SELECT song.name FROM track
INNER JOIN song
ON song.id = track.song_id
WHERE track.duration =
(SELECT max(duration) as max FROM track
RIGHT OUTER JOIN song
ON song.id = track.song_id)

-- 4 What are the albums released in the 60s? 70s? 80s? 90s?
SELECT album.name FROM album
WHERE release_year BETWEEN 1980 AND 1989

-- 5 How many albums did a given artist produce in the 90s?
SELECT COUNT(album), artist.name FROM album
INNER JOIN artist
ON artist.id = album.lead_artist_id
WHERE album.release_year BETWEEN 2000 and 2009
GROUP BY artist.name

-- 6 What is each artist's latest album?
SELECT MAX(release_year), album.name, artist.name FROM album
INNER JOIN artist
ON artist.id = album.lead_artist_id
GROUP BY album.name, artist.name

-- 7 List all albums along with its total duration based on summing the duration of its tracks.
SELECT album.name, SUM(track.duration) AS sum FROM track
INNER JOIN album
ON album.id = track.album_id
GROUP BY album.name
ORDER BY sum DESC

-- 8 What is the album with the longest duration?
SELECT album.name, SUM(track.duration) AS sum FROM track
INNER JOIN album
ON album.id = track.album_id
GROUP BY album.name
ORDER BY sum DESC
LIMIT 1
-- 9 Who are the 5 most prolific artists based on the number of albums they have recorded?
SELECT artist.name, COUNT(album.id) FROM album
INNER JOIN artist
ON album.lead_artist_id = artist.id
GROUP BY artist.name
ORDER BY count DESC
LIMIT 5

-- 10 What are all the tracks a given artist has recorded?
SELECT song.name, artist.name FROM track
INNER JOIN artist
ON artist.id = track.artist_id
INNER JOIN song
ON song.id = track.song_id
WHERE artist.name = 'Pink Floyd'
ORDER BY track.id

-- 11 What are the top 5 most often recorded songs?
SELECT COUNT(song.name), song.name FROM song
INNER JOIN cover
ON song.id = cover.song_id
GROUP BY song.name
ORDER BY count DESC
LIMIT 5

-- 12 Who are the top 5 song writers whose songs have been most often recorded?
SELECT COUNT(track), songwriter.name FROM track
INNER JOIN song ON song.id = track.song_id
INNER JOIN songwriter ON songwriter.id = song.songwriter_id
GROUP BY songwriter.name
ORDER BY count DESC
LIMIT 5

-- 13 Who is the most prolific song writer based on the number of songs he has written?
SELECT COUNT(song), songwriter.name FROM song
INNER JOIN songwriter ON songwriter.id = song.songwriter_id
GROUP BY songwriter.name
ORDER BY count DESC
LIMIT 1

-- 14 What songs has a given artist recorded?
SELECT song.name FROM song
INNER JOIN track ON track.song_id = song.id
INNER JOIN artist ON track.artist_id = artist.id
WHERE artist.name = 'Nine Inch Nails'

-- 15 Who are the song writers whose songs a given artist has recorded?
SELECT DISTINCT(songwriter.name) as Songwriter, artist.name as Artist FROM songwriter
INNER JOIN song ON song.songwriter_id = songwriter.id
INNER JOIN track ON track.song_id = song.id
INNER JOIN artist ON track.artist_id = artist.id
WHERE artist.name = 'Pink Floyd'

-- 16 Who are the artists who have recorded a given song writer's songs?
SELECT DISTINCT(artist.name) AS artist, songwriter.name AS songwriter FROM artist
INNER JOIN track ON track.artist_id = artist.id
INNER JOIN song ON track.song_id = song.id
INNER JOIN songwriter ON songwriter.id = song.songwriter_id
WHERE songwriter.name = 'David Gilmour'

-- BONUS 1

-- 1 Given a lead artist, what collaborators has he worked with? Hint: you can
-- give the same table 2 different aliases. For example, a query to find all
-- people you follow would look like `select from "user" as follower, "user" as
-- followee where ...

SELECT collaborator.name FROM collaboration
JOIN artist AS collaborator ON collaboration.collaborator_id = collaborator.id
JOIN artist AS lead_artist ON collaboration.lead_artist_id = lead_artist.id
WHERE lead_artist.name = 'Steven Wilson';



-- 2 Super challenge: given an artist who has worked as a collaborator, who are
-- the other collaborators he has worked with?


-- BONUS 2


-- 1 Get the list of tracks with a violin in it. (You can sub in your instrument of choice)


-- 2 Get the list of tracks with both a harmonica and an accordion. (Again, sub in your instruments of choice)


-- 3 Get the list of vocal tracks.

-- 4 Get the list of instrumental tracks (no vocal).

-- 5Get a list of piano solo tracks (piano and no other instrument).
