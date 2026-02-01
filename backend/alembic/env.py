import sys
import os
import asyncio
from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

from src.core.database import Base
from src.models.user import User  
from src.core.settings import settings

# Garante que o Alembic enxergue a pasta 'src' ao subir um nível no diretório.
# Isso evita erros de "ModuleNotFoundError" ao importar seus modelos e configurações.

current_dir = os.path.dirname(os.path.abspath(__file__))
backend_root = os.path.dirname(current_dir)
sys.path.append(backend_root)

# Objeto de configuração do Alembic, que acessa os valores do arquivo alembic.ini
config = context.config

config.set_main_option("sqlalchemy.url", settings.ASYNC_DATABASE_URI)

# Configura o sistema de logging (mostra as saídas SQL no terminal)
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Define os metadados das tabelas. O Alembic usará isso para comparar o que está no código 
# vs o que está no banco de dados para gerar as migrações automáticas.

target_metadata = Base.metadata

def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def do_run_migrations(connection: Connection) -> None:
    context.configure(
        connection=connection, 
        target_metadata=target_metadata,
        compare_type=True, # Detecta mudanças de tipo de coluna (ex: String para Integer)
    )

    with context.begin_transaction():
        context.run_migrations()

async def run_migrations_online() -> None:
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool, # Não usa pooling aqui para evitar conexões persistentes em migrações
    )

    async with connectable.connect() as connection:
        # O Alembic é síncrono por padrão, então usamos run_sync para rodar a migração
        # dentro da nossa conexão assíncrona.
        await connection.run_sync(do_run_migrations)

    # Fecha todas as conexões
    await connectable.dispose()

# Decide se deve rodar o modo offline ou online com base no comando disparado no terminal
if context.is_offline_mode():
    run_migrations_offline()
else:
    # Inicia o loop de eventos assíncronos para rodar a migração online
    asyncio.run(run_migrations_online())