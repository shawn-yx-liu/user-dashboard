getBackground()
getCurrentTime()
setInterval(getCurrentTime, 1000)
getWeather()
getQuote()
loadTodos()

function getBackground() {
  fetch(
    'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature-night'
  )
    .then((res) => res.json())
    .then((data) => {
      document.body.style.backgroundImage = `url(${data.urls.regular})`
      document.getElementById('author').textContent = `By: ${data.user.name}`
      document.getElementById('author').addEventListener('click', () => {
        window
          .open(`https://unsplash.com/@${data.user.username}`, '_blank')
          .focus()
      })
    })
    .catch((err) => {
      // Use a default background image/author
      document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
      document.getElementById('author').textContent = `By: Dodi Achmad`
    })
}

function checkEnter(event){
    if (event.key === "Enter"){
        getStockPrice()
    }
}

function getStockPrice() {
    const apiKey = 'QNVV8KJQH2QMWK7N' // Replace with your API key
    const stockSymbol = document.getElementById('stock-symbol').value.toUpperCase()
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data['Global Quote'])
            if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
                const price = parseFloat(data['Global Quote']['05. price']);
                const previousClose = parseFloat(data['Global Quote']['08. previous close']);
                const change = price - previousClose;
                const changePercentage = (change / previousClose) * 100;

                document.getElementById('stock-result').innerHTML = `
                <p>
                    Current price of ${stockSymbol}: $${price.toFixed(2)}<br>
                    Today's Change: $${change.toFixed(2)} (${changePercentage.toFixed(2)}%)
                </p>
                `;
            } else if (data['Information']) {
                document.getElementById('stock-result').innerHTML = '<p>Daily API limit reached. Please try again tomorrow.</p>'
            } else {
                document.getElementById('stock-result').innerHTML = '<p>Stock symbol not found. Please enter a valid symbol.</p>';
            }
            })
            .catch(error => {
            console.error('Error fetching stock data:', error);
            document.getElementById('stock-result').innerHTML = '<p>Error fetching stock data. Please try again.</p>';
    });
}

function getCurrentTime() {
  const date = new Date()
  document.getElementById('time').textContent = date.toLocaleTimeString(
    'en-us',
    { timeStyle: 'short' }
  )
}

function getWeather() {
  navigator.geolocation.getCurrentPosition((position) => {
    fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error('Weather data not available')
        }
        return res.json()
      })
      .then((data) => {
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById('weather').innerHTML = `
                    <img src=${iconUrl} />
                    <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                    <p class="weather-city">${data.name}</p>
                `
      })
      .catch((err) => console.error(err))
  })
}

function getQuote() {
  fetch('https://api.api-ninjas.com/v1/quotes?category=inspirational', {
    contentType: 'application/json',
    headers: {
      'X-Api-Key': 'N2TntO7fUDNP9piuzCP60w==gZZ6e7M2258MHwBX',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('quote').textContent = data[0].quote
      document.getElementById(
        'quote-author'
      ).textContent = `- ${data[0].author}`
    })
}

function addTodo(event) {
  if (event.key === 'Enter') {
    const todoText = document.getElementById('new-todo').value
    if (todoText.trim() === '') {
      alert('Please enter a valid todo.')
      return
    }

    const todoList = document.getElementById('todo-list')
    const todoItem = createTodoItem(todoText)

    todoList.appendChild(todoItem)

    // Update local storage with todo item
    updateLocalStorage()

    // Clear the input field
    document.getElementById('new-todo').value = ''
  }
}

function createTodoItem(text) {
    const todoList = document.getElementById("todo-list");
    const todoItem = document.createElement("li");
    todoItem.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        todoList.removeChild(todoItem);
        updateLocalStorage();
      }
    });

    const todoTextSpan = document.createElement("span");
    todoTextSpan.innerText = text;

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoTextSpan);

    return todoItem;
}

function updateLocalStorage() {
    const todoList = document.getElementById("todo-list");
    const todos = Array.from(todoList.children).map(item => ({
      text: item.querySelector('span').innerText,
    }))

    localStorage.setItem('todos', JSON.stringify(todos))
}

function loadTodos() {
    const todoList = document.getElementById('todo-list') 
    const todos = JSON.parse(localStorage.getItem('todos')) || []

    todos.forEach(todo => {
        const todoItem = createTodoItem(todo.text)
        todoList.appendChild(todoItem)
      })
}