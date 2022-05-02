import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [quote, setQuote] = useState('');
  const [word, setWord] = useState('');
  const [definitions, setDefinitions] = useState([]);

  useEffect(() => {
    fetch('https://quotes.rest/qod?language=en')
    .then(response => response.json())
    .then(result => setQuote(result.contents.quotes[0]))
  })

  function handleWordChange(e) {
    setWord(e.target.value)
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(result => setDefinitions(result[0].meanings[0].definitions))
    // .then(result => console.log(result[0].meanings[0].definitions))
  }

  return (
    <div>
      <div>
        <h1>Dictionary App!</h1>
        <h3>Quote of the Day:</h3>
        <p>"{quote.quote}"</p>
        <p>- {quote.author}</p>
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
        type="text"
        name="word"
        label="word"
        value={word}
        onChange={handleWordChange}
        />
        <button type='submit'>submit</button>
      </form>
      <div>
        {definitions.map((def, index) => (
          <p key={index}>{def.definition}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
