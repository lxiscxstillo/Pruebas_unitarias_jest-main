import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RandomNumber from "./RandomNumber";

// Mock Math.random to control random number generation
const mockMath = Object.create(global.Math);
global.Math = mockMath;

describe("RandomNumber Component", () => {
  beforeEach(() => {
    mockMath.random = jest.fn();
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
    mockMath.random.mockReturnValue(0.5); // This will generate 50
    mockMath.floor = jest.fn().mockReturnValue(49);
    
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
      { randomValue: 0.5, expected: 51 }
    ];

    testCases.forEach(({ randomValue, expected }) => {
      mockMath.random.mockReturnValue(randomValue);
      mockMath.floor = jest.fn().mockReturnValue(expected - 1);
      
      render(<RandomNumber />);
      
      const button = screen.getByRole("button", { name: /Generar Número Aleatorio/i });
      fireEvent.click(button);
      
      expect(screen.getByText(expected.toString())).toBeInTheDocument();
    });
  });

  test("generates different numbers on multiple clicks", () => {
    // First click generates 25
    mockMath.random.mockReturnValueOnce(0.24);
    mockMath.floor = jest.fn().mockReturnValueOnce(24);
    
    render(<RandomNumber />);
    
    const button = screen.getByRole("button", { name: /Generar Número Aleatorio/i });
    fireEvent.click(button);
    
    expect(screen.getByText("25")).toBeInTheDocument();
    
    // Second click generates 75
    mockMath.random.mockReturnValueOnce(0.74);
    mockMath.floor = jest.fn().mockReturnValueOnce(74);
    
    fireEvent.click(button);
    
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  test("button is always enabled", () => {
    render(<RandomNumber />);
    
    const button = screen.getByRole("button", { name: /Generar Número Aleatorio/i });
    expect(button).toBeEnabled();
  });
});
