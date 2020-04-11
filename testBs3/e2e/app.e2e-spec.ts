import { TestBs3Page } from './app.po';

describe('test-bs3 App', function() {
  let page: TestBs3Page;

  beforeEach(() => {
    page = new TestBs3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
