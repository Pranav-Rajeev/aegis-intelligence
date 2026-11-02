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
    
    1. Extracts '__path' parameter forwarded by vercel.json rewrite:
       e.g. /api/:path* -> /api/index.py?__path=:path*
    2. Strips '__path' from query string so endpoints receive clean user query params.
    3. Normalizes paths so that sub-paths match FastAPI routes registered under /api.
    """
    def __init__(self, inner_app):
        self.inner_app = inner_app

    async def __call__(self, scope, receive, send):
        if scope.get("type") == "http":
            query_string = scope.get("query_string", b"").decode("utf-8", errors="ignore")
            
            # Check for __path parameter forwarded by rewrite
            if "__path=" in query_string:
                params = urllib.parse.parse_qsl(query_string, keep_blank_values=True)
                path_val = None
                clean_params = []
                for k, v in params:
                    if k == "__path":
                        path_val = v
                    else:
                        clean_params.append((k, v))
                
                if path_val:
                    path_val = path_val.lstrip("/")
                    scope["path"] = f"/api/{path_val}"
                    scope["raw_path"] = scope["path"].encode("utf-8")
                    scope["query_string"] = urllib.parse.urlencode(clean_params).encode("utf-8")
            else:
                curr_path = scope.get("path", "")
                if curr_path in ("/api/index.py", "/index.py", "/api/index", "/index"):
                    scope["path"] = "/api"
                    scope["raw_path"] = b"/api"
                elif curr_path and not curr_path.startswith("/api") and curr_path != "/":
                    scope["path"] = f"/api{curr_path}"
                    scope["raw_path"] = scope["path"].encode("utf-8")

        await self.inner_app(scope, receive, send)

app = VercelPathCorrectionMiddleware(base_app)
