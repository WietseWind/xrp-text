-- Create syntax for TABLE 'transactions'
CREATE TABLE `transactions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(11) unsigned DEFAULT NULL,
  `type` enum('TEXTIN','TEXTOUT','DEPOSIT','WITHDRAW','TRANSFER') COLLATE utf8_bin NOT NULL DEFAULT 'TRANSFER',
  `moment` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `from` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `to` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `message` varchar(320) COLLATE utf8_bin DEFAULT NULL,
  `responsetype` enum('HELP','BALANCE','DEPOSIT') COLLATE utf8_bin DEFAULT NULL,
  `transaction` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `amount` decimal(20,6) DEFAULT NULL,
  `valid` int(1) unsigned NOT NULL DEFAULT '0',
  `twofactor` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  KEY `type` (`type`),
  KEY `moment` (`moment`),
  KEY `from` (`from`),
  KEY `to` (`to`),
  KEY `message` (`message`),
  KEY `transaction` (`transaction`),
  KEY `amount` (`amount`),
  KEY `valid` (`valid`),
  KEY `twofactor` (`twofactor`),
  KEY `responsetype` (`responsetype`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Create syntax for TABLE 'users'
CREATE TABLE `users` (
  `phone` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT '',
  `tag` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `wallet` varchar(35) COLLATE utf8_bin NOT NULL DEFAULT '',
  `balance` decimal(20,6) NOT NULL DEFAULT '0.000000',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tag`),
  UNIQUE KEY `phone` (`phone`),
  KEY `wallet` (`wallet`),
  KEY `balance` (`balance`),
  KEY `created` (`created`),
  KEY `updated` (`updated`)
) ENGINE=MyISAM AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;