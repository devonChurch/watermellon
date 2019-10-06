const { resolve } = require("path");
const { outputFile } = require("fs-extra");
const { removeStartingSlash } = require("./utils");
const { logTitle, logRender } = require("./logs");

const puppeteer = require("puppeteer");
const puppeteerOptions = {
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
};

const createOutputPath = (output, route) =>
  resolve(output, removeStartingSlash(route), "index.html");

// module.exports = () => console.log("running.....");

module.exports = async ({ root, routes, output }) => {
  try {
    const browser = await puppeteer.launch(puppeteerOptions);
    const page = await browser.newPage();

    /**
     * Because this is a "raw" development SPA, we cannot just jump to a nested
     * `index.html` file that does not exist. Instead we load in the root route
     * THEN travel to where we need to go with the Angular router cached in our
     * run time instance.
     */
    await page.goto(root, { waitUntil: "networkidle0" });
    logTitle("Render");

    /**
     * Iterate through the supplied routes, get the HTML "blob" and save it into
     * a nested route (as `index.html` not the gross `[page-name].html`).
     */
    for (const route of routes) {
      const url = `${root}${route}`;
      const path = createOutputPath(output, route);

      logRender(url, path);

      await page.goto(url);
      await page.waitFor("h1");
      const html = await page.content();
      await outputFile(path, html);
    }

    /** End any "hanging" `async` requests so that we can close the program. */
    await browser.close();
  } catch (error) {
    console.error(error);
  }
};
