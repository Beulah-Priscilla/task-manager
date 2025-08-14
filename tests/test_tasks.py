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

def test_get_tasks_returns_list():
  resp = client.get("/tasks")
  assert resp.status_code == 200
  assert isinstance(resp.json(), list)

def test_patch_task_completed_true_then_cleanup():
  create = client.post("/tasks", json={"title": "Toggle Me", "completed": False})
  assert create.status_code == 200
  task = create.json()
  tid = task["id"]

  try:
    patch = client.patch(f"/tasks/{tid}?completed=true")
    assert patch.status_code == 200
    updated = patch.json()
    assert updated["id"] == tid
    assert updated["completed"] is True

  finally:
    client.delete(f"/tasks/{tid}")
