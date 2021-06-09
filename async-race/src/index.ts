import './style.scss';
import { fragment } from './garage-page/garage-page';
import { makeNextBtnActive } from './garage-page/footer';
import { store } from './garage-page/store';

const body = document.querySelector('body');
body?.appendChild(fragment);

const init = () => {
  if (+store.carsCount! > 7) {
    makeNextBtnActive();
  }
}
init();