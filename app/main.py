from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, models, crud
from typing import List
from app.database import Base, engine, SessionLocal


app = FastAPI()

# tasks: List[schemas.Task] = []

Base.metadata.create_all(bind=engine)

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@app.get("/")
def read_root():
  return {"message": "Hello World! FastAPI app is running"}

@app.get("/tasks", response_model=List[schemas.Task])
def get_tasks(db: Session = Depends(get_db)):
  return crud.get_tasks(db)

@app.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.Task, db: Session = Depends(get_db)):
  return crud.create_task(db, task)

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
  deleted = crud.delete_task(db, task_id)
  if not deleted:
    raise HTTPException(status_code=404, detail="Task not found")
  return {"message": "Task deleted", "task": deleted}

@app.patch("/tasks/{task_id}", response_model=schemas.Task)
def mark_task_completed(task_id: int, completed: bool, db: Session = Depends(get_db)):
  updated = crud.update_task(db, task_id, completed)
  if not updated:
    raise HTTPException(status_code=404, detail="Task not found")
  return updated



