import React from 'react';
import './Hangman.css';

export const Hangman = ({ incorrectGuesses }) => {
    return (
        <div className='hangman'>
            {incorrectGuesses.map((letter, index) => {
                const myId = 'a' + (index + 1);
                return <div key={myId} id={myId}></div>;
            })}
        </div>
    );
};
