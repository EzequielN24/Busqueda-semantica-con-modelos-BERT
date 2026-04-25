import uvicorn
import os
import sys

# Añadimos el directorio actual al path para evitar problemas de importación
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("Iniciando el servidor de desarrollo...")
    # Ejecutamos uvicorn apuntando al objeto 'app' en el módulo 'main' dentro de 'app'
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
