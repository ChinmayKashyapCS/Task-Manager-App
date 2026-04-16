import re


# =========================
# EMAIL VALIDATION
# =========================
def is_valid_email(email):
    if not email:
        return False

    email = email.strip().lower()
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return re.match(pattern, email) is not None


# =========================
# PASSWORD VALIDATION
# =========================
def is_strong_password(password):
    """
    Rules:
    - At least 6 characters
    - Contains at least one letter
    - Contains at least one number
    """
    if not password or len(password) < 6:
        return False

    if not re.search(r"[A-Za-z]", password):
        return False

    if not re.search(r"\d", password):
        return False

    return True


# =========================
# USER VALIDATION
# =========================
def validate_user_data(data):
    errors = []

    username = (data.get("username") or "").strip()
    email = (data.get("email") or "").strip()
    password = data.get("password")

    if not username or len(username) < 3:
        errors.append("Username must be at least 3 characters long")

    if not email or not is_valid_email(email):
        errors.append("Invalid email format")

    if not password or not is_strong_password(password):
        errors.append("Password must be at least 6 characters and contain letters and numbers")

    return errors


# =========================
# TASK VALIDATION
# =========================
def validate_task_data(data):
    errors = []

    title = (data.get("title") or "").strip()

    if not title:
        errors.append("Title is required")

    if "status" in data:
        if data["status"] not in ["pending", "completed"]:
            errors.append("Status must be 'pending' or 'completed'")

    return errors


# =========================
# GENERIC RESPONSE FORMAT (FIXED)
# =========================
def validation_error_response(errors):
    """
    FIX: Always return consistent 'error' key (frontend expects this)
    """
    return {
        "error": ", ".join(errors)
    }, 400