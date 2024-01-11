// import { buildLetter, Wordle } from '../src/wordle.js';
import { jest } from '@jest/globals';

const mockIsWord = jest.fn(() => true);
jest.unstable_mockModule('../src/words.js', () => {
  return {
    getWord: jest.fn(() => 'APPLE'),
    isWord: mockIsWord,
  };
});

const { Wordle, buildLetter } = await import('../src/wordle.js');

describe('building a letter object', () => {
  test('returns a letter object', () => {
    const letter = buildLetter('string1', 'string2');
    expect(letter).toEqual({ letter: 'string1', status: 'string2' });
  });
});

describe('constructing a new Wordle game', () => {
  test('sets maxGuesses to 6', () => {
    const newWord = new Wordle();
    expect(newWord.maxGuesses).toBe(6);
  });
  test('sets maxGuesses to argument passed', () => {
    const newWord10 = new Wordle(10);
    expect(newWord10.maxGuesses).toBe(10);
  });
  test('sets guesses to an array of length maxGuesses', () => {
    const newWord = new Wordle();
    expect(newWord.guesses.length).toEqual(newWord.maxGuesses);
  });
  test('sets currGuess to 0', () => {
    const newWord = new Wordle();
    expect(newWord.currGuess).toEqual(0);
  });
  test('sets word to a word from getWord', () => {
    const newWord = new Wordle();
    expect(newWord);
  });
  test('check that the value of its word property is APPLE', () => {
    const newWord = new Wordle();
    expect(newWord.word).toEqual('APPLE');
  });
});

describe('test that the buildGuessFromWord', () => {
  test('sets the status of a correct letter to CORRECT', () => {
    const newWord = new Wordle();
    const guess = newWord.buildGuessFromWord('A____');
    expect(guess[0].status).toBe('CORRECT');
  });
  test('sets the status of a present letter to PRESENT', () => {
    const newWord = new Wordle();
    const guess = newWord.buildGuessFromWord('E____');
    expect(guess[0].status).toBe('PRESENT');
  });
  test('sets the status of an absent word to ABSENT', () => {
    const newWord = new Wordle();
    const guess = newWord.buildGuessFromWord('T____');
    expect(guess[0].status).toBe('ABSENT');
  });
});

describe('test that appendGuess', () => {
  test('throws an error if no more guesses are allowed', () => {
    const newWord = new Wordle(1);
    newWord.appendGuess('GUESS');
    expect(() => newWord.appendGuess('GUESS')).toThrow();
  });
  test('throws an error if guess length is not 5', () => {
    const newWord = new Wordle();
    expect(() => newWord.appendGuess('GUES')).toThrow();
  });
  test('throws an error if the guess is not a word', () => {
    const newWord = new Wordle();
    mockIsWord.mockReturnValueOnce(false);
    expect(() => newWord.appendGuess('GUESS')).toThrow();
  });
  test('that it increments the current guess', () => {
    const newWord = new Wordle();
    newWord.appendGuess('GUESS');
    expect(newWord.currGuess).toEqual(1);
  });
});

describe('test that isSolved', () => {
  test('returns true if the latest guess is correct', () => {
    const wordle = new Wordle();
    wordle.appendGuess('APPLE');
    expect(wordle.isSolved()).toBe(true);
  });
  test('returns false if the latest guess is not correct', () => {
    const worlde = new Wordle();
    worlde.appendGuess('GUESS');
    expect(worlde.isSolved()).toBe(false);
  });
});

describe('test that shouldEndGame', () => {
  test('returns true if the latest guess is the correct word', () => {
    const wordle = new Wordle();
    wordle.appendGuess('APPLE');
    expect(wordle.shouldEndGame()).toBe(true);
  });
  test('returns true if there are no more guesses left', () => {
    const wordle = new Wordle(1);
    wordle.appendGuess('GUESS');
    expect(wordle.shouldEndGame()).toBe(true);
  });
  test('returns false if no guess has been made', () => {
    const wordle = new Wordle();
    expect(wordle.shouldEndGame()).toBe(false);
  });
  test('return false if there are guesses left and the word has not been guessed', () => {
    const wordle = new Wordle();
    wordle.appendGuess('GUESS');
    expect(wordle.shouldEndGame()).toBe(false);
  });
});
