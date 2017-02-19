import { WerewolvestPage } from './app.po';

describe('werewolvest App', () => {
  let page: WerewolvestPage;

  beforeEach(() => {
    page = new WerewolvestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
