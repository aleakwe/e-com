// Bidding client.
// Never trust a browser-side bid: PHP must validate the authenticated user,
// auction state and bid amount before writing to MySQL.
async function placeBid(auctionId, amount) {
  const response = await fetch("php/bids/place-bid.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ auction_id: auctionId, amount })
  });
  return response.json();
}
