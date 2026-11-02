import os
import sys
import urllib.parse

# Set up project root in python module search path
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from backend.main import app as base_app

class VercelPathCorrectionMiddleware:
    """
    ASGI middleware ensuring that Vercel Serverless routing correctly maps
    incoming paths to FastAPI routes.
    
    1. Extracts 'x-matched-path' or 'x-vercel-matched-path' header from Vercel edge router.
    2. Supports query-forwarded '__path' parameter if present.
    3. Normalizes /api/index.py or /index.py to '/'.
    """
    def __init__(self, inner_app):
        self.inner_app = inner_app

    async def __call__(self, scope, receive, send):
        if scope.get("type") == "http":
            # 1. Check for __path parameter if forwarded by rewrite
            query_string = scope.get("query_string", b"").decode("utf-8", errors="ignore")
            if "__path=" in query_string:
                params = urllib.parse.parse_qsl(query_string, keep_blank_values=True)
                path_val = None
                clean_params = []
                for k, v in params:
                    if k == "__path":
                        path_val = v
                    else:
                        clean_params.append((k, v))
                if path_val is not None:
                    clean_path = path_val.strip("/")
                    scope["path"] = f"/{clean_path}" if clean_path else "/"
                    scope["raw_path"] = scope["path"].encode("utf-8")
                    scope["query_string"] = urllib.parse.urlencode(clean_params).encode("utf-8")

            # 2. Check for Vercel matched path header if path is still /api/index.py
            curr_path = scope.get("path", "")
            if curr_path in ("/api/index.py", "/index.py", "/api/index", "/index"):
                headers = dict(scope.get("headers", []))
                raw_matched = headers.get(b"x-matched-path") or headers.get(b"x-vercel-matched-path")
                if raw_matched:
                    try:
                        matched_path = raw_matched.decode("utf-8").split("?")[0]
                        if matched_path and matched_path not in ("/api/index.py", "/index.py"):
                            scope["path"] = matched_path
                            scope["raw_path"] = matched_path.encode("utf-8")
                    except Exception:
                        pass
                
                # If still unresolved, default to root '/'
                if scope.get("path") in ("/api/index.py", "/index.py", "/api/index", "/index"):
                    scope["path"] = "/"
                    scope["raw_path"] = b"/"

        await self.inner_app(scope, receive, send)

app = VercelPathCorrectionMiddleware(base_app)
