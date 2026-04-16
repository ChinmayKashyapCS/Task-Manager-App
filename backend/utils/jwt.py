from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token
from datetime import timedelta

jwt = JWTManager()


# =========================
# INIT JWT
# =========================
def init_jwt(app):
    """
    Initialize JWT with app config
    """
    app.config["JWT_SECRET_KEY"] = "super-secret-key"  # change in production
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)

    jwt.init_app(app)


# =========================
# TOKEN GENERATION (FIXED)
# =========================
def generate_tokens(user):
    """
    Generate access & refresh tokens
    FIX: Store only user_id in identity
    """
    access_token = create_access_token(identity=str(user.id))  # ✅ FIX
    refresh_token = create_refresh_token(identity=str(user.id))

    return {
        "access_token": access_token,
        "refresh_token": refresh_token
    }


# =========================
# OPTIONAL: CUSTOM ERROR HANDLERS
# =========================
@jwt.unauthorized_loader
def unauthorized_callback(error):
    return {
        "error": "Missing Authorization Header"
    }, 401


@jwt.invalid_token_loader
def invalid_token_callback(error):
    return {
        "error": "Invalid token"
    }, 422


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return {
        "error": "Token has expired"
    }, 401