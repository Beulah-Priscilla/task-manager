from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_task_and_cleanup():
  payload = {"title": "Test Task", "completed": False}
  resp = client.post("/tasks", json=payload)
  assert resp.status_code == 200

  data = resp.json()
  assert data["title"] == "Test Task"
  assert data["completed"] is False
  assert "id" in data
  new_id = data["id"]

  del_resp = client.delete(f"/tasks/{new_id}")
  assert del_resp.status_code == 200