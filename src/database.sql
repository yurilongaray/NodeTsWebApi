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
    received_data JSON,
    UNIQUE(chapter_code)
);

CREATE TABLE COUNTRY (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    UNIQUE(name)
);

CREATE TABLE MEASUREMENT_UNIT (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    UNIQUE(name)
);

CREATE TABLE LANDING_PLACE (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    resourcefulness_unit VARCHAR,
    UNIQUE(name)
);

CREATE TABLE NCM (
    id SERIAL PRIMARY KEY,
    code BIGINT,
    description VARCHAR,
    statistical_unit NUMERIC,
    UNIQUE(code)
);

CREATE TABLE PRODUCT (
    id SERIAL PRIMARY KEY,
    description VARCHAR,
    measurement_unit_id INT REFERENCES MEASUREMENT_UNIT(id),
    commercial_measurement_id INT REFERENCES MEASUREMENT_UNIT(id),
    ncm_id INT REFERENCES NCM(id),
    statistical_quantity NUMERIC,
    net_weight NUMERIC,
    commercial_quantity NUMERIC,
    unit_value NUMERIC,
    UNIQUE(description)
);

CREATE TABLE SOLICITATION (
    id SERIAL PRIMARY KEY,
    order_number BIGINT,
    aname VARCHAR,
    vmle_dolar NUMERIC,
    vl_freight NUMERIC,
    vl_secure NUMERIC,
    total_product_unit NUMERIC,
    incoterm VARCHAR,
    nat_information VARCHAR,
    dispatch_situation VARCHAR,
    competence_date Timestamp With Time Zone,
    archive_id INT NOT NULL REFERENCES ARCHIVE(id),
    origin_country_id INT REFERENCES COUNTRY(id),
    aquisition_country_id INT REFERENCES COUNTRY(id),
    product_id INT REFERENCES PRODUCT(id),
    landing_place_id INT REFERENCES LANDING_PLACE(id),
    UNIQUE(order_number)
);

-- DELETE FROM SOLICITATION;
-- DELETE FROM PRODUCT;
-- DELETE FROM NCM;
-- DELETE FROM ARCHIVE;
-- DELETE FROM LANDING_PLACE;
-- DELETE FROM COUNTRY;
-- DELETE FROM MEASUREMENT_UNIT;