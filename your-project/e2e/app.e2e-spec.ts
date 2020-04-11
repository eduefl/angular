import { YourProjectPage } from './app.po';

describe('your-project App', function() {
  let page: YourProjectPage;

  beforeEach(() => {
    page = new YourProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
