const branches = {
  kibwezi: {
    name: 'KIBWEZI EASTVIEW Kibwezi',
    tagline: 'Main Branch • Kibwezi',
    address: 'Kibwezi, Makueni County, Kenya<br><small>Kibwezi–Kitui Road</small>',
    phone: '+254702121550',
    phoneDisplay: '+254 702 121550',
    phoneSecondary: '+254 700 649406',
    phoneSecondaryRaw: '+254700649406',
    highlight: 'Heart of Kibwezi Town, 24/7 Hospitality with rooms at KES 1,100, 1,500 and 2,000.',
    mapUrl: 'https://maps.google.com/maps?q=KIBWEZI+EAST+VIEW&output=embed',
    directionsUrl: 'https://share.google/SRZ8uIip68kWtiZJH',
    previewImg: 'images/image-005.webp',
    previewTitle: 'Kibwezi Executive Room (KES 2,000)',
    previewDesc: 'Four-poster canopy bed with protective mosquito netting, ensuite bathroom & Wi-Fi.',
    rooms: [
      { name: 'Kibwezi Economy Room (KES 1,100)', rate: 1100 },
      { name: 'Kibwezi Standard Room (KES 1,500)', rate: 1500 },
      { name: 'Kibwezi Executive Room (KES 2,000)', rate: 2000 }
    ]
  },
  wote: {
    name: 'KIBWEZI EASTVIEW Wote',
    tagline: 'Branch 2 • Wote Kaiti River',
    address: 'Near Kaiti River Bridge, Along Machakos–Wote Road, Wote, Makueni County, Kenya<br><small>Landmark: Kaiti River Bridge (Machakos–Wote Highway)</small>',
    phone: '+254745338137',
    phoneDisplay: '0745 338 137',
    phoneSecondary: '+254 702 121550',
    phoneSecondaryRaw: '+254702121550',
    highlight: 'Scenic riverside location near Kaiti River with rooms at KES 2,500 and 3,500.',
    mapUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=37.6050%2C-1.8000%2C37.6550%2C-1.7600&layer=mapnik&marker=-1.7808%2C37.6288',
    directionsUrl: 'https://maps.google.com?q=Wote+Kaiti+River+Makueni+Kenya',
    previewImg: 'images/image-011.webp',
    previewTitle: 'Wote Executive Room (KES 3,500)',
    previewDesc: 'Deluxe king canopy bed with drapery, river breeze, and breakfast included.',
    rooms: [
      { name: 'Wote Standard Room (KES 2,500)', rate: 2500 },
      { name: 'Wote Executive Room (KES 3,500)', rate: 3500 }
    ]
  }
};

