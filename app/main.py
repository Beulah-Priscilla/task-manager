from fastapi import FastAPI
# from app.schemas import Task
from app import schemas
from typing import List
from app.database import Base, engine
from app import models

app = FastAPI()

tasks: List[schemas.Task] = []

@app.get("/")
def read_root():
  return {"message": "Hello World! FastAPI app is running"}

@app.get("/tasks", response_model=List[schemas.Task])
def get_tasks():
  return tasks

@app.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.Task):
  tasks.append(task)
  return task

@app.delete("/tasks/{task_index}")
def delete_task(task_index: int):
  if 0 <= task_index < len(tasks):
    removed = tasks.pop(task_index)
    return {"message": "Task deleted", "task": removed}
  else:
    return {"error": "Task not found"}
  

Base.metadata.create_all(bind=engine)