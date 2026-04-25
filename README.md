# Busqueda-semantica-con-modelos-BERT

Este proyecto es un motor de búsqueda semántica que recupera documentos basándose en el significado, en lugar de en la coincidencia exacta de palabras clave.

Utiliza embeddings basadas en Transformers, especificamente modelos BERT, para representar el texto como vectores y aplica la similitud del coseno para encontrar los resultados más relevantes para una consulta dada.

El sistema está construido con una arquitectura en capas, separando la API, la lógica de negocio y la gestión del modelo. Integra un backend en Python para la generación de embeddings y un frontend en React para la interacción del usuario.

Las tecnologías incluyen técnicas de PLN, modelos de embeddings y búsqueda de similitud vectorial.