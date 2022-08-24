import { useState, useEffect, useRef } from 'react';
import './App.css';
import { words } from './words';
import { Hangman } from './components/Hangman';

let randomIndex = Math.floor(Math.random() * words.length);
let answer = words[randomIndex].toUpperCase();

function App() {
  const answerArr = answer.split('');
  const [guess, setGuess] = useState('');
  const [lettersGuessed, setLettersGuessed] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [output, setOutput] = useState([]);
  const [isStarted, setIsStarted] = useState(true);
  const [alert, setAlert] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    setOutput((answerArr.map((letter) => {
      if (lettersGuessed.includes(letter)) return letter;
      return '_';
    })).join(''));
    if (output === answer || incorrectGuesses.length === 10) {
      setIsStarted(false);
    }
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    setAlert('');
    e.preventDefault();
    if (!/[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]/.test(guess)) {
      setAlert('spėk raidę');
      setTimeout(() => {
        setAlert('');
        setGuess('');
      }, 1000);
      return;
    }
    if (lettersGuessed.includes(guess) || incorrectGuesses.includes(guess)) {
      setAlert('tokią raidę jau spėjai');
      setTimeout(() => {
        setAlert('');
        setGuess('');
      }, 1000);
      return;
    }
    if (answer.includes(guess)) {
      setLettersGuessed([...lettersGuessed, guess]);
    } else if (!incorrectGuesses.includes(guess)) {
      setIncorrectGuesses([...incorrectGuesses, guess]);
    }
    setGuess('');
  };

  const playAgain = () => {
    setLettersGuessed([]);
    setIncorrectGuesses([]);
    setOutput([]);
    setIsStarted(true);
    randomIndex = Math.floor(Math.random() * words.length);
    answer = words[randomIndex].toUpperCase();
  };

  return (
    <div className='display'>
      {isStarted
        ? (
          <div className='game'>
            <h1 className='heading'>Atspėk paslėptą žodį</h1>
            <div className='output'>{output}</div>
            <form className='input-form' onSubmit={handleSubmit}>
              <span>Spėk raidę:</span>
              <input className='input-letter' type="text" maxLength='1' placeholder='_' value={guess} ref={inputRef} onChange={(e) => setGuess(e.target.value.toUpperCase())} />
            </form>
            <p className='alert'>{alert}</p>
            {incorrectGuesses.length > 0 && <p className='incorrect-guesses'>Neteisingi spėjimai: <span>{incorrectGuesses}</span></p>}
          </div>)
        : (
          <div className='game-over'>
            <h1 className='heading'>Paslėptas žodis buvo:</h1>
            {output === answer && <div className='output win'>{answer}</div>}
            {incorrectGuesses.length === 10 && <div className='output lose'>{answer}</div>}
            <div className='play-again' onClick={playAgain}>Spėti dar vieną žodį</div>
          </div>)
      }
      <Hangman incorrectGuesses={incorrectGuesses} />
    </div>
  );
}

export default App;
