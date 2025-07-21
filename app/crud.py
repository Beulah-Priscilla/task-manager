from sqlalchemy.orm import Session
from . import models, schemas

def get_tasks(db: Session):
  return db.query(models.Task).all()

def create_task(db: Session, task: schemas.Task):
  db_task = models.Task(title=task.title, completed=task.completed)
  db.add(db_task)
  db.commit()
  db.refresh(db_task)
  return db_task

