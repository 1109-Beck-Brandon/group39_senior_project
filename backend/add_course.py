import sys
import os

# Add parent directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.extensions import db
from backend.models import Course, User, TeacherCourseSelection
from run import app

with app.app_context():
    # Replace with the ID of the teacher who will select this course
    teacher_id = 1  # Ensure this teacher exists in the database
    teacher = User.query.get(teacher_id)
    
    if not teacher:
        print(f"Teacher with ID {teacher_id} not found.")
        exit(1)

    # Check if the course already exists
    existing_course = Course.query.filter_by(title="Introduction to Cybersecurity").first()
    if existing_course:
        print("Course already exists in the database.")
        
        # Check if this teacher already selected the course
        if not TeacherCourseSelection.query.filter_by(teacher_id=teacher_id, course_id=existing_course.id).first():
            # Add teacher selection for the existing course
            teacher_selection = TeacherCourseSelection(teacher_id=teacher_id, course_id=existing_course.id)
            db.session.add(teacher_selection)
            db.session.commit()
            print(f"Teacher {teacher_id} selected the existing course.")
    else:
        # Create a new course
        new_course = Course(
            title="Introduction to Cybersecurity",
            description=(
                "This course introduces concepts for general awareness of the digital world today, "
                "as well as prepares individuals for other courses on this platform. It also familiarizes "
                "users with the general structure of how courses are taught on this website."
            )
        )

        # Add the course to the database
        db.session.add(new_course)
        db.session.commit()
        
        # Now create the teacher selection
        teacher_selection = TeacherCourseSelection(teacher_id=teacher_id, course_id=new_course.id)
        db.session.add(teacher_selection)
        db.session.commit()
        print(f"Course '{new_course.title}' added successfully and selected by teacher {teacher_id}!")

    # Add NIST Cybersecurity Framework course
    nist_course_title = "NIST Cybersecurity Framework"
    nist_existing_course = Course.query.filter_by(title=nist_course_title).first()
    if nist_existing_course:
        print(f"Course '{nist_course_title}' already exists in the database.")
        
        # Check if this teacher already selected the course
        if not TeacherCourseSelection.query.filter_by(teacher_id=teacher_id, course_id=nist_existing_course.id).first():
            # Add teacher selection for the existing course
            teacher_selection = TeacherCourseSelection(teacher_id=teacher_id, course_id=nist_existing_course.id)
            db.session.add(teacher_selection)
            db.session.commit()
            print(f"Teacher {teacher_id} selected the existing course.")
    else:
        nist_course = Course(
            title=nist_course_title,
            description=(
                "This course covers the NIST Cybersecurity Framework, providing guidance on how organizations can assess and improve their ability to prevent, detect, and respond to cyber attacks. "
                "It includes standards, guidelines, and best practices to manage cybersecurity-related risk."
            )
        )
        db.session.add(nist_course)
        db.session.commit()
        
        # Now create the teacher selection
        teacher_selection = TeacherCourseSelection(teacher_id=teacher_id, course_id=nist_course.id)
        db.session.add(teacher_selection)
        db.session.commit()
        print(f"Course '{nist_course_title}' added successfully and selected by teacher {teacher_id}!")

    # Add Digital Forensics Fundamentals course
    digital_forensics_title = "Digital Forensics Fundamentals"
    digital_forensics_existing = Course.query.filter_by(title=digital_forensics_title).first()
    if digital_forensics_existing:
        print(f"Course '{digital_forensics_title}' already exists in the database.")
        
        # Check if this teacher already selected the course
        if not TeacherCourseSelection.query.filter_by(teacher_id=teacher_id, course_id=digital_forensics_existing.id).first():
            # Add teacher selection for the existing course
            teacher_selection = TeacherCourseSelection(teacher_id=teacher_id, course_id=digital_forensics_existing.id)
            db.session.add(teacher_selection)
            db.session.commit()
            print(f"Teacher {teacher_id} selected the existing course.")
    else:
        digital_forensics_course = Course(
            title=digital_forensics_title,
            description=(
                "This course introduces the fundamentals of digital forensics, including the principles, methodologies, and tools used to collect, analyze, and preserve digital evidence. "
                "It is designed for beginners and provides a foundation for further study in digital forensics and cybersecurity."
            )
        )
        db.session.add(digital_forensics_course)
        db.session.commit()
        
        # Now create the teacher selection
        teacher_selection = TeacherCourseSelection(teacher_id=teacher_id, course_id=digital_forensics_course.id)
        db.session.add(teacher_selection)
        db.session.commit()
        print(f"Course '{digital_forensics_title}' added successfully and selected by teacher {teacher_id}!")