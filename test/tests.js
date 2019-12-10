var webdriver = require('mocha-webdriver');
var path = require('path');

describe('test basic behaviour', function() {
  before(async function() {
    this.timeout(2000);
    await webdriver.driver.get(`file://${path.resolve(__dirname)}/../dist/examples/index.html`);
  });

  it('should fix headers of rows and columns', async function() {
    // Scroll table to bottom right
    await webdriver.driver.executeScript("document.querySelector('sticky-headers').scrollTop = 100000;");
    await webdriver.driver.executeScript("document.querySelector('sticky-headers').scrollLeft = 100000;");
    var tableRect = await (await webdriver.driver.find('sticky-headers')).getRect();

    // Verify upper left cell is fixed
    var upperLeftCellRect = await (await webdriver.driver.find('sticky-headers tr th')).getRect();
    webdriver.assert(Math.abs(upperLeftCellRect.x - tableRect.x) < 3, "Upper left cell's top (" + upperLeftCellRect.x + ") is not in 3px distance to top of table (" + tableRect.x + ")");
    webdriver.assert(Math.abs(upperLeftCellRect.y - tableRect.y) < 3, "Upper left cell's left side (" + upperLeftCellRect.y + ") is not in 3px distance to left side of table (" + tableRect.y + ")");

    // Verify first upper left cell which is not fixed is scrolled outside the view
    var upperLeftNormalCellRect = await (await webdriver.driver.find('sticky-headers tr td')).getRect();
    webdriver.assert(upperLeftNormalCellRect.x < tableRect.x, "First unfixed cell's top (" + upperLeftNormalCellRect.x + ") is not above the table's top (" + tableRect.x + ")");
    webdriver.assert(upperLeftNormalCellRect.y < tableRect.y, "First unfixed cell's left side (" + upperLeftNormalCellRect.x + ") is not right of table's left side (" + tableRect.y + ")");
  });
});
