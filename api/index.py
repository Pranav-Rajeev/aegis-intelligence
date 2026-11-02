import os
import sys

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
    2. Rewrites /api/index.py, /index.py, or /api/index to /api.
    3. Normalizes paths so that sub-paths match FastAPI routes registered under /api.
    """
    def __init__(self, inner_app):
        self.inner_app = inner_app

    async def __call__(self, scope, receive, send):
        if scope.get("type") == "http":
            headers = dict(scope.get("headers", []))
            
            # Check for Vercel matched path header
            raw_matched = headers.get(b"x-matched-path") or headers.get(b"x-vercel-matched-path")
            if raw_matched:
                try:
                    matched_path = raw_matched.decode("utf-8").split("?")[0]
                    if matched_path:
                        scope["path"] = matched_path
                except Exception:
                    pass

            curr_path = scope.get("path", "")

            # If path came in as /api/index.py or /index.py or /api/index
            if curr_path in ("/api/index.py", "/index.py", "/api/index", "/index"):
                scope["path"] = "/api"

            # If incoming path is missing /api prefix (e.g. /dashboard/stats instead of /api/dashboard/stats)
            elif curr_path and not curr_path.startswith("/api") and curr_path != "/":
                scope["path"] = f"/api{curr_path}"

        await self.inner_app(scope, receive, send)

app = VercelPathCorrectionMiddleware(base_app)
