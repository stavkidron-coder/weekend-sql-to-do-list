CREATE TABLE todos (
    "id" serial PRIMARY KEY,
    "task" varchar NOT NULL,
    "completed_status" boolean Default FALSE
);

-- DUMMY TEST

INSERT INTO todos ("task")
VALUES ('Walk the dog');