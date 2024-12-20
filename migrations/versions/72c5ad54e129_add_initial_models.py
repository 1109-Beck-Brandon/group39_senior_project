"""Add initial models.

Revision ID: 72c5ad54e129
Revises: 79e2a45a13b9
Create Date: 2024-11-08 17:38:59.580195

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '72c5ad54e129'
down_revision = '79e2a45a13b9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('courses',
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('instructor_id', sa.Integer(), nullable=False),
    sa.Column('date_created', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['instructor_id'], ['users.user_id'], ),
    sa.PrimaryKeyConstraint('course_id')
    )
    op.create_table('enrollments',
    sa.Column('enrollment_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.Column('date_enrolled', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['course_id'], ['courses.course_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
    sa.PrimaryKeyConstraint('enrollment_id')
    )
    op.create_table('modules',
    sa.Column('module_id', sa.Integer(), nullable=False),
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('order', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['courses.course_id'], ),
    sa.PrimaryKeyConstraint('module_id')
    )
    op.create_table('assessments',
    sa.Column('assessment_id', sa.Integer(), nullable=False),
    sa.Column('module_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('max_score', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['module_id'], ['modules.module_id'], ),
    sa.PrimaryKeyConstraint('assessment_id')
    )
    op.create_table('progress',
    sa.Column('progress_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('module_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=False),
    sa.Column('score', sa.Integer(), nullable=True),
    sa.Column('last_accessed', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['module_id'], ['modules.module_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
    sa.PrimaryKeyConstraint('progress_id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_joined', sa.DateTime(), nullable=True))
        batch_op.alter_column('role',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)
        batch_op.drop_column('first_name')
        batch_op.drop_column('created_at')
        batch_op.drop_column('last_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('last_name', sa.VARCHAR(length=50), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('first_name', sa.VARCHAR(length=50), autoincrement=False, nullable=False))
        batch_op.alter_column('role',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)
        batch_op.drop_column('date_joined')

    op.drop_table('progress')
    op.drop_table('assessments')
    op.drop_table('modules')
    op.drop_table('enrollments')
    op.drop_table('courses')
    # ### end Alembic commands ###
