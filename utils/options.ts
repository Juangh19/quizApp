export type Options = {
  category: Category;
  difficulty: Difficulty;
  type: Type;
};

export type Category =
  | 'Sports'
  | 'History'
  | 'Politics'
  | 'Geography'
  | 'Art'
  | 'Celebrities';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Type = 'Multiple Choice' | 'True / False';

export const categories: Category[] = [
  'Sports',
  'History',
  'Politics',
  'Geography',
  'Art',
  'Celebrities',
];

export const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export const types: Type[] = ['Multiple Choice', 'True / False'];
