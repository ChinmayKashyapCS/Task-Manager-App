from flask import Blueprint, request, jsonify
from models import db, Task, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.validators import validate_task_data
from sqlalchemy.exc import SQLAlchemyError

task_bp = Blueprint("tasks", __name__, url_prefix="/api/v1/tasks")


# =========================
# CREATE TASK
# =========================
@task_bp.route("", methods=["POST"])
@jwt_required()
def create_task():
    try:
        user_id = int(get_jwt_identity())  # ✅ FIX
        data = request.get_json()

        if not data:
            return jsonify({"error": "Request body is required"}), 400

        # ✅ Validate input
        errors = validate_task_data(data)
        if errors:
            return jsonify({"error": ", ".join(errors)}), 400

        new_task = Task(
            title=data.get("title"),
            description=data.get("description"),
            user_id=user_id
        )

        db.session.add(new_task)
        db.session.commit()

        return jsonify({
            "message": "Task created successfully",
            "task": new_task.to_dict()
        }), 201

    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({"error": "Database error"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# GET ALL TASKS
# =========================
@task_bp.route("", methods=["GET"])
@jwt_required()
def get_tasks():
    try:
        user_id = int(get_jwt_identity())  # ✅ FIX
        user = db.session.get(User, user_id)

        if not user:
            return jsonify({"error": "Invalid user"}), 401

        # ✅ Admin → all tasks
        if user.role == "admin":
            tasks = Task.query.all()
        else:
            # ✅ User → only own tasks
            tasks = Task.query.filter_by(user_id=user_id).all()

        return jsonify({
            "tasks": [task.to_dict() for task in tasks]
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# GET SINGLE TASK
# =========================
@task_bp.route("/<int:task_id>", methods=["GET"])
@jwt_required()
def get_task(task_id):
    try:
        user_id = int(get_jwt_identity())
        user = db.session.get(User, user_id)

        task = db.session.get(Task, task_id)

        if not task:
            return jsonify({"error": "Task not found"}), 404

        if user.role != "admin" and task.user_id != user_id:
            return jsonify({"error": "Unauthorized"}), 403

        return jsonify({"task": task.to_dict()}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# UPDATE TASK
# =========================
@task_bp.route("/<int:task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    try:
        user_id = int(get_jwt_identity())
        user = db.session.get(User, user_id)

        data = request.get_json()

        if not data:
            return jsonify({"error": "Request body required"}), 400

        task = db.session.get(Task, task_id)

        if not task:
            return jsonify({"error": "Task not found"}), 404

        if user.role != "admin" and task.user_id != user_id:
            return jsonify({"error": "Unauthorized"}), 403

        # ✅ Validate input
        errors = validate_task_data(data)
        if errors:
            return jsonify({"error": ", ".join(errors)}), 400

        # ✅ Update fields
        task.title = data.get("title", task.title)
        task.description = data.get("description", task.description)
        task.status = data.get("status", task.status)

        db.session.commit()

        return jsonify({
            "message": "Task updated successfully",
            "task": task.to_dict()
        }), 200

    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({"error": "Database error"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# DELETE TASK
# =========================
@task_bp.route("/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    try:
        user_id = int(get_jwt_identity())
        user = db.session.get(User, user_id)

        task = db.session.get(Task, task_id)

        if not task:
            return jsonify({"error": "Task not found"}), 404

        if user.role != "admin" and task.user_id != user_id:
            return jsonify({"error": "Unauthorized"}), 403

        db.session.delete(task)
        db.session.commit()

        return jsonify({"message": "Task deleted successfully"}), 200

    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({"error": "Database error"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500