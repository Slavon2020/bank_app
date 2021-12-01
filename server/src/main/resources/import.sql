INSERT into employers (id, address, name ) values (1, 'USA', 'Google');
INSERT into employers (id, address, name ) values (2, 'USA', 'Facebook');
INSERT into employers (id, address, name ) values (3, 'Ukraine', 'Venbest');

INSERT into customers(id, age, email, name) values (1, 30, 'slava@mail.com', 'slava');
INSERT into customers(id, age, email, name) values (2, 25, 'alex@mail.com', 'alex');
INSERT into customers(id, age, email, name) values (3, 43, 'viktor@mail.com', 'viktor');

INSERT into accounts(id, balance, customer_id, number, currency) values (1, 1500, 1, 'accnumber1', 1);
INSERT into accounts(id, balance, customer_id, number, currency) values (2, 10000, 1, 'accnumber2', 0);
INSERT into accounts(id, balance, customer_id, number, currency) values (3, 3250, 1, 'accnumber3', 3);

INSERT into accounts(id, balance, customer_id, number, currency) values (4, 23000, 3, 'accnumber4', 1);
INSERT into accounts(id, balance, customer_id, number, currency) values (5, 4500, 3, 'accnumber5', 2);
INSERT into accounts(id, balance, customer_id, number, currency) values (6, 5700, 2, 'accnumber6', 0);
INSERT into accounts(id, balance, customer_id, number, currency) values (7, 8200, 2, 'accnumber7', 1);