from flask import Flask, jsonify
from models import db
from config import DevelopmentConfig
from utils.jwt import init_jwt
from flask_cors import CORS

# Import Blueprints
from routes.auth import auth_bp
from routes.task import task_bp


# =========================
# CREATE APP
# =========================
def create_app():
    app = Flask(__name__)

    # Load config
    app.config.from_object(DevelopmentConfig)

    # =========================
    # EXTENSIONS
    # =========================
    db.init_app(app)
    init_jwt(app)

    # ✅ Proper CORS (important for JWT)
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

    # =========================
    # REGISTER BLUEPRINTS
    # =========================
    app.register_blueprint(auth_bp)
    app.register_blueprint(task_bp)

    # =========================
    # HEALTH CHECK
    # =========================
    @app.route("/")
    def home():
        return jsonify({
            "message": "Backend is running 🚀"
        }), 200

    # =========================
    # GLOBAL ERROR HANDLERS
    # =========================
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Route not found"}), 404

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({"error": "Internal server error"}), 500

    # ✅ Catch-all exception handler (VERY IMPORTANT)
    @app.errorhandler(Exception)
    def handle_exception(e):
        return jsonify({"error": str(e)}), 500

    return app


# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    app = create_app()

    with app.app_context():
        db.create_all()
        print("✅ Database initialized")

    print("🚀 Server starting on http://127.0.0.1:5000")

    app.run(debug=True)