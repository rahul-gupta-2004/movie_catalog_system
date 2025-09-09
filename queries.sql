-- Create movies table
CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    director TEXT NOT NULL,
    genre TEXT NOT NULL,
    release_year INTEGER NOT NULL,
    rating REAL NOT NULL
);

-- Insert into movies
INSERT INTO movies (title, director, genre, release_year, rating) VALUES
('Avengers', 'ABCD', 'Action', 2012, 4.6),
('Mission Impossible', 'DEFG', 'Action', 2000, 4.4),
('Kungfu Panda', 'XYZ', 'Kids', 2010, 4.3),
('Cars', 'ABCD', 'Kids', 2015, 4.5),
('Hangover', 'DEFG', 'Comedy', 2003, 4.6);

SELECT * FROM movies;