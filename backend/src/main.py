from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi import Request
from src.core.database import init_db, close_db
from src.core.settings import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    print('Iniciando Banco de dados...')
    await init_db() 
    yield
    print('Fechando Banco de dados...')
    await close_db()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Plataforma de Recrutamento e Seleção de Alta Performance",
    version="0.1.0",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check
@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "version": "0.1.0"}

# Root
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Bem-vindo(a) ao Software Baldin!"}

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    print(f'Erro não tratado: {exc}')
    return JSONResponse(
        status_code=500,
        content={"detail": "Erro interno do servidor"}
    )

# TODO: Adicionar routers aqui
# from src.modules.identity.api import router as identity_router
# app.include_router(identity_router, prefix="/api/v1")
