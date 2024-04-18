CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `unique_email` UNIQUE (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE Users ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Users
ADD COLUMN updatedAt DATETIME;

ALTER TABLE users ADD COLUMN otp varchar(10);


Alter table users add column isVerified boolean;

