// Project rows expand to show details
const app = document.querySelector('.app');
const main = document.getElementById('main');

document.querySelectorAll('.track').forEach((track) => {
  const row = track.querySelector('.track-row');
  row.addEventListener('click', () => {
    const open = !track.classList.contains('open');
    track.classList.toggle('open', open);
    row.setAttribute('aria-expanded', open);
  });
});

// Real playback: the play buttons and player bar drive a Spotify embed through
// Spotify's iFrame API. Logged-out visitors hear Spotify's 30s preview.
const SONG_URI = 'spotify:track:6uhCnqc4Tncn1vqkuGubPO';
const playButtons = [document.getElementById('playBig'), document.getElementById('playSmall'), document.getElementById('pickCard')];
const progressFill = document.getElementById('progressFill');
const timeNow = document.getElementById('timeNow');
const timeTotal = document.getElementById('timeTotal');
let song = null;

const fmt = (ms) => {
  const sec = Math.floor(ms / 1000);
  return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
};

function setPlaying(playing) {
  app.classList.toggle('is-playing', playing);
  playButtons.forEach((b) => b.setAttribute('aria-label', (playing ? 'Pause' : 'Play') + ' HEAVEN by JENNIE'));
}

window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const el = document.getElementById('songEmbed');
  IFrameAPI.createController(el, { uri: SONG_URI, width: 300, height: 80 }, (controller) => {
    song = controller;
    controller.addListener('playback_update', ({ data }) => {
      setPlaying(!data.isPaused);
      if (data.duration) {
        progressFill.style.width = (data.position / data.duration) * 100 + '%';
        timeNow.textContent = fmt(data.position);
        timeTotal.textContent = fmt(data.duration);
      }
    });
  });
};

playButtons.forEach((b) => b.addEventListener('click', () => song && song.togglePlay()));
document.getElementById('restartBtn').addEventListener('click', () => song && song.seek(0));

// Highlight Home or About in the sidebar depending on scroll position
const about = document.getElementById('about');
const sideLinks = document.querySelectorAll('.side-link');
main.addEventListener('scroll', () => {
  const pastAbout = about.getBoundingClientRect().top < window.innerHeight * 0.5;
  sideLinks[0].classList.toggle('active', !pastAbout);
  sideLinks[1].classList.toggle('active', pastAbout);
}, { passive: true });


// About card opens the full bio, like Spotify's artist bio popup
const aboutModal = document.getElementById('aboutModal');
document.getElementById('aboutCard').addEventListener('click', () => aboutModal.showModal());
document.getElementById('aboutClose').addEventListener('click', () => aboutModal.close());
aboutModal.addEventListener('click', (e) => {
  if (e.target === aboutModal) aboutModal.close();
});
