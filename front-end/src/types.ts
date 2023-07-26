import React from "react";

export interface State {
  videogames: Videogame[];
  videogamesBackup: Videogame[];
  videogameDetail: Videogame | null;
  message: string
}

 
export interface Videogame {
  id?: string | number,
  name: string,
  image: File | string,
  platforms: string[],
  genres: string[],
  rating: string,
  released: string,
  description: string
}


export interface Props {
  handleChange:(event: React.ChangeEvent<HTMLSelectElement>) => void,
  render?: boolean,
  genres?: string,
  platforms?: string
}


export interface FormProps {
  name: string,
  rating: string,
  image: string | File,
  genres: string[],
  platforms: string[],
  released: string,
  description: string,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  handleOptions:(event: React.ChangeEvent<HTMLSelectElement>) => void,
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void,
  handleForm: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
  handleImg: (event: React.ChangeEvent<HTMLInputElement>) => void
}


export interface Options {
  name: string,
  value: string
}