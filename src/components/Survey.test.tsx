import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Survey from "./Survey";

describe("Survey Component", () => {
  beforeEach(() => {
    render(<Survey />);
  });

  test("renders all 5 star options", () => {
    expect(screen.getByText("Encuesta de Satisfacción")).toBeInTheDocument();
    expect(screen.getByText("¿Cómo calificarías nuestro servicio?")).toBeInTheDocument();
    
    // Check that all 5 stars are rendered
    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(5);
  });

  test("renders submit and reset buttons", () => {
    expect(screen.getByRole("button", { name: /Enviar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reiniciar/i })).toBeInTheDocument();
  });

  test("submit button is disabled when no rating is selected", () => {
    const submitButton = screen.getByRole("button", { name: /Enviar/i });
    expect(submitButton).toBeDisabled();
  });

  test("reflects selected rating in state", () => {
    const starInputs = screen.getAllByRole("radio");
    const firstStar = starInputs[0];
    
    fireEvent.click(firstStar);
    
    expect(screen.getByText(/Has seleccionado:/)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText(/estrella/)).toBeInTheDocument();
    
    const submitButton = screen.getByRole("button", { name: /Enviar/i });
    expect(submitButton).toBeEnabled();
  });

  test("shows correct text for multiple stars", () => {
    const starInputs = screen.getAllByRole("radio");
    const thirdStar = starInputs[2];
    
    fireEvent.click(thirdStar);
    
    expect(screen.getByText(/Has seleccionado:/)).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText(/estrellas/)).toBeInTheDocument();
  });

  test("shows confirmation message with rating after submission", () => {
    const starInputs = screen.getAllByRole("radio");
    const fourthStar = starInputs[3];
    
    fireEvent.click(fourthStar);
    
    const submitButton = screen.getByRole("button", { name: /Enviar/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/¡Gracias por tu evaluación!/)).toBeInTheDocument();
    expect(screen.getByText(/Has calificado con 4 estrellas/)).toBeInTheDocument();
  });

  test("reset button clears selection and confirmation", () => {
    const starInputs = screen.getAllByRole("radio");
    const secondStar = starInputs[1];
    
    // Select rating and submit
    fireEvent.click(secondStar);
    const submitButton = screen.getByRole("button", { name: /Enviar/i });
    fireEvent.click(submitButton);
    
    // Verify confirmation is shown
    expect(screen.getByText(/¡Gracias por tu evaluación!/)).toBeInTheDocument();
    
    // Reset
    const resetButton = screen.getByRole("button", { name: /Reiniciar/i });
    fireEvent.click(resetButton);
    
    // Verify everything is cleared
    expect(screen.queryByText(/Has seleccionado:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/¡Gracias por tu evaluación!/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enviar/i })).toBeDisabled();
  });

  test("can change rating selection", () => {
    const starInputs = screen.getAllByRole("radio");
    
    // Select first star
    fireEvent.click(starInputs[0]);
    expect(screen.getByText(/Has seleccionado:/)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    
    // Select third star
    fireEvent.click(starInputs[2]);
    expect(screen.getByText(/Has seleccionado:/)).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  test("submit button becomes enabled after selecting any rating", () => {
    const starInputs = screen.getAllByRole("radio");
    const submitButton = screen.getByRole("button", { name: /Enviar/i });
    
    expect(submitButton).toBeDisabled();
    
    fireEvent.click(starInputs[0]);
    expect(submitButton).toBeEnabled();
  });
});
