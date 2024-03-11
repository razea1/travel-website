CREATE TABLE vacations (
  idVacation INT AUTO_INCREMENT PRIMARY KEY,
  destination varchar(255) NOT NULL,
  description varchar(500) NOT NULL,
  dateStart datetime NOT NULL,
  dateEnd datetime NOT NULL,
  price int NOT NULL,
  img varchar(5000) NOT NULL,
  PRIMARY KEY (`idVacation`),
  UNIQUE KEY `id_vacation_UNIQUE` (`idVacation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


======================================================================

CREATE TABLE siteUsers (
  id int NOT NULL AUTO_INCREMENT,
  user_name varchar(45) NOT NULL DEFAULT 'na',
  user_lastname varchar(45) NOT NULL,
  user_email varchar(90) NOT NULL DEFAULT 'na',
  password varchar(45) DEFAULT 'na',
  role varchar(45) NOT NULL DEFAULT 'user', 
   user_create datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  UNIQUE KEY `user_lastname_UNIQUE` (`user_lastname`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
==========================================================================


CREATE TABLE Followers (
  id int NOT NULL AUTO_INCREMENT,
  user_code int NOT NULL,
  vacation_code int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_code` (`user_code`),
  KEY `vacation_code` (`vacation_code`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_code`) REFERENCES `siteUsers` (`id`),
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacation_code`) REFERENCES `vacations` (`idVacation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

===============================================================================


INSERT INTO `vacations` (`id_vacation`, `destination`, `description`, `date_start`, `date_end`, `price`, `img`) VALUES
(1, 'athena', 'Discover the ancient marvels and vibrant energy of Athens, Greece, as you immerse yourself in its rich history, iconic landmarks, and delicious Greek cuisine.', '2023-07-16 00:00:00', '2023-07-23 00:00:00', 129, 'https://cdn.britannica.com/66/102266-050-FBDEFCA1/acropolis-city-state-Greece-Athens.jpg'),
(2, 'bodrum', 'Escape the clutches of boredom and dive into a whirlwind of excitement and adventure as you explore new horizons and embrace endless possibilities.', '2023-07-16 00:00:00', '2023-07-23 00:00:00', 125, 'https://www.he.kayak.com/rimg/himg/4d/46/c4/ice-366829-98088333-481806.jpg?width=1366&height=768&crop=true&watermarkposition=lowerright'),
(3, 'zakynthos', 'Experience the beauty of Zakynthos as you immerse yourself in turquoise waters, soak up the sun on pristine beaches, and discover the enchanting charm of this Greek island paradise.', '2023-07-17 00:00:00', '2023-07-23 00:00:00', 115, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f9/57/zakynthos.jpg?w=700&h=500&s=1'),
(4, 'peloponnisos', 'Embark on a captivating odyssey through the Peloponnese, where ancient ruins, golden beaches, and rugged mountains converge to create an unforgettable Greek adventure.', '2023-07-16 00:00:00', '2023-07-20 00:00:00', 115, 'https://www.gtp.gr/MGfiles/location/image11258[8685].jpg'),
(5, 'triest italy', 'Discover the captivating blend of history, culture, and scenic beauty in Trieste, Italy, as you wander through charming streets, savor local cuisine, and soak in the breathtaking views of the Adriatic Sea', '2023-07-18 00:00:00', '2023-07-25 00:00:00', 115, 'https://i.guim.co.uk/img/media/1556f1ff84ebec0baf2d6795015f6c2188daa5a5/0_17_4900_2940/master/4900.jpg?width=1200&quality=85&auto=format&fit=max&s=949050efb7350e034c569baf893e85e9'),
(6, 'crete', 'Immerse yourself in the enchanting island of Crete, where ancient myths come alive amidst stunning landscapes, sun-drenched beaches, and vibrant local traditions, creating a journey of discovery and relaxation', '2023-07-17 00:00:00', '2023-07-23 00:00:00', 129, 'https://a.cdn-hotels.com/gdcs/production170/d1541/37153966-167c-4334-9b81-823d6ffce6dd.jpg'),
(7, 'Mykonos', 'Indulge in the glamorous allure of Mykonos, Greece, where the vibrant nightlife, pristine beaches, and iconic windmills set the stage for an unforgettable Mediterranean escape filled with luxury, beauty, and endless summer vibes', '2023-07-17 00:00:00', '2023-07-21 00:00:00', 135, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/81/2d/63/caption.jpg?w=700&h=-1&s=1&cx=1800&cy=1199&chk=v1_4611867f8269144c4d23'),
(8, 'rhodes', 'Step into a world of ancient wonders and sun-soaked beaches on the island of Rhodes, Greece, where medieval grandeur, crystal-clear waters, and captivating history merge to create an unforgettable Mediterranean getaway', '2023-07-17 00:00:00', '2023-07-21 00:00:00', 129, 'https://www.greeka.com/photos/dodecanese/rhodes/hero/rhodes-island-1920.jpg'),
(9, 'chania crete', 'Experience the charming blend of Venetian elegance, turquoise waters, and warm hospitality in Chania, Crete, where picturesque old town streets, scenic harbors, and breathtaking sunsets create a captivating journey of relaxation and discovery', '2023-07-24 00:00:00', '2023-08-01 00:00:00', 149, 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Aerial_view_of_the_Old_Venetian_Harbour_in_Chania%2C_Greece.jpg'),
(10, 'burgas', 'Immerse yourself in the coastal allure of Burgas, Bulgaria, where sandy beaches, lively promenades, and vibrant cultural scenes combine to create an unforgettable seaside escape on the shores of the Black Sea', '2023-07-18 00:00:00', '2023-07-25 00:00:00', 175, 'https://content.r9cdn.net/rimg/dimg/5b/82/4dfb8538-city-41616-162daf637f9.jpg?width=1200&height=630&xhint=1145&yhint=806&crop=true'),
(11, 'karapthos', 'Embark on an authentic Greek adventure in Karpathos, where untouched natural beauty, traditional villages, and pristine beaches await, offering a tranquil escape and a glimpse into the soul of the Aegean', '2023-07-17 00:00:00', '2023-07-23 00:00:00', 159, 'https://www.greeka.com/photos/dodecanese/karpathos/hero/karpathos-island-1920.jpg'),
(12, 'marmaris', 'Embark on a coastal retreat to Marmaris, Turkey, where azure waters, sun-kissed beaches, and a lively atmosphere create the perfect holiday destination. Explore the charming marina, indulge in Turkish cuisine, and enjoy water sports and boat trips along the stunning coastline, offering a blend of relaxation, adventure, and Turkish hospitality.', '2023-07-18 00:00:00', '2023-07-25 00:00:00', 159, 'https://d3rh2tj1l6igzv.cloudfront.net/uploads/2022/08/Hero-Image-2.jpg');
