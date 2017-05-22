CREATE TABLE artist (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE album (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  release_year INTEGER,
  lead_artist_id INTEGER REFERENCES artist (id),
);

CREATE TABLE track (
  id SERIAL PRIMARY KEY,
  name VARCHAR REFERENCES song (name),
  duration REAL,
  artist_id INTEGER REFERENCES artist (id),
  album_id INTEGER REFERENCES album (id),
  songwriter_id INTEGER REFERENCES songwriter (id),
  song_id INTEGER REFERENCES song(id)

);

CREATE TABLE song (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  songwriter_id INTEGER REFERENCES songwriter (id)
);

CREATE TABLE songwriter (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE instrument (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE instrument_on_track (
  id SERIAL PRIMARY KEY,
  instrument_id INTEGER REFERENCES instrument (id),
  track_id INTEGER REFERENCES track (id)
);

CREATE TABLE cover (
  id SERIAL PRIMARY KEY,
  artist_id INTEGER REFERENCES artist (id),
  song_id INTEGER REFERENCES song (id),
  album_id INTEGER REFERENCES album (id)
);

CREATE TABLE collaborator (
  id SERIAL PRIMARY KEY,
  album_id INTEGER REFERENCES album (id),
  collaborator_id INTEGER REFERENCES artist (id)
);
