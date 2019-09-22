-- Baixar o postgres, iniciar ele com o comando sudo service postgresql start
-- Acessar o user postgres: sudo -u postgres -i
-- Digitar psql e então executar os comandos abaixo:

CREATE DATABASE db_project;

\c db_project;

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM node;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO node;

CREATE TABLE ARCHIVE (
    id SERIAL PRIMARY KEY,
    chapter_code VARCHAR(30),
    upload_date Timestamp With Time Zone DEFAULT now() NOT NULL,
    received_data JSON
);

CREATE TABLE COUNTRY (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE MEASUREMENT_UNIT (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE PRODUCT (
    id SERIAL PRIMARY KEY,
    description VARCHAR,
    measurement_unit_id INT REFERENCES MEASUREMENT_UNIT(id),
    commercial_measurement_id INT REFERENCES MEASUREMENT_UNIT(id),
    net_weight NUMERIC,
    unit_value NUMERIC
);

CREATE TABLE LANDING_PLACE (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    resourcefulness_unit VARCHAR
);

CREATE TABLE SOLICITATION (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    product_id INT REFERENCES PRODUCT(id),
    vmle_dolar NUMERIC,
    vl_freight NUMERIC,
    vl_secure NUMERIC,
    commercial_quantity NUMERIC,
    total_product_unit NUMERIC
);

CREATE TABLE NCM (
    id SERIAL PRIMARY KEY,
    archive_id INT NOT NULL REFERENCES ARCHIVE(id),
    ncm_number BIGINT,
    aname VARCHAR,
    code BIGINT,
    code_description VARCHAR,
    origin_country_id INT REFERENCES COUNTRY(id),
    aquisition_country_id INT REFERENCES COUNTRY(id),
    solicitation_id INT REFERENCES SOLICITATION(id),
    statistical_unit NUMERIC,
    statistical_quantity NUMERIC,
    landing_place_id INT REFERENCES LANDING_PLACE(id),
    incoterm VARCHAR,
    nat_information VARCHAR,
    dispatch_situation VARCHAR
);

