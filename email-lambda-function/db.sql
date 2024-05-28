CREATE EXTENSION citext;

CREATE TABLE email (
    time timestamp NOT NULL DEFAULT NOW(),
    email CITEXT NOT NULL, 
    ip INET);
    
CREATE UNIQUE INDEX email_idx ON email (email);