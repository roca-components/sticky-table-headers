/* global describe, before, it */

var webdriver = require("mocha-webdriver");
var path = require("path");

describe("test basic behaviour", function() {
  before(async function() {
    await webdriver.driver.get(`file://${path.resolve(__dirname)}/../dist/examples/index.html`);
  });

  it("should fix headers of rows and columns", async function() {
    // Scroll table to bottom right
    await webdriver.driver.executeScript("document.querySelector('sticky-headers').scrollTop = 100000;");
    await webdriver.driver.executeScript("document.querySelector('sticky-headers').scrollLeft = 100000;");
    const tableRect = await (await webdriver.driver.find("sticky-headers")).getRect();

    // Verify upper left cell is fixed
    const upperLeftCellRect = await (await webdriver.driver.find("sticky-headers tr th")).getRect();
    webdriver.assert(Math.abs(upperLeftCellRect.x - tableRect.x) < 3, "Upper left cell's top (" + upperLeftCellRect.x + ") is not in 3px distance to top of table (" + tableRect.x + ")");
    webdriver.assert(Math.abs(upperLeftCellRect.y - tableRect.y) < 3, "Upper left cell's left side (" + upperLeftCellRect.y + ") is not in 3px distance to left side of table (" + tableRect.y + ")");

    // Verify first upper left cell which is not fixed is scrolled outside the view
    const upperLeftNormalCellRect = await (await webdriver.driver.find("sticky-headers tr td")).getRect();
    webdriver.assert(upperLeftNormalCellRect.x < tableRect.x, "First unfixed cell's top (" + upperLeftNormalCellRect.x + ") is not above the table's top (" + tableRect.x + ")");
    webdriver.assert(upperLeftNormalCellRect.y < tableRect.y, "First unfixed cell's left side (" + upperLeftNormalCellRect.y + ") is not right of table's left side (" + tableRect.y + ")");
  });

  it("should not scroll fixed columns for smaller screens", async function() {
    // Force a smaller window width
    await webdriver.driver.manage().window().setRect({ width: 640, height: 480 });
    // Scroll table to bottom right
    await webdriver.driver.executeScript("document.querySelector('sticky-headers[min-screen-width]').scrollTop = 100000;");
    await webdriver.driver.executeScript("document.querySelector('sticky-headers[min-screen-width]').scrollLeft = 100000;");
    const tableRect = await (await webdriver.driver.find("sticky-headers[min-screen-width]")).getRect();

    // Verify upper left cell is fixed
    const upperLeftCellRect = await (await webdriver.driver.find("sticky-headers[min-screen-width] tr th")).getRect();
    webdriver.assert(upperLeftCellRect.x < tableRect.x, "Upper left cell's left side (" + upperLeftCellRect.x + ") is not right of table's left side (" + tableRect.x + ")");
    webdriver.assert(Math.abs(upperLeftCellRect.y - tableRect.y) < 3, "Upper left cell's left side (" + upperLeftCellRect.y + ") is not in 3px distance to left side of table (" + tableRect.y + ")");
  });
});
