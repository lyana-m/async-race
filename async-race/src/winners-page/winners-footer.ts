import { createElement } from "../utilities";

export const renderWinnersFooter = () => {
  const footer = createElement('footer', ['footer']);
  const wrapper = createElement('div', ['wrapper', 'footer-wrapper']);
  const prevBtn = createElement('button', ['btn', 'btn-prev', 'win-btn-prev'], 'prev');
  const nextBtn = createElement('button', ['btn', 'btn-next','win-btn-prev'], 'next');

  wrapper.appendChild(prevBtn);
  wrapper.appendChild(nextBtn);
  footer.appendChild(wrapper);
  return footer;
}