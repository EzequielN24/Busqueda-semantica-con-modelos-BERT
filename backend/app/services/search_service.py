from app.models.embedding_model import EmbeddingModel
from app.data.documents import DocumentStore
from app.utils.similarity import calculate_cosine_similarity

class SearchService:
    def __init__(self, embedding_model: EmbeddingModel, document_store: DocumentStore):
        """
        Inyectamos las dependencias (el modelo de embeddings y el almacenamiento de documentos).
        Esto sigue el principio de Inversión de Dependencias (SOLID), lo que hace que nuestro
        servicio sea modular, fácil de testear (podemos usar mocks) y flexible ante cambios.
        """
        self.embedding_model = embedding_model
        self.document_store = document_store

    def search(self, query: str, top_k: int = 5, model_type: str = None) -> list[dict]:
        """
        Realiza la búsqueda semántica, permitiendo cambiar el modelo dinámicamente.
        """
        # 1. Verificar si el usuario quiere cambiar el modelo
        if model_type and model_type != self.embedding_model.provider.model_name:
            print(f"Cambiando motor de IA a: {model_type}...")
            # Re-inicializamos el modelo (modularizado)
            from app.models.embedding_model import EmbeddingModel
            self.embedding_model = EmbeddingModel(model_type=model_type)
            
            # RE-INICIALIZAR EMBEDDINGS: Paso crítico para que la comparación sea válida
            self.document_store.initialize_embeddings(self.embedding_model)

        # 2. Convertir la query del usuario a embedding (vector)
        query_embedding = self.embedding_model.get_embedding(query)
        
        # 3. Obtener los documentos
        documents = self.document_store.get_all_documents()
        
        results = []
        # 4. Calcular la similitud
        for doc in documents:
            doc_embedding = doc.get("embedding")
            
            if doc_embedding is not None:
                similarity_score = calculate_cosine_similarity(query_embedding, doc_embedding)
                
                results.append({
                    "id": doc.get("id"),
                    "text": doc.get("text"),
                    "score": float(similarity_score)
                })
        
        # 5. Ordenar resultados
        results.sort(key=lambda x: x["score"], reverse=True)
        
        return results[:top_k]
