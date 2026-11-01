from sqlalchemy import Column, Integer, String, Text, ForeignKey
from backend.database import Base

class Chunk(Base):
    __tablename__ = "chunks"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id", ondelete="CASCADE"), index=True)
    chunk_index = Column(Integer, default=0)
    content = Column(Text, nullable=False)
    section = Column(String(255), default="")
    page_number = Column(Integer, default=1)
    token_count = Column(Integer, default=0)
    embedding_id = Column(String(64), nullable=True)
    metadata_json = Column(Text, default="{}")
