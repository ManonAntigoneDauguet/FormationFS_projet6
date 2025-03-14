INSERT INTO `USERS` (`username`, `email`, `password`) VALUES
('Maleficent', 'maleficent@mdd.com', '$2a$10$CqdSB2qIPXts6i22pqC1zulMYO6vZKo/2u5Hlx0RxDXsFjBD8DzrG'),
('Ursula', 'ursula@mdd.com', '$2a$10$CqdSB2qIPXts6i22pqC1zulMYO6vZKo/2u5Hlx0RxDXsFjBD8DzrG'),
('Scar', 'scar@mdd.com', '$2a$10$CqdSB2qIPXts6i22pqC1zulMYO6vZKo/2u5Hlx0RxDXsFjBD8DzrG'),
('Jafar', 'hades@mdd.com', '$2a$10$CqdSB2qIPXts6i22pqC1zulMYO6vZKo/2u5Hlx0RxDXsFjBD8DzrG'),
('Captain Hook', 'hook@mdd.com', '$2a$10$CqdSB2qIPXts6i22pqC1zulMYO6vZKo/2u5Hlx0RxDXsFjBD8DzrG');

INSERT INTO `TOPICS` (`name`, `content`) VALUES
('Intelligence Artificielle', 'L\'Intelligence Artificielle donne aux machines des capacités humaines, comme la reconnaissance d\'image et les algorithmes prédictifs. Omniprésente, elle est fascinante mais aussi inquiétante, en constante évolution et parfois imprévisible.'),
('Sécurité Informatique', 'La Sécurité Informatique est un combat entre hackers et experts. Chaque oubli de mot de passe ou mise à jour ignorée est une porte ouverte aux pirates. Cryptographie et firewalls sont nos armes contre les failles.'),
('Développement Web', 'Le Développement Web est un défi de compatibilité entre navigateurs capricieux. HTML, CSS et JavaScript sont les outils, mais les versions obsolètes et l\'évolution des standards rendent chaque projet compliqué.'),
('Blockchain', 'La Blockchain promet transparence et sécurité, mais aussi des arnaques et des spéculations. Elle fonctionne sans autorité centrale pour valider les transactions, mais elle présente de nouveaux risques.'),
('Cloud Computing', 'Le Cloud Computing permet de stocker des données à distance, offrant flexibilité et accessibilité. Mais cela entraîne des préoccupations de confidentialité et une dépendance accrue aux géants du numérique.');

INSERT INTO `USER_TOPIC_SUBSCRIPTIONS` (`user_id`, `topic_id`) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 3);

INSERT INTO `POSTS` (`title`, `content`, `user_id`, `topic_id`, `created_at`) VALUES
('La domination de l\'intelligence artificielle', 'L\'intelligence artificielle est la clé pour gouverner le monde. Elle peut surpasser l\'humanité et rendre les humains obsolètes. Avec de puissants algorithmes, je régnerai sur tout !', 1, 1, '2022-01-01 16:32:04.789463'),
('L\'art de la manipulation des données', 'L\'information est le pouvoir, et la manipulation des données est l\'outil pour conquérir. Les entreprises sont vulnérables, et il faut exploiter leurs failles pour dominer.', 2, 2, '2022-01-01 17:51:04.789463'),
('Pourquoi le développement web est une arme secrète', 'Le développement web est plus qu\'un simple code. C\'est un moyen de créer des applications qui peuvent dominer l\'infrastructure informatique mondiale. Si vous maîtrisez ce domaine, vous avez le contrôle total.', 3, 3, '2021-01-01 17:51:04.789463'),
('Blockchain : la révolution des méchants', 'Le concept de Blockchain est fascinant. Il nous permet de sécuriser des transactions sans passer par les autorités centralisées. Imaginez ce que nous pourrions faire avec une telle technologie.', 4, 4, '2024-01-01 17:51:04.789463'),
('Pourquoi le Cloud Computing va changer le monde', 'Les données sont le futur, et le cloud est la clé pour les centraliser et les rendre accessibles partout. En contrôlant les serveurs dans le cloud, vous contrôlez le monde numérique.', 5, 5, '2024-12-10 17:51:04.789463');

INSERT INTO `COMMENTS` (`content`, `user_id`, `post_id`, `created_at`) VALUES
('L\'IA peut vraiment changer la donne, mais il faut être prudent. Tout pouvoir doit être contrôlé.', 2, 1, '2022-02-01 16:32:04.789463'),
('La sécurité est cruciale. Si l\'IA est mal utilisée, elle pourrait détruire l\'infrastructure informatique que nous construisons.', 1, 1, '2022-03-01 16:32:04.789463'),
('La Blockchain peut être utilisée pour des fins maléfiques, c\'est certain. Elle est décentralisée et incontrôlable, ce qui est parfait pour une révolution.', 3, 4, '2024-02-01 16:32:04.789463'),
('Je pense que le Cloud Computing est trop risqué. Vous ne savez jamais vraiment où vos données sont stockées.', 4, 5, '2024-12-15 16:32:04.789463');