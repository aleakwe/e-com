<?php
declare(strict_types=1);
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../config/database.php';

if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    exit(json_encode(['success' => false, 'message' => 'You must be logged in to bid.']));
}

$data = json_decode(file_get_contents('php://input'), true) ?? [];
$auctionId = (int)($data['auction_id'] ?? 0);
$amount = (float)($data['amount'] ?? 0);

if ($auctionId <= 0 || $amount <= 0) {
    http_response_code(422);
    exit(json_encode(['success' => false, 'message' => 'A valid auction and bid amount are required.']));
}

try {
    $pdo->beginTransaction();

    // Lock the auction row so two bids cannot overwrite each other.
    $stmt = $pdo->prepare(
        'SELECT id, current_bid, min_increment, ends_at, status
         FROM auctions WHERE id = ? FOR UPDATE'
    );
    $stmt->execute([$auctionId]);
    $auction = $stmt->fetch();

    if (!$auction || $auction['status'] !== 'active' || strtotime($auction['ends_at']) <= time()) {
        throw new RuntimeException('This auction has ended.');
    }

    $minimum = (float)$auction['current_bid'] + (float)$auction['min_increment'];
    if ($amount < $minimum) {
        throw new RuntimeException('Bid must be at least ₦' . number_format($minimum, 2));
    }

    $stmt = $pdo->prepare(
        'INSERT INTO bids (auction_id, user_id, amount) VALUES (?, ?, ?)'
    );
    $stmt->execute([$auctionId, $_SESSION['user_id'], $amount]);

    $stmt = $pdo->prepare(
        'UPDATE auctions SET current_bid = ?, bid_count = bid_count + 1 WHERE id = ?'
    );
    $stmt->execute([$amount, $auctionId]);

    $pdo->commit();

    echo json_encode(['success' => true, 'current_bid' => $amount]);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
