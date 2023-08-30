import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import 'intersection-observer'
import Videogames from "../components/videogames/Videogames";
import { Provider } from "react-redux";
import { store } from "../store/store";

describe("<Videogames />", () => {
  test("Should render properly", () => {
    render(<Provider store={store}><Videogames genre={'Action'} platform={'PC'} rating={'DESC'}/></Provider>);
    
    expect(screen.getByText(/Games/i)).toBeDefined()
  });
});
