CREATE TABLE public.customer (
	id serial NOT NULL,
	email varchar NOT NULL,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    phone varchar NOT NULL
);

CREATE TABLE public.opportunity (
    id serial NOT NULL,
	customer_id varchar NOT NULL,
    items json NOT NULL,

    CONSTRAINT opportunity_pkey PRIMARY KEY (id),
    CONSTRAINT opportunity_customer_fkey FOREIGN KEY (customer_id) REFERENCES customer(id)
);