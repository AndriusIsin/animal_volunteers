CREATE TABLE volunteers (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Phone VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL
);

INSERT INTO volunteers (Name, Phone, Email)
VALUES ('Adam Smith', '123-456-7999', 'smith@example.com');