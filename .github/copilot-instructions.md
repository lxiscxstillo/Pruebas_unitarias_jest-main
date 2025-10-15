# Instrucciones para Agentes de IA - Aplicativo React con Jest

## Arquitectura y Estructura

Este es un proyecto de React + Vite enfocado en pruebas unitarias con Jest. La estructura sigue un patrón claro:

- `/src/components/`: Componentes reutilizables con sus pruebas correspondientes
- `/src/views/`: Páginas/vistas que utilizan los componentes
- `/src/routes/`: Configuración de rutas con React Router

### Patrones Clave

1. **Convención de Pruebas**
   - Cada componente tiene su archivo de prueba correspondiente con extensión `.test.tsx`
   - Ejemplo: `ClickCounter.tsx` → `ClickCounter.test.tsx`
   - Las pruebas usan React Testing Library y siguen el patrón AAA (Arrange-Act-Assert)

2. **Estado Local y Persistencia**
   - Se usa `localStorage` para persistencia de datos (ver `ClickCounter.tsx`)
   - Las pruebas incluyen mocks de `localStorage` en `beforeEach`

```typescript
// Ejemplo de mock de localStorage en pruebas
beforeEach(() => {
  let store: Record<string, string> = {};
  const localStorageMock = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; }
  };
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
});
```

## Flujos de Desarrollo

### Comandos Esenciales
- `npm run dev`: Inicia servidor de desarrollo
- `npm test`: Ejecuta pruebas unitarias
- `npm run type-check`: Verifica tipos TypeScript
- `npm run lint`: Ejecuta ESLint
- `npm run format`: Formatea código con Prettier

### Añadir Nuevo Componente
1. Crear archivo componente en `/src/components/`
2. Crear archivo de prueba con mismo nombre + `.test.tsx`
3. Importar y configurar en una vista en `/src/views/`
4. Actualizar rutas en `AppRoutes.tsx` si es necesario

## Tecnologías Clave
- React + Vite
- TypeScript
- Jest + React Testing Library
- TailwindCSS para estilos

## Patrones de Prueba

### Interacciones de Usuario
```typescript
// Patrón común para probar interacciones
const button = screen.getByRole("button", { name: /texto del botón/i });
fireEvent.click(button);
expect(screen.getByText(/resultado esperado/i)).toBeInTheDocument();
```

### Validación de Formularios
Ver `PasswordValidator.test.tsx` y `RegisterForm.test.tsx` para ejemplos de pruebas de validación.

### Conversión de Unidades
Ver `UnitConverter.test.tsx` para ejemplos de pruebas de lógica de conversión.