import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShoppingCart from "./ShoppingCart";

describe("ShoppingCart Component", () => {
  beforeEach(() => {
    render(<ShoppingCart />);
  });

  test("renders product list and empty cart initially", () => {
    expect(screen.getByText("Carrito de Compras")).toBeInTheDocument();
    expect(screen.getByText("Productos Disponibles")).toBeInTheDocument();
    expect(screen.getByText("Mi Carrito")).toBeInTheDocument();
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });

  test("displays all available products with prices", () => {
    const products = [
      { name: "Laptop", price: "$999.99" },
      { name: "Mouse", price: "$29.99" },
      { name: "Teclado", price: "$79.99" },
      { name: "Monitor", price: "$299.99" },
      { name: "Auriculares", price: "$149.99" }
    ];

    products.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.price)).toBeInTheDocument();
    });
  });

  test("cart starts empty with correct total", () => {
    expect(screen.getByText("0 artículos")).toBeInTheDocument();
    expect(screen.queryByText(/Total:/)).not.toBeInTheDocument();
  });

  test("adds product to cart and increases total", () => {
    const addButtons = screen.getAllByText("Agregar al carrito");
    fireEvent.click(addButtons[0]); // Add Laptop

    expect(screen.queryByText("Tu carrito está vacío")).not.toBeInTheDocument();
    const laptopElements = screen.getAllByText("Laptop");
    expect(laptopElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/1.*artículo/)).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
    const laptopTotalElements = screen.getAllByText("$999.99");
    expect(laptopTotalElements.length).toBeGreaterThan(0);
  });

  test("increases quantity when adding same product multiple times", () => {
    const addButtons = screen.getAllByText("Agregar al carrito");
    
    // Add Mouse twice
    fireEvent.click(addButtons[1]); // Mouse
    fireEvent.click(addButtons[1]); // Mouse again

    expect(screen.getByText(/2.*artículos/)).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
    const mouseDoubleTotalElements = screen.getAllByText("$59.98");
    expect(mouseDoubleTotalElements.length).toBeGreaterThan(0);
    
    // Check that quantity shows 2
    const quantityDisplay = screen.getByText("2");
    expect(quantityDisplay).toBeInTheDocument();
  });

  test("calculates total price correctly for multiple different products", () => {
    const addButtons = screen.getAllByText("Agregar al carrito");
    
    fireEvent.click(addButtons[0]); // Laptop ($999.99)
    fireEvent.click(addButtons[1]); // Mouse ($29.99)
    fireEvent.click(addButtons[2]); // Teclado ($79.99)

    const expectedTotal = (999.99 + 29.99 + 79.99).toFixed(2);
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
    const totalElements = screen.getAllByText(`$${expectedTotal}`);
    expect(totalElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/3.*artículos/)).toBeInTheDocument();
  });

  test("removes product from cart and updates total", () => {
    const addButtons = screen.getAllByText("Agregar al carrito");
    fireEvent.click(addButtons[0]); // Add Laptop

    expect(screen.getByText(/Total:/)).toBeInTheDocument();
    const laptopTotalElements = screen.getAllByText("$999.99");
    expect(laptopTotalElements.length).toBeGreaterThan(0);

    const removeButton = screen.getByText("Eliminar");
    fireEvent.click(removeButton);

    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
    expect(screen.getByText("0 artículos")).toBeInTheDocument();
    expect(screen.queryByText(/Total:/)).not.toBeInTheDocument();
  });

  test("updates quantity with + and - buttons", () => {
    const addButtons = screen.getAllByText("Agregar al carrito");
    fireEvent.click(addButtons[1]); // Add Mouse

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
    const mouseTotalElements = screen.getAllByText("$29.99");
    expect(mouseTotalElements.length).toBeGreaterThan(0);

    // Increase quantity
    const plusButton = screen.getAllByText("+")[0];
    fireEvent.click(plusButton);

    expect(screen.getByText("2 artículos")).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
    const mouseDoubleTotalElements = screen.getAllByText("$59.98");
    expect(mouseDoubleTotalElements.length).toBeGreaterThan(0);

    // Decrease quantity
    const minusButton = screen.getAllByText("-")[0];
    fireEvent.click(minusButton);

    expect(screen.getByText(/1.*artículo/)).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
    const mouseTotalElementsAfterDecrease = screen.getAllByText("$29.99");
    expect(mouseTotalElementsAfterDecrease.length).toBeGreaterThan(0);
  });

  test("removes product when quantity reaches zero", () => {
    const addButtons = screen.getAllByText("Agregar al carrito");
    fireEvent.click(addButtons[1]); // Add Mouse

    const minusButton = screen.getAllByText("-")[0];
    fireEvent.click(minusButton);

    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
    expect(screen.getByText("0 artículos")).toBeInTheDocument();
  });

  test("displays correct item count for multiple quantities", () => {
    const addButtons = screen.getAllByText("Agregar al carrito");
    
    fireEvent.click(addButtons[0]); // Laptop (1)
    fireEvent.click(addButtons[1]); // Mouse (1)
    fireEvent.click(addButtons[1]); // Mouse (2)

    expect(screen.getByText(/3.*artículos/)).toBeInTheDocument();
  });

  test("shows product details correctly in cart", () => {
    const addButtons = screen.getAllByText("Agregar al carrito");
    fireEvent.click(addButtons[1]); // Add Mouse

    // Use getAllByText to get all Mouse elements and check the one in the cart
    const mouseElements = screen.getAllByText("Mouse");
    expect(mouseElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText("$29.99 c/u")).toBeInTheDocument();
    // Check quantity in cart (should be the span with "1")
    const quantityElement = screen.getByText("1");
    expect(quantityElement).toBeInTheDocument();
  });
});
