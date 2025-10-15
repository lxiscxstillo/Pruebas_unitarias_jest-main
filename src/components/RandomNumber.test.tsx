import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RandomNumber from "./RandomNumber";

describe("RandomNumber Component", () => {
  beforeEach(() => {
    // Mock Math.random to return predictable values
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders initial state correctly", () => {
    render(<RandomNumber />);
    
    expect(screen.getByText("Generador de Números Aleatorios")).toBeInTheDocument();
    expect(screen.getByText("Haz clic para generar un número aleatorio")).toBeInTheDocument();
    expect(screen.getByText("Rango: 1 - 100")).toBeInTheDocument();
    expect(screen.queryByText(/Número generado:/)).not.toBeInTheDocument();
  });

  test("shows number after clicking the button", () => {
    (Math.random as jest.Mock).mockReturnValue(0.49); // This will generate 50 (0.49 * 100 + 1 = 50)
    
    render(<RandomNumber />);
    
    const button = screen.getByRole("button", { name: /Generar Número Aleatorio/i });
    fireEvent.click(button);
    
    expect(screen.getByText("Número generado:")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.queryByText("Haz clic para generar un número aleatorio")).not.toBeInTheDocument();
  });

  test("generates number within valid range [1,100]", () => {
    const testCases = [
      { randomValue: 0, expected: 1 },
      { randomValue: 0.99, expected: 100 },
      { randomValue: 0.49, expected: 50 }
    ];

    testCases.forEach(({ randomValue, expected }) => {
      (Math.random as jest.Mock).mockReturnValue(randomValue);
      
      const { unmount } = render(<RandomNumber />);
      
      const button = screen.getByRole("button", { name: /Generar Número Aleatorio/i });
      fireEvent.click(button);
      
      expect(screen.getByText(expected.toString())).toBeInTheDocument();
      
      unmount();
    });
  });

  test("generates different numbers on multiple clicks", () => {
    // First click generates 25
    (Math.random as jest.Mock).mockReturnValueOnce(0.24);
    
    render(<RandomNumber />);
    
    const button = screen.getByRole("button", { name: /Generar Número Aleatorio/i });
    fireEvent.click(button);
    
    expect(screen.getByText("25")).toBeInTheDocument();
    
    // Second click generates 75
    (Math.random as jest.Mock).mockReturnValueOnce(0.74);
    
    fireEvent.click(button);
    
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  test("button is always enabled", () => {
    render(<RandomNumber />);
    
    const button = screen.getByRole("button", { name: /Generar Número Aleatorio/i });
    expect(button).toBeEnabled();
  });
});
