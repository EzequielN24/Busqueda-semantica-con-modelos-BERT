import numpy as np

def calculate_cosine_similarity(vec1, vec2):
    """
    Calcula la similitud coseno entre dos vectores (embeddings).
    
    La similitud coseno mide el ángulo entre dos vectores. 
    Un valor de 1 significa que son idénticos en dirección (muy similares),
    mientras que 0 significa que son ortogonales (sin relación).
    """
    # Aseguramos que sean arrays de numpy para operaciones vectorizadas
    a = np.array(vec1)
    b = np.array(vec2)
    
    # Fórmula: dot(A, B) / (||A|| * ||B||)
    dot_product = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    
    # Evitar división por cero
    if norm_a == 0 or norm_b == 0:
        return 0.0
        
    return dot_product / (norm_a * norm_b)
