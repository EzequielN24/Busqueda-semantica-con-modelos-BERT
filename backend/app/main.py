from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
from app.models.embedding_model import EmbeddingModel
from app.data.documents import DocumentStore
from app.services.search_service import SearchService

app = FastAPI(
    title="Buscador Semántico API",
    description="API para búsqueda semántica utilizando BERT y Sentence Transformers",
    version="1.0.0"
)

# Configuración de CORS (Crucial para que React pueda comunicarse con el backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En desarrollo permitimos todo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Orquestación de la Capa de Backend ---

# 1. Cargamos el modelo (esto puede tardar unos segundos)
embedding_model = EmbeddingModel()

# 2. Inicializamos el almacén de datos
document_store = DocumentStore()

# 3. Precomputamos los embeddings de los documentos base
# Esta es la decisión de arquitectura clave para el rendimiento
document_store.initialize_embeddings(embedding_model)

# 4. Creamos el servicio de búsqueda inyectando las dependencias
search_service = SearchService(embedding_model, document_store)

# 5. Guardamos el servicio en el estado de la app para que las rutas accedan a él
app.state.search_service = search_service

# 6. Incluimos las rutas definidas en routes.py
app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "Bienvenido al Buscador Semántico API",
        "docs": "/docs" # FastAPI genera documentación automática aquí
    }
