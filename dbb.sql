create database swipehire;

create table users (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `email` varchar(255) not null,
    `password` varchar(255) not null,
    `like-list` text,
    PRIMARY KEY (`id`)
) engine=InnoDB AUTO_INCREMENT=10 default charset=utf8;

CREATE TABLE jobs (
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `companyname` VARCHAR(255),
    `jobtypedetail` VARCHAR(255),
    `businessdetail` TEXT,
    `salary_y_min` INT(11),
    `salary_y_max` INT(11),
    `workingtype` VARCHAR(255),
    `workingplace` VARCHAR(255),
    `workingtime` VARCHAR(100),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) engine=InnoDB AUTO_INCREMENT=20 default charset=utf8;

insert into jobs (companyname, jobtypedetail, businessdetail, salary_y_min, salary_y_max, workingtype, workingplace, workingtime) values ('test大手自動車部品製造グルー プ会社', '成形機オペレーター【3交 替】', '〇成形機オペレーター、検査、梱包をお任せいたします。', 10000, 20000, '派遣', '群馬県桐生市', '08:00～17:00/16:00～01:00/00:00～09:00');