describe tusuarioswpp;

alter table tusuarioswpp
rename to usuarioswpp;

alter table tusuarioswpp
add column profissao varchar(10) after numerofdb;

alter table tusuarioswpp
modify column profissao varchar(20) not null default '';

alter table tusuarioswpp
change column profissao prof varchar(30);

alter table tusuarioswpp
drop column prof;

select * from pessoas;