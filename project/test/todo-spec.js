const pageHelper = require('../../framework/helpers/pageHelper.js');

describe('Invalid password check', function() {
  it('should add a todo', async function () {
      browser.get('https://mail.ru/');

      // element(by.model('todoList.todoText')).sendKeys('write first protractor test');
      // $('[value="add"]').click();
      $('[id="mailbox:login"]').sendKeys("53adminmail");
      $('[id="mailbox:password"]').sendKeys("1");

      await pageHelper.waitForSelectorAndClick('.o-control[type="submit"]', 3000);
      // expect($('[id="mailbox:error"]').isDisplayed()).toEqual(true);
      expect(pageHelper.waitForIsVisible('[id="mailbox:error"]')).toEqual(true);
  });
});

