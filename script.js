/* Shared data for items - edit images / texts here */
const ITEMS = {
  rolex: {
    id: 'rolex',
    title: 'Vintage Rolex Submariner',
    desc: 'Rare vintage Rolex Submariner from the 1960s in excellent condition.',
    tag: 'Watches',
    img: 'img/image.png',
    startBid: 30200,
    bids: 47,
    endAt: Date.now() + 1000 * 60 * 60 * 26, // 26 hours from now
    minIncrement: 1000,
    history: [
      { name: 'collector***', amount: 15000, time: '2 minutes ago' },
      { name: 'watch***', amount: 14900, time: '15 minutes ago' },
      { name: 'vintage***', amount: 14800, time: '1 hour ago' }
    ]
  },
  bag: {
    id: 'bag',
    title: 'Louis Vuitton Leather Bag',
    desc: 'Premium Louis Vuitton leather bag.',
    tag: 'Fashion',
    img: 'img/image2.png',
    startBid: 22000,
    bids: 12,
    endAt: Date.now() + 1000 * 60 * 60 * 20, // 20 hours
    minIncrement: 500,
    history: [
      { name: 'fashion***', amount: 15000, time: '5 minutes ago' },
      { name: 'buyer***', amount: 14500, time: '1 hour ago' }
    ]
  },
  sculpture: {
    id: 'sculpture',
    title: 'Antique Sculpture',
    desc: 'Antique wooden sculpture in good condition.',
    tag: 'Collectible',
    img: 'img/image3.png',
    startBid: 48000,
    bids: 6,
    endAt: Date.now() + 1000 * 60 * 60 * 48, // 48 hours
    minIncrement: 1000,
    history: [
      { name: 'artlover***', amount: 35000, time: '10 minutes ago' }
    ]
  },
  Car: {
    id: 'Car',
    title: 'Dodge Charger Vintage',
    desc: 'Dodge Charger Vintage in good condition.',
    tag: 'Cars',
    img: 'img/image4.png',
    startBid: 750000,
    bids: 15,
    endAt: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
    minIncrement: 1000,
    history: [
      { name: 'carlover***', amount: 75000, time: '10 minutes ago' }
    ]
  },
  Jade: {
    id: 'Jade',
    title: ' Jade Stone',
    desc: 'Jade Stone recently dug up.',
    tag: 'Jewelry',
    img: 'img/image5.png',
    startBid: 200000,
    bids: 32,
    endAt: Date.now() + 1000 * 60 * 60 * 22, // 22 hours
    minIncrement: 10000,
    history: [
      { name: 'jade collector***', amount: 190000, time: '5 minutes ago' },
      { name: 'jewelry maker***', amount: 180000, time: '1 hour ago' }
    ]
  },
  Artwork: {
    id: 'Artwork',
    title: 'Work or art by Huston Downs',
    desc: 'Huston Downs latest artwork',
    tag: 'Artwork',
    img: 'img/0001_KQGkbj_original.jpeg',
    startBid: 250000,
    bids: 17,
    endAt: Date.now() + 1000 * 60 * 60 * 12, // 12 hours
    minIncrement: 10000,
    history: [
      { name: 'artlover***', amount: 249000, time: '10 minutes ago' }
    ]
  },
  jewelry: {
    id: 'Ring',
    title: 'A rear light sapphire ring',
    desc: 'A wedding ring for your partner',
    tag: 'Ring',
    img: 'img/daph.jpg',
    startBid: 70000,
    bids: 19,
    endAt: Date.now() + 1000 * 60 * 60 * 7, // 7 hours
    minIncrement: 10000,
    history: [
      { name: 'emmanuel***', amount: 60000, time: '10 minutes ago' }
    ]
  },
  sport: {
    id: 'ball',
    title: 'A signed baseball by Ronaldo',
    desc: 'Signed by Ronaldo',
    tag: 'Sport',
    img: 'img/gsg.jpg',
    startBid: 50000,
    bids: 30,
    endAt: Date.now() + 1000 * 60 * 60 * 5, // 5 hours
    minIncrement: 10000,
    history: [
      { name: 'chase***', amount: 40000, time: '10 minutes ago' }
    ]
  },
};

