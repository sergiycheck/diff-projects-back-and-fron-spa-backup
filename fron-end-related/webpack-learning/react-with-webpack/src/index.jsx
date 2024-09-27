import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AnimeGirlStepOnYou from "./assets/anime_girl_step_on_you.jpeg";
import AnimeGirlFeet1 from "./assets/anime-feet.jpeg";
import { BookLibraryXML } from "./components/book-library/book-library-1";
import { BookLibraryCsv } from "./components/book-library/book-library-2";

function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>Hello, React!</h1>
      <h2>Count is {count}! </h2>
      <button onClick={() => setCount((count) => count + 1)}>Click me</button>

      <p>Anime girl 1</p>
      <img className="general-img" src={AnimeGirlFeet1} alt="anime girl before footjob" />

      <p>Anime girl 2</p>
      <img className="general-img" src={AnimeGirlStepOnYou} alt="anime girl step on you" />

      <BookLibraryCsv />
      <BookLibraryXML />
    </div>
  );
}

if (module.hot) {
  module.hot.accept();
}

let container = null;

document.addEventListener("DOMContentLoaded", function (event) {
  if (!container) {
    container = document.getElementById("root");
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
});
