class DocumentStore:
    def __init__(self):
        """
        Simula una base de datos de documentos.
        En una fase más avanzada, esto podría conectarse a FAISS o una base de datos vectorial.
        """
        # Lista de documentos iniciales para probar el buscador
        self.raw_data = [
            {"id": 1, "text": "La inteligencia artificial está transformando el desarrollo de software."},
            {"id": 2, "text": "El aprendizaje profundo y las redes neuronales son la base de los transformers."},
            {"id": 3, "text": "BERT es un modelo de lenguaje que entiende el contexto bidireccionalmente."},
            {"id": 4, "text": "La receta tradicional de la pizza italiana usa fermentación lenta."},
            {"id": 5, "text": "El senderismo en la montaña es excelente para la salud física y mental."},
            {"id": 6, "text": "Python es el lenguaje preferido para ciencia de datos e IA."},
            {"id": 7, "text": "La astronomía estudia los cuerpos celestes y el universo."}
        ]
        # Aquí guardaremos los documentos junto con sus vectores (embeddings)
        self.documents = []

    def initialize_embeddings(self, embedding_model):
        """
        Calcula los embeddings de todos los documentos una sola vez.
        Esto cumple con la buena práctica de NO recalcular embeddings en cada request.
        """
        print("Precomputando embeddings para la base de datos local...")
        self.documents = []
        for doc in self.raw_data:
            # Generamos el vector usando el modelo que implementamos antes
            vector = embedding_model.get_embedding(doc["text"])
            
            self.documents.append({
                "id": doc["id"],
                "text": doc["text"],
                "embedding": vector
            })
        print(f"Base de datos lista con {len(self.documents)} documentos vectorizados.")

    def get_all_documents(self):
        """
        Retorna la lista de documentos con sus vectores para que el servicio 
        pueda realizar la comparación.
        """
        return self.documents
