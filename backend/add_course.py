from .extensions import db
from .models import Course, User
from run import app

with app.app_context():
    # Replace with the ID of the teacher who will own this course
    teacher_id = 1  # Ensure this teacher exists in the database

    # Check if the course already exists
    existing_course = Course.query.filter_by(title="Introduction to Cybersecurity").first()
    if existing_course:
        print("Course already exists in the database.")
    else:
        # Create a new course
        new_course = Course(
            title="Introduction to Cybersecurity",
            description=(
                "This course introduces concepts for general awareness of the digital world today, "
                "as well as prepares individuals for other courses on this platform. It also familiarizes "
                "users with the general structure of how courses are taught on this website."
            ),
            teacher_id=teacher_id
        )

        # Add the course to the database
        db.session.add(new_course)
        db.session.commit()
        print(f"Course '{new_course.title}' added successfully!")