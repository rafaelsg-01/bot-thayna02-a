update tusuarioswpp
set desblockdb = '0'
where id = '199'
limit 1;

update cursos
set nome = 'PHP', ano = '2015'
where idcurso = '4';

update cursos
set nome = 'Java', carga = '40', ano = '2015'
where idcurso = '4';

update cursos
set ano = '2050', carga = '800'
where ano = '2018'
limit 1;

delete from cursos
where idcurso = '8';

delete from cursos
where ano = '2018'
limit 3;

truncate table cursos;

select * from tusuarioswpp;