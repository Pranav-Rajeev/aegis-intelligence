import os
from pathlib import Path
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
IS_VERCEL = bool(os.getenv("VERCEL") or os.getenv("AWS_LAMBDA_FUNCTION_NAME"))

# Determine storage paths (use /tmp when running on Vercel read-only Lambda)
if IS_VERCEL:
    data_dir = Path("/tmp/aegis_data")
    upload_dir = data_dir / "uploads"
    reports_dir = data_dir / "reports"
    chroma_dir = data_dir / "chroma"
    db_file = data_dir / "aegis.db"
    
    # Initialize writeable directory and seed database in /tmp
    data_dir.mkdir(parents=True, exist_ok=True)
    orig_db = BASE_DIR / "data" / "aegis.db"
    if orig_db.exists() and not db_file.exists():
        import shutil
        shutil.copyfile(orig_db, db_file)
    database_url = f"sqlite:///{db_file}"
else:
    data_dir = BASE_DIR / "data"
    upload_dir = BASE_DIR / "data" / "uploads"
    reports_dir = BASE_DIR / "data" / "reports"
    chroma_dir = BASE_DIR / "data" / "chroma"
    database_url = f"sqlite:///{BASE_DIR / 'data' / 'aegis.db'}"

class Settings(BaseSettings):
    PROJECT_NAME: str = "Aegis Intelligence"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # Paths
    DATA_DIR: Path = data_dir
    UPLOAD_DIR: Path = upload_dir
    REPORTS_DIR: Path = reports_dir
    CHROMA_DIR: Path = chroma_dir
    DEFAULT_DATASET_DIR: Path = PROJECT_ROOT / "task-data" / "aegis-dataset" / "aegis-dataset"
    
    # Database
    DATABASE_URL: str = database_url
    
    # AI / LLM Configuration
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"
    
    # Server settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()

# Ensure required directories exist
try:
    settings.DATA_DIR.mkdir(parents=True, exist_ok=True)
    settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    settings.REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    settings.CHROMA_DIR.mkdir(parents=True, exist_ok=True)
except Exception:
    pass
