// Import required modules
const puppeteer = require("puppeteer");
const fs = require("fs");

// Define patterns to identify product-related URLs
const PRODUCT_PATTERNS = ["/product/", "/item/", "/p/"];

// Function to filter product-related URLs from all URLs
function filterProductUrls(urls) {
  // Check if each URL matches any of the patterns
  return urls.filter((url) =>
    PRODUCT_PATTERNS.some((pattern) => url.includes(pattern))
  );
}

// Function to crawl a single website and find product links
async function crawlWebsite(domain) {
  console.log(`Starting to crawl: ${domain}`);
  
  // Launch the browser
  const browser = await puppeteer.launch({ headless: true });
  
  // Open a new tab in the browser
  const page = await browser.newPage();

  // Store product URLs in an array
  let productUrls = [];

  try {
    // Visit the website
    await page.goto(domain, { waitUntil: "load", timeout: 30000 });

    // Get all links (hrefs) from the page
    const links = await page.evaluate(() => {
      // Find all <a> tags on the page
      const anchors = Array.from(document.querySelectorAll("a"));

      // Get the href (link) attribute from each <a> tag
      return anchors.map((anchor) => anchor.href);
    });

    // Filter out only product-related links
    productUrls = filterProductUrls(links);
  } catch (error) {
    console.error(`Error while crawling ${domain}: ${error.message}`);
  } finally {
    // Close the browser
    await browser.close();
  }

  // Return the list of product URLs found on the website
  return productUrls;
}

// Main function to crawl multiple websites
async function main() {
  // Step 1: Read the list of domains from a file called 'domains.json'
  const domains = JSON.parse(fs.readFileSync("domains.json", "utf8"));

  // Create an object to store results
  const results = {};

  // Step 2: Loop through each domain and crawl it
  for (const domain of domains) {
    console.log(`Processing domain: ${domain}`);
    
    // Crawl the website and get product URLs
    const productUrls = await crawlWebsite(domain);

    // Save the product URLs into the results object
    results[domain] = productUrls;

    console.log(`Found ${productUrls.length} product URLs on ${domain}`);
  }

  // Step 3: Save the results into a file called 'output.json'
  fs.writeFileSync("output.json", JSON.stringify(results, null, 2));
  console.log("Crawling completed. Results saved to 'output.json'.");
}

// Start the script
main();
