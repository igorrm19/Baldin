from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from typing import AsyncGenerator
from src.core.settings import settings

# Função que gerencia o "pool" de conexões com o banco.
async_engine = create_async_engine (
    settings.ASYNC_DATABASE_URI,
    echo=settings.DEBUG,
    pool_size=20,              # Max conexões simultâneas
    max_overflow=10,           # Overflow se exceder pool_size
    pool_pre_ping=True,        # Verifica conexão antes de usar
    pool_recycle=3600,         # Recicla conexão a cada 1h
)

# Cria sessões descartáveis para cada usuário que entra no site.
AsyncSessionLocal = async_sessionmaker (
    bind=async_engine,
    class_=AsyncSession, # Define que a sessão produzida será assíncrona
    expire_on_commit=False # Evitar erros de I/O implícito após o commit
)

class Base(DeclarativeBase):
    pass

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise

async def init_db():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def close_db():
    await async_engine.dispose()  