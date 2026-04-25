# Documentación Técnica: Buscador Semántico (Frontend)

Este documento detalla el desarrollo de la interfaz de usuario para el buscador semántico, enfocándose en la experiencia de usuario (UX) y el diseño visual premium.

## 1. Concepto Visual: "Neural Void"

Para evitar la estética genérica de muchas aplicaciones de IA, se ha optado por una dirección artística denominada **"Neural Void"**.

- **Atmósfera**: Fondo oscuro profundo (`#05070a`) que evoca la profundidad del conocimiento y las redes neuronales.
- **Acentos**: Uso de cian neón (`#00f2ff`) para elementos de acción y violeta profundo (`#7000ff`) para estados secundarios.
- **Efecto Glassmorphism**: Las tarjetas de resultados utilizan un fondo translúcido con desenfoque de fondo (*backdrop-filter*) para crear una sensación de profundidad y capas.

---

## 2. Stack Tecnológico

- **Framework**: [React](https://reactjs.org/) (Vite como bundler por su velocidad).
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/) para transiciones fluidas y efectos de carga.
- **Iconografía**: [Lucide React](https://lucide.dev/) para iconos vectoriales limpios.
- **Estilos**: Vanilla CSS con variables personalizadas (CSS Variables) para mantener el control total sin dependencias externas pesadas.

---

## 3. Estructura del Proyecto

```text
frontend/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx    # Entrada de búsqueda y feedback
│   │   └── ResultsList.jsx  # Visualización de documentos y scores
│   ├── services/
│   │   └── api.js           # Comunicación con el backend (FastAPI)
│   ├── App.jsx              # Orquestador del estado y layout global
│   └── index.css            # Sistema de diseño (Tokens y tipografía)
```

---

## 4. Decisiones de Diseño y UX

### A. Tipografía Estratégica
Se han seleccionado dos fuentes de Google Fonts:
- **Syne**: Una fuente "display" audaz para títulos que proyecta modernidad y carácter.
- **Jakarta Sans**: Una fuente "body" altamente legible para el contenido de los documentos.

### B. Micro-interacciones
- **Staggered Animations**: Los resultados no aparecen de golpe; lo hacen uno por uno con un ligero retraso, guiando la vista del usuario.
- **Visual Score**: En lugar de mostrar solo un número, cada resultado tiene una barra de progreso animada que representa el porcentaje de similitud semántica.
- **Glow Effects**: Se utilizan sombras con resplandor (*glow shadows*) para resaltar los elementos activos y la barra de búsqueda.

### C. Conectividad
El frontend está configurado para conectarse a `http://localhost:8000`. Incluye manejo de errores para avisar al usuario si el servidor de IA está apagado o no responde.

### D. Selección Dinámica de Modelos
Se ha integrado un selector interactivo que permite al usuario alternar entre diferentes arquitecturas de IA (BERT y RoBERTa).
- **Sincronización**: Al cambiar de modelo, el frontend envía el parámetro correspondiente al backend.
- **Feedback Visual**: La interfaz indica qué modelo se utilizó para generar los resultados actuales, reforzando la transparencia del sistema de IA.

---

## 5. Funcionamiento del Estado

1. **Estado de Query**: Captura lo que el usuario escribe.
2. **Estado de Modelo**: Almacena la preferencia del usuario (BERT/RoBERTa).
3. **Estado de Carga (Loading)**: Activa animaciones en el botón de búsqueda para indicar que el modelo seleccionado está procesando la información.
4. **Estado de Resultados**: Almacena el JSON devuelto por la API y lo mapea automáticamente a las tarjetas visuales.

---

## 6. Futuras Mejoras

1. **Skeleton Loading**: Implementar placeholders animados mientras se esperan los resultados.
2. **Filtros de Categoría**: Permitir filtrar por tipo de documento si la base de datos crece.
3. **Modo Comparativo**: Mostrar por qué un documento fue elegido sobre otro (visualización de tokens).
