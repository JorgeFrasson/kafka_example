CREATE TABLE public.customer (
	id serial NOT NULL,
	email varchar NOT NULL,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    phone varchar NOT NULL,

    CONSTRAINT customer_pkey PRIMARY KEY (id) 
);

CREATE TABLE public.crm_organization (
    id serial NOT NULL,
    name varchar NOT NULL,

    CONSTRAINT organization_pkey PRIMARY KEY (id)
);

CREATE TABLE public.opportunity (
    id serial NOT NULL,
	customer_id int NOT NULL,
    items json NOT NULL,
    organization_id int NOT NULL,

    CONSTRAINT opportunity_pkey PRIMARY KEY (id),
    CONSTRAINT opportunity_customer_fkey FOREIGN KEY (customer_id) REFERENCES customer(id),
    CONSTRAINT opportunity_organization_fkey FOREIGN KEY (organization_id) REFERENCES crm_organization(id)
);

INSERT INTO public.customer 
(email, first_name, last_name, phone)
VALUES ('example@growth.com', 'Jorge Henrique', 'Frasson', '5527999045823');

INSERT INTO public.crm_organization 
(name)
VALUES ('CRM Shopee');