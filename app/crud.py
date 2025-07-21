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

def delete_task(db: Session, task_id: int):
  task = db.query(models.Task).filter(models.Task.id == task_id).first()
  if task:
    db.delete(task)
    db.commit()
    return task
  return None