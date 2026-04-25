# Documentación Técnica: Buscador Semántico (Backend)

Este documento detalla la arquitectura, las decisiones de diseño y el funcionamiento del backend desarrollado para el proyecto de buscador semántico basado en **BERT**.

## 1. Arquitectura del Sistema

Se ha implementado una **Arquitectura en Capas (Layered Architecture)** para garantizar que el sistema sea modular, escalable y fácil de mantener.

### Estructura de Directorios:
```text
backend/
├── app/
│   ├── data/           # Capa de Datos (Almacenamiento y carga)
│   ├── models/         # Capa de IA (Modelo de Embeddings)
│   ├── services/       # Capa de Negocio (Lógica de búsqueda)
│   ├── utils/          # Utilidades (Matemáticas/Similitud)
│   ├── main.py         # Punto de entrada y orquestación
│   └── routes.py       # Definición de Endpoints
└── run.py              # Script de ejecución
```

---

## 2. Componentes e Implementación

### A. Capa de Modelo (`models/embedding_model.py`)
- **Tecnología**: `SentenceTransformers` con arquitectura modular basada en clases abstractas (`ABC`).
- **Diseño Modular**: Se ha implementado un patrón de "Proveedor" (Provider). La clase `BaseEmbeddingModel` define el contrato, y `SentenceTransformerProvider` lo implementa. 
- **Decisión**: Esto permite que el usuario pueda intercambiar modelos fácilmente (ej. pasar de `bert-base-uncased` a cualquier otro modelo de Hugging Face) simplemente cambiando el parámetro de inicialización, o incluso crear nuevos proveedores para APIs externas sin tocar la lógica de búsqueda.
- **Funcionamiento**: Convierte cualquier texto en un vector numérico (embedding) cuya dimensión depende del modelo elegido (768 para BERT).

### B. Capa de Datos (`data/documents.py`)
- **Contenido**: Una lista inicial de documentos que abarcan temas variados para pruebas.
- **Optimización**: Se implementó el método `initialize_embeddings`. En lugar de calcular vectores en cada búsqueda, se calculan una sola vez al iniciar el servidor y se guardan en memoria.

### C. Capa de Utilidades (`utils/similarity.py`)
- **Lógica**: Similitud Coseno utilizando `numpy`.
- **Por qué**: Es la métrica estándar para comparar vectores de alta dimensión. Mide el ángulo entre vectores, ignorando la longitud del texto y enfocándose en la dirección (significado).

### D. Capa de Servicio (`services/search_service.py`)
- **Rol**: Orquestador con soporte multimodelo.
- **Lógica de Conmutación Dinámica**:
    1. Recibe la consulta y el tipo de modelo deseado (`bert` o `roberta`).
    2. Si el modelo solicitado es diferente al cargado actualmente:
        - Re-instancia el proveedor de IA.
        - Ordena al `DocumentStore` recalcular todos los embeddings (Paso crítico para asegurar que los vectores sean comparables).
    3. Genera el embedding de la consulta.
    4. Ejecuta la comparación semántica y devuelve los resultados ordenados.

### E. Capa de API (`main.py` & `routes.py`)
- **Framework**: `FastAPI`.
- **Endpoints**:
    - `GET /`: Información básica y enlace a docs.
    - `GET /search?q={query}&model={model}`: Endpoint principal que permite especificar el motor de IA deseado.
- **Inyección de Dependencias**: El servicio de búsqueda se mantiene persistente en el estado de la aplicación, pero su configuración interna (modelo de IA) puede mutar según la petición del usuario.

---

## 3. Decisiones Técnicas Clave

| Decisión | Razón |
| :--- | :--- |
| **Precomputación de Embeddings** | Recalcular el significado de miles de documentos en cada búsqueda es computacionalmente costoso. Al hacerlo al inicio, las búsquedas son instantáneas (milisegundos). |
| **Separación de Capas** | Permite cambiar el modelo de IA (ej. pasar de BERT a GPT) sin tener que modificar la API o el cálculo de similitud. |
| **Uso de FastAPI** | Genera documentación interactiva automática (`/docs`) y es significativamente más rápido que Flask para tareas de cómputo intensivo. |

---

## 4. Flujo de una Consulta

1. El usuario envía un `GET` a `/search?q="IA en medicina"`.
2. **FastAPI** recibe la petición y llama al `SearchService`.
3. **BERT** convierte "IA en medicina" en un vector `[0.12, -0.45, ...]`.
4. El sistema compara ese vector contra los vectores ya guardados en memoria de todos los documentos.
5. Se calculan los puntajes (ej. Documento A: 0.85, Documento B: 0.20).
6. El sistema devuelve un JSON con los textos ordenados por esos puntajes.

---

## 5. Próximos Pasos

1. **Frontend (React)**: Crear una interfaz moderna con una barra de búsqueda dinámica.
2. **Escalabilidad**: Implementar **FAISS** si la base de datos de documentos crece a miles o millones de registros.
3. **Persistencia**: Mover los documentos de una lista en Python a una base de datos vectorial real.
