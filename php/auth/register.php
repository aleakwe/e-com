<?php
declare(strict_types=1);
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../config/database.php';

$data = json_decode(file_get_contents('php://input'), true) ?? [];
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) {
    http_response_code(422);
    exit(json_encode(['success' => false, 'message' => 'Name, valid email and an 8+ character password are required.']));
}

$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    http_response_code(409);
    exit(json_encode(['success' => false, 'message' => 'Email is already registered.']));
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
$stmt->execute([$name, $email, $hash]);

session_regenerate_id(true);
$_SESSION['user_id'] = (int)$pdo->lastInsertId();

echo json_encode(['success' => true, 'message' => 'Account created.']);
