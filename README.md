# User Dashboard
The user dashboard is is a browser extension that replaces your browser's new tab page with a new dashboard, providing access to the current time, weather, stock prices, and a personalized todo list.  I created this project as a way to practice my asynchronous JavaScript and API skills.  

## Getting Started
### Build and Run the extension:

```
$ npm install
$ npm start
````

### Add the Extension to your browser
* Go to your Browser's Extensions page.
* Toggle Developer Mode on.
* Click "Load Unpacked" and select the user-dashboard folder.

### Usage
* Open a new tab in your browser to see your personalized dashboard.
* Make sure location access is enabled in order for the weather module to work. 
* Type in a stock ticker symbol and press "Enter" to view the current stock price and the day's change.
* Type in some text and press "Enter" to add an item to your todo list.

## Help
* The stock price API has a daily request limit of 25 API calls. If the number of calls exceeds the limit, the stock prices will not show on the dashboard.

# Authors
* [Shawn Liu](https://github.com/shawn8913)

# Acknowledgements:
* [Scrimba Frontend Career Path](https://scrimba.com/learn/frontend)
