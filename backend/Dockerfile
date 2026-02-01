FROM python:3.13-slim

# 1. Define o diretório de trabalho (CRUCIAL para o volume funcionar)
WORKDIR /app

RUN pip install --no-cache-dir poetry==1.8.2

COPY pyproject.toml poetry.lock ./

# Instalando dependências
RUN poetry config virtualenvs.create false \
    && poetry install --only main --no-interaction --no-ansi

# 2. Copia o código para dentro de /app/src
COPY src/ ./src/

# Cria usuário não-root (segurança)
RUN useradd -m myuser
USER myuser

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health').read()"

# 3. O comando roda a partir do WORKDIR (/app)
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4", "--log-level", "info"]