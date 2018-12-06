describe('angularjs homepage todo list', function() {
  it('should add a todo', async function () {
      // browser.get('https://angularjs.org');
      browser.get('https://mail.ru/');

      // element(by.model('todoList.todoText')).sendKeys('write first protractor test');
      // $('[value="add"]').click();
      $('[id="mailbox:login"]').sendKeys("53adminmail");
      $('[id="mailbox:password"]').sendKeys("1");
      $('.o-control[type="submit"]').click();

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

      // expect($('[id="mailbox:error"]').isDisplayed()).toEqual(true);
      expect(waitForIsVisible()).toEqual(true);
  });
});

