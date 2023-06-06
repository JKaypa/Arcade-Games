export interface Game {
  name: string;
  genres?: string[];
  platforms: string[];
  rating: string;
  released?: string;
  description?: string;
  image?: string;
}

interface platforms {
  platform: {name: string}
}

interface genres {
  name: string;
}

export interface apiGame {
  id?: string
  name: string;
  background_image: string;
  genres: genres[];
  platforms: platforms[];
  rating: string;
  released: string;
  description: string;
}

export type Query =
  | string
  | string[]
  | QueryString.ParsedQs
  | QueryString.ParsedQs[]
  | undefined;

export interface Response {
results: apiGame[]
} 