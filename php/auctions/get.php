<?php
declare(strict_types=1);
header('Content-Type: application/json');
require_once __DIR__ . '/../config/database.php';

$stmt = $pdo->query(
    'SELECT id, title, category, current_bid, bid_count, ends_at, image_url
     FROM auctions
     WHERE status = "active" AND ends_at > NOW()
     ORDER BY ends_at ASC'
);

echo json_encode(['success' => true, 'auctions' => $stmt->fetchAll()]);