// Repository photos are in the site root, not in an images/ directory.
function resolveImagePath(path) {
  if (typeof path !== 'string') return path;
  return path.replace(/^images\//, '');
}

function setImageSource(image, path) {
  const file = resolveImagePath(path);
  if (!file) return;

  // Use the Pages site first, then fall back to the repository's raw asset if
  // Pages returns a missing-image response (for example during deployment).
  image.onerror = function () {
    image.onerror = null;
    image.src = 'https://raw.githubusercontent.com/Innosafa/testing/main/' + encodeURIComponent(file);
  };
  image.src = file;
}

let currentBranchKey = 'kibwezi';

function setText(id, value) { const el = document.getElementById(id); if (el) el.textContent = value; }
function setHTML(id, value) { const el = document.getElementById(id); if (el) el.innerHTML = value; }

function switchBranch(key) {
  if (!branches[key]) return;
  currentBranchKey = key;
  const b = branches[key];

  const kibweziButton = document.getElementById('btnBranchKibwezi');
  const woteButton = document.getElementById('btnBranchWote');
  if (kibweziButton) kibweziButton.classList.toggle('active', key === 'kibwezi');
  if (woteButton) woteButton.classList.toggle('active', key === 'wote');

  const kibweziCard = document.getElementById('cardKibwezi');
  const woteCard = document.getElementById('cardWote');
  if (kibweziCard) kibweziCard.classList.toggle('active', key === 'kibwezi');
  if (woteCard) woteCard.classList.toggle('active', key === 'wote');

  const phone = document.getElementById('topbarPhone');
  if (phone) phone.href = 'tel:' + b.phone;
  setText('topbarPhoneText', b.phoneDisplay);
  setText('logoBranchSubtitle', key === 'kibwezi' ? 'Kibwezi & Wote (near Kaiti River)' : 'Wote Branch (near Kaiti River)');

  setText('contactTagline', b.tagline);
  setText('contactTitle', b.name);
  setText('contactHighlight', b.highlight);
  setHTML('contactAddress', b.address);
  setHTML('contactPhones', '<a href="tel:' + b.phone + '" style="color:var(--gold);font-weight:700">' + b.phoneDisplay + '</a><br><a href="tel:' + b.phoneSecondaryRaw + '" style="color:#cbd5e1">' + b.phoneSecondary + '</a>');

  const callBranch = document.getElementById('btnCallBranch');
  const directions = document.getElementById('btnMapDirections');
  const map = document.getElementById('branchMapFrame');
  const whatsapp = document.getElementById('floatingWhatsapp');
  if (callBranch) callBranch.href = 'tel:' + b.phone;
  if (directions) directions.href = b.directionsUrl;
  if (map) map.src = b.mapUrl;
  if (whatsapp) whatsapp.href = 'https://wa.me/' + b.phone.replace('+', '') + '?text=' + encodeURIComponent('Hello East View Hotel, I would like to make an enquiry.');

  const preview = document.getElementById('heroPreviewImg');
  if (preview) setImageSource(preview, b.previewImg);
  setText('heroPreviewTitle', b.previewTitle);
  setText('heroPreviewDesc', b.previewDesc);

  filterRoomDisplay(key);
  updateBookingBranch(key);
}

function filterRoomDisplay(key) {
  if (!branches[key]) return;
  const kibwezi = document.getElementById('kibweziRoomsGrid');
  const wote = document.getElementById('woteRoomsGrid');
  if (kibwezi) kibwezi.style.display = key === 'kibwezi' ? 'grid' : 'none';
  if (wote) wote.style.display = key === 'wote' ? 'grid' : 'none';

  const kibweziTab = document.getElementById('tabRoomKibwezi');
  const woteTab = document.getElementById('tabRoomWote');
  if (kibweziTab) kibweziTab.classList.toggle('active', key === 'kibwezi');
  if (woteTab) woteTab.classList.toggle('active', key === 'wote');

  currentBranchKey = key;
  if (document.getElementById('bookingBranch')) updateBookingBranch(key);
}

function populateBookingRoomSelect(key) {
  const select = document.getElementById('roomType');
  if (!select || !branches[key]) return;
  const requestedRoom = sessionStorage.getItem('eastviewSelectedRoom');
  select.innerHTML = '';
  branches[key].rooms.forEach(room => {
    const option = document.createElement('option');
    option.value = room.name;
    option.textContent = room.name;
    select.appendChild(option);
  });
  if (requestedRoom && branches[key].rooms.some(room => room.name === requestedRoom)) select.value = requestedRoom;
  sessionStorage.removeItem('eastviewSelectedRoom');
  calculateBookingTotal();
}

function updateBookingBranch(key) {
  if (!branches[key]) return;
  currentBranchKey = key;
  const select = document.getElementById('bookingBranch');
  if (select) select.value = key;
  populateBookingRoomSelect(key);
}

function selectRoomForBooking(key, roomName) {
  sessionStorage.setItem('eastviewSelectedBranch', key);
  sessionStorage.setItem('eastviewSelectedRoom', roomName);
}

function calculateBookingTotal() {
  const room = document.getElementById('roomType')?.value || '';
  const checkIn = document.getElementById('checkIn')?.value;
  const checkOut = document.getElementById('checkOut')?.value;
  let nights = 1;
  if (checkIn && checkOut) {
    const inDate = new Date(checkIn + 'T00:00:00');
    const outDate = new Date(checkOut + 'T00:00:00');
    const difference = Math.round((outDate - inDate) / 86400000);
    if (!isNaN(difference) && difference > 0) nights = difference;
  }
  let rate = 1500;
  const selectedRoom = branches[currentBranchKey].rooms.find(item => item.name === room);
  if (selectedRoom) rate = selectedRoom.rate;
  const total = nights * rate;
  setText('bookingSummaryDetails', nights + (nights === 1 ? ' night stay' : ' nights stay'));
  const amount = document.getElementById('bookingTotalAmount');
  if (amount) amount.textContent = 'KES ' + total.toLocaleString('en-US');
}

function handleBookingSubmit(event) {
  event.preventDefault();
  const b = branches[document.getElementById('bookingBranch')?.value || currentBranchKey];
  const name = document.getElementById('guestName')?.value || '';
  const phone = document.getElementById('guestPhone')?.value || '';
  const checkIn = document.getElementById('checkIn')?.value || '';
  const checkOut = document.getElementById('checkOut')?.value || '';
  const room = document.getElementById('roomType')?.value || '';
  const guests = document.getElementById('guests')?.value || '1 Guest';
  const request = document.getElementById('specialRequest')?.value || 'None';
  let nights = 1;
  if (checkIn && checkOut) {
    const diff = Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000);
    if (diff > 0) nights = diff;
  }
  let rate = b.rooms[0].rate;
  const selected = b.rooms.find(item => item.name === room);
  if (selected) rate = selected.rate;
  const reference = 'EVH-' + Math.floor(100000 + Math.random() * 900000);
  const message = 'Hello ' + b.name + ',\nI would like to make a room reservation.\nRef: ' + reference + '\nBranch: ' + b.name + '\nName: ' + name + '\nPhone: ' + phone + '\nCheck-in: ' + checkIn + '\nCheck-out: ' + checkOut + '\nRoom: ' + room + '\nGuests: ' + guests + '\nNights: ' + nights + '\nEstimated total: KES ' + (rate * nights).toLocaleString('en-US') + '\nSpecial request: ' + request;
  window.open('https://wa.me/' + b.phone.replace('+', '') + '?text=' + encodeURIComponent(message), '_blank');
}

