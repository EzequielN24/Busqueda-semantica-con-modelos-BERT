const API_BASE_URL = 'http://localhost:8000';

export const searchDocuments = async (query, model = 'roberta') => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search?q=${encodeURIComponent(query)}&model=${model}`
    );
    if (!response.ok) {
      throw new Error('Error en la comunicación con el servidor');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
