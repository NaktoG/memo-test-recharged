import type { Category } from '../domain/entities/category';
import type { LevelId } from '../domain/entities/level';

export type Locale = 'es' | 'en';

export interface TranslationDictionary {
  readonly lab: string;
  readonly title: string;
  readonly subtitle: string;
  readonly welcomeTitle: string;
  readonly welcomeSubtitle: string;
  readonly nicknameLabel: string;
  readonly nicknamePlaceholder: string;
  readonly languageLabel: string;
  readonly soundLabel: string;
  readonly enterGame: string;
  readonly nicknameError: string;
  readonly configureTitle: string;
  readonly configureSubtitle: string;
  readonly categoryLabel: string;
  readonly levelLabel: string;
  readonly startGame: string;
  readonly preview: string;
  readonly pairs: string;
  readonly time: string;
  readonly moves: string;
  readonly mistakes: string;
  readonly revealedCard: string;
  readonly revealCard: string;
  readonly victoryUnlocked: string;
  readonly timeExpired: string;
  readonly winner: string;
  readonly gameOver: string;
  readonly wonSummary: string;
  readonly lostSummary: string;
  readonly playAgain: string;
  readonly changeSettings: string;
  readonly score: string;
  readonly stats: string;
  readonly progress: string;
  readonly reset: string;
  readonly played: string;
  readonly winRate: string;
  readonly won: string;
  readonly lost: string;
  readonly streak: string;
  readonly bestStreak: string;
  readonly activeBest: string;
  readonly bestScore: string;
  readonly greeting: string;
  readonly changePlayer: string;
  readonly categories: Record<Category['id'], { readonly name: string; readonly description: string }>;
  readonly levels: Record<LevelId, string>;
}

export const dictionaries: Record<Locale, TranslationDictionary> = {
  es: {
    lab: 'Astro Memory Lab',
    title: 'Memo Test',
    subtitle: 'Encuentra pares, vence al reloj y sube tus mejores marcas en una experiencia responsive, accesible y animada.',
    welcomeTitle: 'Entra al laboratorio',
    welcomeSubtitle: 'Usa un nickname simple para personalizar la partida. Se guarda solo en este navegador.',
    nicknameLabel: 'Nickname',
    nicknamePlaceholder: 'Ej: Nakto',
    languageLabel: 'Idioma',
    soundLabel: 'Sonido',
    enterGame: 'Entrar al juego',
    nicknameError: 'Ingresa entre 2 y 16 caracteres.',
    configureTitle: 'Configura tu desafio',
    configureSubtitle: 'Elige una categoria y una dificultad. La partida se genera desde reglas de dominio puras y sin mutar datos base.',
    categoryLabel: 'Categoria',
    levelLabel: 'Dificultad',
    startGame: 'Iniciar partida',
    preview: 'Preview',
    pairs: 'pares',
    time: 'Tiempo',
    moves: 'Movs',
    mistakes: 'Errores',
    revealedCard: 'Carta revelada',
    revealCard: 'Revelar carta',
    victoryUnlocked: 'Victoria desbloqueada',
    timeExpired: 'Tiempo agotado',
    winner: 'Winner',
    gameOver: 'Game Over',
    wonSummary: 'Completaste {level} en {time} con {moves} movimientos.',
    lostSummary: 'Llegaste a {moves} movimientos. Ajusta la estrategia y vuelve a intentarlo.',
    playAgain: 'Jugar de nuevo',
    changeSettings: 'Cambiar configuracion',
    score: 'Score',
    stats: 'Stats',
    progress: 'Tu progreso',
    reset: 'Reset',
    played: 'Jugadas',
    winRate: 'Win rate',
    won: 'Ganadas',
    lost: 'Perdidas',
    streak: 'Racha',
    bestStreak: 'Mejor racha',
    activeBest: 'Mejor marca activa',
    bestScore: 'Score',
    greeting: 'Jugador',
    changePlayer: 'Cambiar jugador',
    categories: {
      languages: { name: 'Lenguajes', description: 'Iconos de lenguajes de programacion clasicos y modernos.' },
      frameworks: { name: 'Frameworks', description: 'Frameworks y herramientas para construir productos digitales.' },
      tools: { name: 'Tools', description: 'Herramientas de desarrollo, productividad y plataformas.' },
    },
    levels: {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      expert: 'Expert',
    },
  },
  en: {
    lab: 'Astro Memory Lab',
    title: 'Memo Test',
    subtitle: 'Find pairs, beat the clock, and raise your best marks in a responsive, accessible, animated experience.',
    welcomeTitle: 'Enter the lab',
    welcomeSubtitle: 'Use a simple nickname to personalize the match. It is stored only in this browser.',
    nicknameLabel: 'Nickname',
    nicknamePlaceholder: 'E.g. Nakto',
    languageLabel: 'Language',
    soundLabel: 'Sound',
    enterGame: 'Enter game',
    nicknameError: 'Enter 2 to 16 characters.',
    configureTitle: 'Configure your challenge',
    configureSubtitle: 'Choose a category and difficulty. The match is generated from pure domain rules without mutating source data.',
    categoryLabel: 'Category',
    levelLabel: 'Difficulty',
    startGame: 'Start match',
    preview: 'Preview',
    pairs: 'pairs',
    time: 'Time',
    moves: 'Moves',
    mistakes: 'Mistakes',
    revealedCard: 'Revealed card',
    revealCard: 'Reveal card',
    victoryUnlocked: 'Victory unlocked',
    timeExpired: 'Time expired',
    winner: 'Winner',
    gameOver: 'Game Over',
    wonSummary: 'You completed {level} in {time} with {moves} moves.',
    lostSummary: 'You reached {moves} moves. Adjust the strategy and try again.',
    playAgain: 'Play again',
    changeSettings: 'Change settings',
    score: 'Score',
    stats: 'Stats',
    progress: 'Your progress',
    reset: 'Reset',
    played: 'Played',
    winRate: 'Win rate',
    won: 'Won',
    lost: 'Lost',
    streak: 'Streak',
    bestStreak: 'Best streak',
    activeBest: 'Active best',
    bestScore: 'Score',
    greeting: 'Player',
    changePlayer: 'Change player',
    categories: {
      languages: { name: 'Languages', description: 'Classic and modern programming language icons.' },
      frameworks: { name: 'Frameworks', description: 'Frameworks and tools for building digital products.' },
      tools: { name: 'Tools', description: 'Development, productivity, and platform tools.' },
    },
    levels: {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      expert: 'Expert',
    },
  },
};

export const interpolate = (template: string, values: Record<string, string | number>): string =>
  Object.entries(values).reduce((message, [key, value]) => message.replace(`{${key}}`, String(value)), template);