function orderDiningOnWhatsApp() {
  const b = branches[currentBranchKey];
  window.open('https://wa.me/' + b.phone.replace('+', '') + '?text=' + encodeURIComponent('Hello ' + b.name + ', I would like to inquire about food, whole tilapia, or buffet catering.'), '_blank');
}

function openLightbox(src, title, desc) {
  const image = document.getElementById('lightboxImg');
  if (image) setImageSource(image, src);
  setText('lightboxTitle', title);
  setText('lightboxDesc', desc);
  document.getElementById('lightboxModal')?.classList.add('active');
}
function closeLightbox() { document.getElementById('lightboxModal')?.classList.remove('active'); }

function openReviewModal() {
  document.getElementById('reviewForm')?.style && (document.getElementById('reviewForm').style.display = 'block');
  const success = document.getElementById('reviewSuccessMsg'); if (success) success.style.display = 'none';
  document.getElementById('reviewModal')?.classList.add('active');
}
function closeReviewModal() { document.getElementById('reviewModal')?.classList.remove('active'); }
function handleReviewSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('reviewForm');
  const success = document.getElementById('reviewSuccessMsg');
  if (form) form.style.display = 'none';
  if (success) success.style.display = 'block';
  setTimeout(closeReviewModal, 2200);
}

const heroSlides = ['heroSlide0', 'heroSlide1', 'heroSlide2', 'heroSlide3'];
const heroLabels = ['Kibwezi Aerial Panorama', 'Wote Branch Exterior', 'Wote at Night', 'Kibwezi Roadside Entrance'];
let heroIndex = 0;
function setHeroSlide(index) {
  heroIndex = index;
  heroSlides.forEach((id, i) => document.getElementById(id)?.classList.toggle('active', i === index));
  document.querySelectorAll('.hero-dot').forEach((dot, i) => dot.classList.toggle('active', i === index));
  setText('heroSlideLabel', heroLabels[index]);
}
if (document.querySelector('.hero')) setInterval(() => setHeroSlide((heroIndex + 1) % heroSlides.length), 5500);

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle?.addEventListener('click', () => navLinks?.classList.toggle('active'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks?.classList.remove('active')));

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const checkIn = document.getElementById('checkIn');
const checkOut = document.getElementById('checkOut');
if (checkIn) { checkIn.min = today; if (!checkIn.value) checkIn.value = today; }
if (checkOut) { checkOut.min = tomorrow; if (!checkOut.value) checkOut.value = tomorrow; }
setText('currentYear', new Date().getFullYear());

const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => { if (backTop) backTop.style.display = window.scrollY > 400 ? 'grid' : 'none'; });
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
backTop?.addEventListener('click', scrollToTop);

const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => { if (link.getAttribute('href') === currentPage) link.classList.add('active'); });

let initialBranch = sessionStorage.getItem('eastviewSelectedBranch');
if (!branches[initialBranch]) initialBranch = 'kibwezi';
switchBranch(initialBranch);
if (document.getElementById('bookingBranch')) {
  const selectedRoom = sessionStorage.getItem('eastviewSelectedRoom');
  populateBookingRoomSelect(initialBranch);
  if (selectedRoom) {
    const roomSelect = document.getElementById('roomType');
    if (roomSelect) roomSelect.value = selectedRoom;
    sessionStorage.removeItem('eastviewSelectedRoom');
    sessionStorage.removeItem('eastviewSelectedBranch');
  }
  calculateBookingTotal();
}

// Correct legacy image paths, and configure a raw-file fallback for each photo.
document.querySelectorAll('img[src]').forEach(image => {
  setImageSource(image, image.getAttribute('src'));
});
document.querySelectorAll('[style*="images/"]').forEach(element => {
  element.style.backgroundImage = element.style.backgroundImage.replace(/images\//g, '');
});
