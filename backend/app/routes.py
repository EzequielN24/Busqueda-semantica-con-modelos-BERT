from fastapi import APIRouter, Request, Query

router = APIRouter()

@router.get("/search")
async def search(
    request: Request, 
    q: str = Query(..., description="La consulta de búsqueda semántica"),
    model: str = Query(None, description="El tipo de modelo a usar (bert o roberta)")
):
    """
    Endpoint principal de búsqueda.
    """
    search_service = request.app.state.search_service
    
    # Pasamos el modelo elegido al servicio
    results = search_service.search(query=q, top_k=5, model_type=model)
    
    return {
        "status": "success",
        "query": q,
        "model_used": model or "default",
        "results": results
    }
