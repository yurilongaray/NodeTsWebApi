CREATE TABLE ARCHIVE (
    id SERIAL PRIMARY KEY,
    chapter INT,
    date Timestamp With Time Zone DEFAULT now() NOT NULL,
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
    description VARCHAR(30),
    measurement_unit_id INT REFERENCES MEASUREMENT_UNIT(id),
    commercial_measurement_id INT REFERENCES MEASUREMENT_UNIT(id),
    net_weight NUMERIC,
    unit_value NUMERIC
);

CREATE TABLE LANDING_PLACE (
    id SERIAL PRIMARY KEY,
    name VARCHAR(300),
    resourcefulness_unit VARCHAR(300)
);

CREATE TABLE NCM (
    id SERIAL PRIMARY KEY,
    archive_id INT NOT NULL REFERENCES ARCHIVE(id),
    number INT,
    name VARCHAR(300),
    code INT,
    code_description VARCHAR(300),
    origin_country_id INT REFERENCES COUNTRY(id),
    aquisition_country_id INT REFERENCES COUNTRY(id),
    product_id INT REFERENCES PRODUCT(id),
    statistical_unit NUMERIC,
    statistical_quantity NUMERIC,
    landing_place_id INT REFERENCES LANDING_PLACE(id),
    incoterm VARCHAR(300),
    nat_information VARCHAR(300),
    dispatch_situation VARCHAR(300)
);

CREATE TABLE SOLICITATION (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    vmle_dolar NUMERIC,
    vl_freight NUMERIC,
    vl_secure NUMERIC,
    commercial_quantity NUMERIC,
    total_product_unit NUMERIC
);