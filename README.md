# Connect Four Challenge 🔵🔴

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

A classic game of Connect Four built with a Flask backend and a JavaScript frontend. Challenge a simple computer AI and try to get four of your discs in a row!

---

## ✨ About The Project

This project is a web-based implementation of the classic game "Connect Four." It features a clean, responsive interface where a player competes against a simple computer AI.

The application uses a minimal **Flask** backend whose primary role is to serve the main `index.html` page. All of the interactive game logic—including board creation, player turns, AI moves, and win/draw detection—is handled entirely on the client-side with **JavaScript**.

### Gameplay Demo

*(It's highly recommended to create a short GIF of your gameplay and add it here. You can use a tool like Giphy Capture or ScreenToGif.)*

![Connect Four Gameplay Demo](https://i.imgur.com/example.gif) ---

## 🚀 Features

* **Classic Gameplay:** A standard 7x6 Connect Four grid.
* **Player vs. AI:** Compete against a simple computer opponent that makes random moves.
* **Win Detection:** The game automatically detects horizontal, vertical, and diagonal wins.
* **Interactive UI:** A clean and responsive layout built with Bootstrap.
* **Animations:** Smooth animations for dropping discs and highlighting winning moves.
* **Game Over Notifications:** A modal window clearly announces the winner or a draw.
* **Replayability:** Easily start a new game with the "New Game" or "Play Again" buttons.

---

## 🛠️ Tech Stack

* **Backend:**
    * [Flask](https://flask.palletsprojects.com/) - A lightweight Python web framework.
* **Frontend:**
    * [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
    * [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
    * [JavaScript (ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* **Styling:**
    * [Bootstrap 5](https://getbootstrap.com/) - For responsive design and UI components.

---

## 📂 Project Structure

The project follows a standard Flask application structure:

```
ConnectFourChallenge/
├── main.py                 # The Flask application core
├── static/
│   ├── css/
│   │   └── styles.css      # Custom styles and animations
│   └── js/
│       └── game.js         # All game logic
└── templates/
    └── index.html          # The main HTML page for the game
```

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Python 3 and pip installed on your system.
* [Python 3](https://www.python.org/downloads/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/ConnectFourChallenge.git](https://github.com/your-username/ConnectFourChallenge.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd ConnectFourChallenge
    ```
3.  **Create and activate a virtual environment:**
    * On Windows:
        ```sh
        python -m venv venv
        venv\Scripts\activate
        ```
    * On macOS & Linux:
        ```sh
        python3 -m venv venv
        source venv/bin/activate
        ```
4.  **Install the required packages:**
    ```sh
    pip install Flask
    ```
5.  **Run the Flask application:**
    ```sh
    python main.py
    ```
6.  **Open your browser** and navigate to:
    ```
    [http://127.0.0.1:5000](http://127.0.0.1:5000)
    ```

---

## 🎮 How to Play

1.  The game starts with "Your Turn." You are the **red** player.
2.  Click on any of the seven columns to drop your disc into the lowest available slot.
3.  The computer (the **yellow** player) will then make its move.
4.  The first player to connect four of their discs in a row—horizontally, vertically, or diagonally—wins the game!
5.  If the board fills up with no winner, the game is a draw.
6.  Click the "New Game" button at any time to restart.

Enjoy the game!

---