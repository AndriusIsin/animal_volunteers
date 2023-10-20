CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    Date DATE NOT NULL,
    Time VARCHAR(255) NOT NULL,
Volunteers_id INT,
    FOREIGN KEY (volunteers_id) REFERENCES volunteers(id)
);

INSERT INTO sessions (Date, Time, Volunteers_id)
VALUES ('2023-10-04', 'morning', 1);