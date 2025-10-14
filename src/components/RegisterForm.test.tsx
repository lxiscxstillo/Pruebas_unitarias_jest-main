import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterForm from "./RegisterForm";

describe("RegisterForm Component", () => {
  beforeEach(() => {
    render(<RegisterForm />);
  });

  test("renders form elements correctly", () => {
    expect(screen.getByText("Formulario de Registro")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre completo")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Registrar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Limpiar/i })).toBeInTheDocument();
  });

  test("submit button is disabled when fields are empty", () => {
    const submitButton = screen.getByRole("button", { name: /Registrar/i });
    expect(submitButton).toBeDisabled();
  });

  test("submit button is disabled when name field is empty", () => {
    const emailInput = screen.getByLabelText("Correo electrónico");
    const submitButton = screen.getByRole("button", { name: /Registrar/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(submitButton).toBeDisabled();
  });

  test("submit button is disabled when email field is empty", () => {
    const nameInput = screen.getByLabelText("Nombre completo");
    const submitButton = screen.getByRole("button", { name: /Registrar/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(submitButton).toBeDisabled();
  });

  test("submit button is enabled when both fields are filled", () => {
    const nameInput = screen.getByLabelText("Nombre completo");
    const emailInput = screen.getByLabelText("Correo electrónico");
    const submitButton = screen.getByRole("button", { name: /Registrar/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(submitButton).toBeEnabled();
  });

  test("shows validation errors for empty fields", async () => {
    const submitButton = screen.getByRole("button", { name: /Registrar/i });
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
      expect(screen.getByText("El email es requerido")).toBeInTheDocument();
    });
  });

  test("shows validation error for invalid email format", async () => {
    const nameInput = screen.getByLabelText("Nombre completo");
    const emailInput = screen.getByLabelText("Correo electrónico");
    const submitButton = screen.getByRole("button", { name: /Registrar/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("El email no es válido")).toBeInTheDocument();
    });
  });

  test("clears validation errors when user starts typing", async () => {
    const nameInput = screen.getByLabelText("Nombre completo");
    const submitButton = screen.getByRole("button", { name: /Registrar/i });

    // Trigger validation error
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
    });

    // Start typing to clear error
    fireEvent.change(nameInput, { target: { value: "J" } });

    await waitFor(() => {
      expect(screen.queryByText("El nombre es requerido")).not.toBeInTheDocument();
    });
  });

  test("shows success message and clears form after successful submission", async () => {
    const nameInput = screen.getByLabelText("Nombre completo");
    const emailInput = screen.getByLabelText("Correo electrónico");
    const submitButton = screen.getByRole("button", { name: /Registrar/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/¡Registro exitoso!/)).toBeInTheDocument();
    });

    // Check that form is cleared
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  });

  test("reset button clears form and success message", async () => {
    const nameInput = screen.getByLabelText("Nombre completo");
    const emailInput = screen.getByLabelText("Correo electrónico");
    const submitButton = screen.getByRole("button", { name: /Registrar/i });
    const resetButton = screen.getByRole("button", { name: /Limpiar/i });

    // Fill form and submit
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/¡Registro exitoso!/)).toBeInTheDocument();
    });

    // Reset form
    fireEvent.click(resetButton);

    // Check that everything is cleared
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(screen.queryByText(/¡Registro exitoso!/)).not.toBeInTheDocument();
  });

  test("validates email format correctly", async () => {
    const nameInput = screen.getByLabelText("Nombre completo");
    const emailInput = screen.getByLabelText("Correo electrónico");
    const submitButton = screen.getByRole("button", { name: /Registrar/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    // Test invalid email formats
    const invalidEmails = ["invalid", "@invalid.com", "invalid@", "invalid.com"];
    
    for (const email of invalidEmails) {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("El email no es válido")).toBeInTheDocument();
      });

      // Clear error for next test
      fireEvent.change(emailInput, { target: { value: "" } });
    }

    // Test valid email
    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("El email no es válido")).not.toBeInTheDocument();
    });
  });

  test("submit button becomes disabled after form is cleared", () => {
    const nameInput = screen.getByLabelText("Nombre completo");
    const emailInput = screen.getByLabelText("Correo electrónico");
    const submitButton = screen.getByRole("button", { name: /Registrar/i });
    const resetButton = screen.getByRole("button", { name: /Limpiar/i });

    // Fill form
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    expect(submitButton).toBeEnabled();

    // Clear form
    fireEvent.click(resetButton);
    expect(submitButton).toBeDisabled();
  });
});
