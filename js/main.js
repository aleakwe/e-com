// Shared frontend helpers.
// Auction-specific behavior lives in js/auctions.js.
// Authentication UI lives in js/auth.js.
// Bidding UI lives in js/bidding.js.
function formatNaira(amount) {
  return "₦" + new Intl.NumberFormat("en-NG").format(Math.round(amount));
}
