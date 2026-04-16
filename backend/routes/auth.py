from flask import Blueprint, request, jsonify
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from utils.jwt import generate_tokens
from utils.validators import validate_user_data
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from sqlalchemy.exc import SQLAlchemyError

auth_bp = Blueprint("auth", __name__, url_prefix="/api/v1/auth")


# =========================
# REGISTER API
# =========================
@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Request body is required"}), 400

        # ✅ Validate input
        errors = validate_user_data(data)
        if errors:
            return jsonify({"error": ", ".join(errors)}), 400

        username = data.get("username").strip()
        email = data.get("email").strip()
        password = data.get("password")
        role = data.get("role", "user")

        # ✅ Role validation
        if role not in ["user", "admin"]:
            return jsonify({"error": "Invalid role"}), 400

        # ✅ Check existing user
        existing_user = User.query.filter(
            (User.email == email) | (User.username == username)
        ).first()

        if existing_user:
            return jsonify({"error": "User already exists"}), 409

        # ✅ Hash password
        hashed_password = generate_password_hash(password)

        # ✅ Create user
        new_user = User(
            username=username,
            email=email,
            password=hashed_password,
            role=role
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "message": "User registered successfully",
            "user": new_user.to_dict()
        }), 201

    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({"error": "Database error"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# LOGIN API
# =========================
@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Request body is required"}), 400

        email = (data.get("email") or "").strip()
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            return jsonify({"error": "Invalid credentials"}), 401

        tokens = generate_tokens(user)

        return jsonify({
            "message": "Login successful",
            "access_token": tokens["access_token"],
            "refresh_token": tokens["refresh_token"],
            "user": user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# GET CURRENT USER (FIXED)
# =========================
@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    try:
        user_id = int(get_jwt_identity())  # ✅ FIX

        user = db.session.get(User, user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({
            "user": user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# REFRESH TOKEN (FIXED)
# =========================
@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh_token():
    try:
        user_id = get_jwt_identity()  # already string

        new_access_token = create_access_token(identity=user_id)

        return jsonify({
            "access_token": new_access_token
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500