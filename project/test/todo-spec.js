const pageHelper = require('../../framework/helpers/pageHelper.js');
// import pageHelper from '../../framework/helpers/pageHelper.js';

describe('angularjs homepage todo list', function() {
  it('should add a todo', async function () {
      // browser.get('https://angularjs.org');
      browser.get('https://mail.ru/');

      // element(by.model('todoList.todoText')).sendKeys('write first protractor test');
      // $('[value="add"]').click();
      $('[id="mailbox:login"]').sendKeys("53adminmail");
      $('[id="mailbox:password"]').sendKeys("1");

      // await pageHelper.waitForSelectorAndClick('.o-control[type="submit"]', 3000);

      const EC = protractor.ExpectedConditions;

      function waitForIsVisible() {
          return browser.wait(EC.visibilityOf($('[id="mailbox:error"]')), 1000).then(function () {
              console.log("fdjklfjsl");
              return true;
          }).catch(function (e) {
              console.log("not found");
              return false;
          });
      }
      // waitForIsVisible(element, timeout=2000) {
      //     return browser.wait(EC.visibilityOf(element), timeout).then(function () {
      //         console.log("fdjklfjsl");
      //         return true;
      //     }).catch(function (e) {
      //         console.log("not found:" + e);
      //         return false;
      //     });

      // expect($('[id="mailbox:error"]').isDisplayed()).toEqual(true);
      expect(await pageHelper.waitForIsVisible('[id="mailbox:error"]')).toEqual(true);
  });
});

