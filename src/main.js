import { initState, getState, subscribe, navigate } from './state.js';
import { renderHome } from './ui/screens/home.js';
import { renderProfile } from './ui/screens/profile.js';
import { renderAide } from './ui/screens/aide.js';
import { MissileGame } from './games/missile/game.js';
import { SnakeGame } from './games/snake/game.js';
import { FrappeEclairGame } from './games/frappe/game.js';
import { MemoryGame } from './games/memory/game.js';
import { LilaGame } from './games/lila/game.js';
import { renderGameResult } from './ui/screens/game-result.js';

const app = document.getElementById('app');

function renderScreen(screen) {
  app.innerHTML = '';

  switch (screen) {
    case 'home':
      renderHome(app);
      break;
    case 'profile':
      renderProfile(app);
      break;
    case 'aide':
      renderAide(app);
      break;
    case 'missile': {
      const game = new MissileGame({
        n: 10,
        onComplete: (result) => {
          game.destroy();
          renderGameResult(app, result);
        },
      });
      game.start(app);
      break;
    }
    case 'snake': {
      const game = new SnakeGame({
        n: 10,
        onComplete: (result) => {
          game.destroy();
          renderGameResult(app, result);
        },
      });
      game.start(app);
      break;
    }
    case 'frappe': {
      const game = new FrappeEclairGame({
        n: 10,
        onComplete: (result) => {
          game.destroy();
          renderGameResult(app, result);
        },
      });
      game.start(app);
      break;
    }
    case 'memory': {
      const game = new MemoryGame({
        onComplete: (result) => {
          game.destroy();
          renderGameResult(app, result);
        },
      });
      game.start(app);
      break;
    }
    case 'lila': {
      const lilaNiveau = (getState().profile?.niveau || 0) >= 3 ? 2 : 1;
      const game = new LilaGame({
        n: 8,
        niveau: lilaNiveau,
        onComplete: (result) => {
          game.destroy();
          renderGameResult(app, result);
        },
      });
      game.start(app);
      break;
    }
    default:
      renderHome(app);
  }
}

let _lastScreen = null;
subscribe((state) => {
  if (state.currentScreen !== _lastScreen) {
    _lastScreen = state.currentScreen;
    renderScreen(state.currentScreen);
  }
});

let refreshing = false;

if ('serviceWorker' in navigator) {
  // When a new service worker takes control (after skipWaiting + clients.claim),
  // reload the page so the user immediately gets the updated version.
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

initState().then(() => {
  const { currentScreen } = getState();
  renderScreen(currentScreen);
});
