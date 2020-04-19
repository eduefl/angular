import { XformsPage } from './app.po';

describe('xforms App', function() {
  let page: XformsPage;

  beforeEach(() => {
    page = new XformsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
