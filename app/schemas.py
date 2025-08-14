from pydantic import BaseModel

class TaskBase(BaseModel):
  title: str
  completed: bool = False

class Task(TaskBase):
  id: int