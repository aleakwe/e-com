// Auction listing logic.
// Production version should fetch auction data from PHP endpoints.
async function loadAuctions() {
  const response = await fetch("php/auctions/get.php");
  if (!response.ok) throw new Error("Unable to load auctions.");
  return response.json();
}
