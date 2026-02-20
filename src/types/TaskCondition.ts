export type Season = 'spring' | 'summer' | 'fall' | 'winter';
export type Weather = 'sunny' | 'rain' | 'storm' | 'snow';
export type Location = 'farm' | 'mountain' | 'mountain_lake' |  'beach' | 'forest' | 'mutant_bug_lair' | string;

export interface TaskCondition {
    seasons?: Season[];
    weather?: Weather[];
    locations?: Location[];
    time?: { start: number; end: number }[];
}
