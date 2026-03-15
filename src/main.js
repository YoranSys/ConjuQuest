import { initState, getState, subscribe, navigate } from './state.js';
import { renderHome } from './ui/screens/home.js';
import { renderProfile } from './ui/screens/profile.js';
import { MissileGame } from './games/missile/game.js';
import { SnakeGame } from './games/snake/game.js';
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
    case 'missile': {
      const game = new MissileGame({
        n: 10,
        onComplete: (result) => {
          game.destroy();
          renderGameResult(app, { ...result, game: 'missile' });
        },
      });
      game.start(app);
      break;
    }
    case 'snake': {
      const game = new SnakeGame({
        onComplete: (result) => {
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

subscribe((state) => {
  renderScreen(state.currentScreen);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

initState().then(() => {
  const { currentScreen } = getState();
  renderScreen(currentScreen);
});