/* ---------- HOME: render cards & timers ---------- */
function renderHomeCards() {
  const grid = document.getElementById('auctionGrid');
  if (!grid) return;

  grid.innerHTML = '';
  Object.values(ITEMS).forEach(item => {
    // build card
    const card = document.createElement('article');
    card.className = 'auction-card';
    card.innerHTML = `
      <img src="${item.img}" alt="${escapeHtml(item.title)}" />
      <div class="auction-info">
        <h3>${escapeHtml(item.title)}</h3>
        <p class="price">₦${numberWithCommas(item.startBid)}</p>
        <p class="muted"> ${item.bids} bids</p>
        <p class="timer muted" data-end="${item.endAt}">--:--:--</p>
        <div style="margin-top:10px">
          <button class="btn" onclick="goToItem('${item.id}')">Place Bid</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  startAllTimers();
}

/* ---------- Timer: universal (for home & item page) ---------- */
let timerIntervals = [];
function startAllTimers() {
  // clear existing
  timerIntervals.forEach(i => clearInterval(i));
  timerIntervals = [];

  document.querySelectorAll('.timer[data-end]').forEach(el => {
    function update() {
      const end = parseInt(el.dataset.end, 10);
      const now = Date.now();
      const diff = Math.max(0, end - now);
      if (diff <= 0) {
        el.textContent = 'Auction Ended';
        return;
      }
      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
      const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
      const seconds = Math.floor((diff % (1000*60)) / 1000);
      if (days > 0) {
        el.textContent = `${days}d ${hours}h ${String(minutes).padStart(2,'0')}m`;
      } else {
        el.textContent = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
      }
    }
    update();
    const id = setInterval(update, 1000);
    timerIntervals.push(id);
  });
}

/* ---------- Navigation helpers ---------- */
function goToItem(itemId) {
  // navigate to item.html with query
  location.href = `item.html?item=${encodeURIComponent(itemId)}`;
}

/* ---------- Utility ---------- */
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
function numberWithCommas(x){ return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","); }

/* ---------- Item page init & bid logic ---------- */
function initAuctionPage() {
  // parse query item
  const params = new URLSearchParams(location.search);
  const id = params.get('item') || 'rolex';
  const item = ITEMS[id];
  if (!item) return;

  // load saved state (persist per item)
  const stateKey = `auction_state_${id}`;
  const saved = JSON.parse(localStorage.getItem(stateKey) || 'null');
  let currentBid = saved?.currentBid ?? item.startBid;
  let bidCount = saved?.bidCount ?? item.bids;
  let history = saved?.history ?? [...item.history];

  // populate UI
  document.getElementById('itemImage').src = item.img;
  document.getElementById('itemTitle').textContent = item.title;
  document.getElementById('itemDesc').textContent = item.desc;
  document.getElementById('itemTag').textContent = item.tag;
  document.getElementById('currentBid').textContent = `₦${numberWithCommas(currentBid)}`;
  document.getElementById('bidCount').textContent = `${bidCount} bids`;
  document.getElementById('minIncrement').textContent = `₦${numberWithCommas(item.minIncrement)}`;

  // set countdown element
  const countdownEl = document.getElementById('countdown');
  countdownEl.dataset.end = item.endAt;
  startAllTimers(); // will pick up countdown

  // bid input default
  const bidInput = document.getElementById('bidInput');
  bidInput.value = currentBid + item.minIncrement;

  // render history
  const historyEl = document.getElementById('bidHistory');
  function renderHistory() {
    historyEl.innerHTML = '';
    if (history.length === 0) {
      historyEl.innerHTML = '<li class="muted">No bids yet.</li>';
      return;
    }
    history.forEach(h => {
      const li = document.createElement('li');
      li.innerHTML = `<div><strong>${escapeHtml(h.name)}</strong><div class="muted small">${escapeHtml(h.time)}</div></div><div style="font-weight:700;">₦${numberWithCommas(h.amount)}</div>`;
      historyEl.appendChild(li);
    });
  }
  renderHistory();

  // Place bid button
  document.getElementById('placeBidBtn').addEventListener('click', () => {
    const val = parseInt(bidInput.value, 10);
    if (isNaN(val) || val <= currentBid) {
      alert('Your bid must be higher than current bid.');
      return;
    }

    // update
    currentBid = val;
    bidCount++;
    const user = 'user***';
    const timeLabel = 'just now';
    history.unshift({ name: user, amount: currentBid, time: timeLabel });

    // save state
    localStorage.setItem(stateKey, JSON.stringify({ currentBid, bidCount, history }));

    // update UI
    document.getElementById('currentBid').textContent = `₦${numberWithCommas(currentBid)}`;
    document.getElementById('bidCount').textContent = `${bidCount} bids`;
    renderHistory();
    bidInput.value = currentBid + item.minIncrement;

    // store review info to sessionStorage for collection/checkout pages
    sessionStorage.setItem('lastBid', JSON.stringify({
      itemId: id,
      title: item.title,
      img: item.img,
      amount: currentBid
    }));

    // go to collection (review) page
    location.href = 'collection.html';
  }, { once: false });
}

/* ---------- collection page (review) ---------- */
function showCollectionPage(){
  const last = JSON.parse(sessionStorage.getItem('lastBid') || 'null');
  if (!last) {
    document.getElementById('reviewText').textContent = 'No recent bid found. Please place a bid first.';
    return;
  }
  document.getElementById('reviewText').textContent = `You're about to place ₦${numberWithCommas(last.amount)} on "${last.title}". Please review and proceed.`;
  document.getElementById('reviewImage').src = last.img;
  document.getElementById('reviewTitle').textContent = last.title;
  document.getElementById('reviewAmount').textContent = `₦${numberWithCommas(last.amount)}`;

  document.getElementById('confirmProceed').addEventListener('click', () => {
    location.href = 'checkout.html';
  });

  document.getElementById('editBid').addEventListener('click', () => {
    // navigate back to item page so user can adjust
    location.href = `item.html?item=${encodeURIComponent(last.itemId)}`;
  });
}

/* ---------- checkout page init & form handling ---------- */
function initCheckoutPage() {
  const last = JSON.parse(sessionStorage.getItem('lastBid') || 'null');
  if (!last) return;

  document.getElementById('checkoutImage').src = last.img;
  document.getElementById('checkoutTitle').textContent = last.title;
  document.getElementById('checkoutPrice').textContent = `₦${numberWithCommas(last.amount)}`;
  document.getElementById('checkoutNote').textContent = `Completing payment for ₦${numberWithCommas(last.amount)} — ${last.title}`;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const fullname = document.getElementById('fullname').value || '';
  const email = document.getElementById('email').value || '';
  const phone = document.getElementById('phone').value || '';
  if (!fullname || !email || !phone) {
    alert('Please fill required fields.');
    return;
  }

  // Simulate success
  const last = JSON.parse(sessionStorage.getItem('lastBid') || 'null');
  alert(`✅ Bid Confirmed!\n\n${fullname}, your bid of ₦${numberWithCommas(last.amount)} on "${last.title}" was placed.`);

  // optionally: clear sessionStorage lastBid
  sessionStorage.removeItem('lastBid');

  // redirect back home
  location.href = 'index.html';
}

/* ---------- page-level bootstrapping ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // if index.html has auctionGrid -> render
  if (document.getElementById('auctionGrid')) {
    renderHomeCards();
    // subscribe
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
      subscribeBtn.addEventListener('click', () => {
        const em = document.getElementById('subscribeEmail').value || '';
        if (!em) { alert('Enter an email'); return; }
        alert(`Thanks — ${em} subscribed!`);
        document.getElementById('subscribeEmail').value = '';
      });
    }
  }

  // item page
  if (document.getElementById('currentBid')) {
    initAuctionPage();
  }

  // collection page
  if (document.getElementById('reviewText')) {
    showCollectionPage();
  }

  // checkout page
  if (document.getElementById('checkoutForm')) {
    initCheckoutPage();
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);
  }
});
