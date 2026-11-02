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
            headers = dict(scope.get("headers", []))
            
            # 1. Check for Vercel matched path header
            raw_matched = headers.get(b"x-matched-path") or headers.get(b"x-vercel-matched-path")
            if raw_matched:
                try:
                    matched_path = raw_matched.decode("utf-8").split("?")[0]
                    if matched_path:
                        scope["path"] = matched_path
                        scope["raw_path"] = matched_path.encode("utf-8")
                except Exception:
                    pass

            # 2. Check for __path parameter if forwarded
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
                    scope["path"] = f"/{path_val.lstrip('/')}"
                    scope["raw_path"] = scope["path"].encode("utf-8")
                    scope["query_string"] = urllib.parse.urlencode(clean_params).encode("utf-8")

            # 3. Fallback when path points directly to serverless entry point
            curr_path = scope.get("path", "")
            if curr_path in ("/api/index.py", "/index.py", "/api/index", "/index"):
                scope["path"] = "/"
                scope["raw_path"] = b"/"

        await self.inner_app(scope, receive, send)

app = VercelPathCorrectionMiddleware(base_app)
