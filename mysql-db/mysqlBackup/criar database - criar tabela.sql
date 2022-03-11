create database usuarioswpp
CHARACTER SET utf8mb4 
COLLATE utf8mb4_0900_ai_ci;

use usuarioswpp;

create table if not exists tusuarioswpp (

	id int not null auto_increment,
	numerocdb varchar(25) not null unique,
    numerofdb varchar(25) not null,
	nomedb varchar(30) default '',
	estadodb varchar(2) default '0',
	novidadesdb boolean default True,
	notificacaodb boolean default True,
    primary key (id)
    
) default charset = utf8mb4;

describe tusuarioswpp;