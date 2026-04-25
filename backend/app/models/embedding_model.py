from abc import ABC, abstractmethod
from sentence_transformers import SentenceTransformer

class BaseEmbeddingModel(ABC):
    """
    Clase base abstracta para proveedores de embeddings.
    """
    @abstractmethod
    def get_embedding(self, text: str):
        pass

class SentenceTransformerProvider(BaseEmbeddingModel):
    """
    Proveedor para modelos de la familia Transformers.
    """
    def __init__(self, model_name: str):
        print(f"Cargando modelo SentenceTransformer: {model_name}...")
        self.model = SentenceTransformer(model_name)
        self.model_name = model_name
        print(f"Modelo {model_name} cargado exitosamente.")

    def get_embedding(self, text: str):
        return self.model.encode(text)

class EmbeddingModel:
    def __init__(self, model_type: str = 'roberta'):
        """
        Selector de modelos modular.
        
        Modelos disponibles de momento:
        - 'bert': bert-base-uncased
        - 'roberta': all-distilroberta-v1 (Más rápido y optimizado para oraciones)
        """
        models = {
            'bert': 'bert-base-uncased',
            'roberta': 'all-distilroberta-v1',
            'multilingual': 'paraphrase-multilingual-MiniLM-L12-v2',
            'minilm-l6-v2':'all-MiniLM-L6-v2'
        }
        
        selected_model = models.get(model_type, models['roberta'])
        self.provider = SentenceTransformerProvider(selected_model)

    def get_embedding(self, text: str):
        return self.provider.get_embedding(text)
