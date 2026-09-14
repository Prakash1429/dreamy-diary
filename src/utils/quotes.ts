import type { MotivationalQuote } from '../types';

export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    quote: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller"
  },
  {
    quote: "We do not remember days, we remember moments.",
    author: "Cesare Pavese"
  },
  {
    quote: "Collect dreams. Live moments. Keep memories.",
    author: "Dreamy Diary"
  },
  {
    quote: "Every sunset is an opportunity to reset. Every sunrise is a new dream.",
    author: "Unknown"
  },
  {
    quote: "Memories are the architecture of our heart.",
    author: "Anonymous"
  },
  {
    quote: "The best thing about memories is making them.",
    author: "Unknown"
  },
  {
    quote: "Dream big, start small, act now, remember forever.",
    author: "Robin Sharma"
  },
  {
    quote: "To live is the rarest thing in the world. Most people exist, that is all.",
    author: "Oscar Wilde"
  },
  {
    quote: "Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly.",
    author: "Langston Hughes"
  }
];

export const getRandomQuote = (): MotivationalQuote => {
  const index = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
  return MOTIVATIONAL_QUOTES[index];
};
