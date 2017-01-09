import { Cns2UiPage } from './app.po';

describe('cns2-ui App', function() {
  let page: Cns2UiPage;

  beforeEach(() => {
    page = new Cns2UiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
