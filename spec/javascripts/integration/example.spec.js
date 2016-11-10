import { expect } from 'chai';
import createFixture from '../support/createFixture';

function renderCartTotal({domNode, itemPrices}){
  const sum = itemPrices.reduce((total, price) => total + price, 0);
  const formattedPrice =`$${sum}`;
  domNode.innerHTML = formattedPrice;
}

describe('renderCartTotal', () => {
  let fixture;

  beforeEach(() => {
    fixture = createFixture({ html: '<div data-js-cart-total></div>' });
  });

  afterEach(() => {
    fixture.remove();
  });

  it('calculates and displays the cart total', () => {
    const domNode = fixture.querySelector('[data-js-cart-total]');
    const itemPrices = [1, 2.5, 7.25];

    renderCartTotal({ domNode, itemPrices});

    expect(domNode.textContent).to.equal('$10.75');
  });
});
