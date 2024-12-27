Web Crawler with Puppeteer

This project is a basic web crawler built using Puppeteer, a Node.js library for controlling a headless browser. The script crawls a list of websites, extracts all product-related URLs based on predefined patterns, and saves the results into a JSON file.


---

Features

Crawls multiple websites for product-related URLs.

Identifies product links based on customizable patterns like /product/, /item/, or /p/.

Saves the crawled data into an output.json file for further use.



---

Technologies Used

Node.js: Backend runtime environment.

Puppeteer: To control a headless browser for web scraping.

File System (fs): To read and write JSON files.



---

Installation

1. Clone the Repository

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


2. Install Dependencies Make sure you have Node.js installed. Run the following command to install the required packages:

npm install puppeteer


3. Prepare Input Data Create a domains.json file in the project root directory containing a list of websites you want to crawl. For example:

[
  "https://example.com",
  "https://example2.com"
]




---

Usage

1. Run the script:

node index.js

Replace index.js with the name of your file if it's different.


2. After the script completes:

The results will be saved in a file named output.json.





---

How It Works

1. Input

The script reads a domains.json file that contains a list of websites to crawl.

2. Crawling

The script opens each website in a headless browser using Puppeteer.

It collects all links (<a> tags) on the webpage.


3. Filtering

The script filters product-related links using predefined patterns like /product/, /item/, or /p/.

4. Output

The results are saved in output.json with the format:

{
  "https://example.com": [
    "https://example.com/product/123",
    "https://example.com/item/456"
  ],
  "https://example2.com": []
}


---

Code Overview

Key Files

index.js: Main script to crawl websites and extract product URLs.

domains.json: Input file containing the list of websites.

output.json: Output file storing the extracted product URLs.


Key Functions

1. filterProductUrls(urls): Filters URLs based on product patterns.


2. crawlWebsite(domain): Crawls a single website and extracts product-related links.


3. main(): Manages the crawling process for multiple websites and saves results.




---

Example Output

After running the script, you might see results like:

{
  "https://example.com": [
    "https://example.com/product/123",
    "https://example.com/product/456"
  ],
  "https://example2.com": []
}


---

Prerequisites

Node.js (v12 or higher)

Internet connection



---

Known Limitations

The script currently works only for websites that don't block bots or require login credentials.

Dynamic or JavaScript-heavy websites may need additional handling.



---

Future Enhancements

Add support for pagination to crawl multiple pages.

Handle websites with bot protections.

Extract additional product information (like name or price) along with the URLs.



---

Contributing

If you'd like to contribute, feel free to submit a pull request or open an issue for suggestions or bug fixes.


---

License

This project is open-source and available under the MIT License.
