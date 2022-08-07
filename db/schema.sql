DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties; 
/*This will drop/delete the tables every time you run the schema.sql file, ensuring that you start with a clean slate.*/

CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);
/*We've added a new line to the table called a constraint. This allows us to flag the party_id field as an official foreign key and tells SQL which table and field it references. 
In this case, it references the id field in the parties table. This ensures that no id can be inserted into the candidates table if it doesn't also exist in the parties table. MySQL will return an error for any operation that would violate a constraint.*/

CREATE TABLE parties (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);