// import puppeteer from 'puppeteer';

// const useFetchPuppet = () => {
//     const getQuotes = async () => {
//         // Start a Puppeteer session with:
//         // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
//         // - no default viewport (`defaultViewport: null` - website page will in full width and height)
//         const browser = await puppeteer.launch({
//             headless: true,
//             defaultViewport: null,
//         });

//         // open a new page
//         const page = browser.newPage();
//         // On this new page:
//         // - open the "http://quotes.toscrape.com/" website
//         // - wait until the dom content is loaded (HTML is ready)
//         (await page).goto('http://quotes.toscrape.com/', {
//             waitUntil: 'domcontentloaded',
//         });
//     };

//     return {
//         getQuotes,
//     };
// };

// export default useFetchPuppet;
