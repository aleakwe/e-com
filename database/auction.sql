CREATE DATABASE IF NOT EXISTS bidly
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bidly;

CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('buyer','seller','admin') NOT NULL DEFAULT 'buyer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auctions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  seller_id INT UNSIGNED NOT NULL,
  title VARCHAR(180) NOT NULL,
  category VARCHAR(80) NOT NULL,
  description TEXT,
  starting_bid DECIMAL(15,2) NOT NULL,
  current_bid DECIMAL(15,2) NOT NULL,
  min_increment DECIMAL(15,2) NOT NULL DEFAULT 10000,
  bid_count INT UNSIGNED NOT NULL DEFAULT 0,
  image_url VARCHAR(500),
  ends_at DATETIME NOT NULL,
  status ENUM('active','ended','cancelled') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES users(id)
);

CREATE TABLE bids (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  auction_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (auction_id) REFERENCES auctions(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_auction_created (auction_id, created_at),
  INDEX idx_user_created (user_id, created_at)
);
