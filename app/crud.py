from sqlalchemy.orm import Session
from . import models, schemas

def get_tasks(db: Session):
  return db.query(models.Task).all()



