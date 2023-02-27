import _ from "lodash";
import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useTasks } from "../api";

export const Home = () => {
  const { tasks, loading, addTask, deleteTask, adding, deleting } = useTasks();

  const [showNewTask, setShowNewTask] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [newTaskInfo, setNewTaskInfo] = useState({});

  const updateNewTaskInfo = useCallback((key, value) => {
    setNewTaskInfo({
      ...newTaskInfo,
      [key]: value
    })
  }, [newTaskInfo])

  return (
    <div className="bg-alpha">
      <div className="pt-24px mx-auto mw-800">
        <h1>Task List</h1>
        {loading ? (
          <div className="mt-24px">
            <Spinner animation="border" variant="primary"/>
          </div>
        ) : (
          <div className="d-flex flex-column gap-12px mt-24px">
            <div>
              <Button variant="success" onClick={() => setShowNewTask(true)}>New Task</Button>
            </div>
          {tasks.map(task => (
            <Card key={_.uniqueId("task-card-")} className="bg-white bg-opacity-10 w-300 mx-auto p-8px">
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-white text-opacity-60">{task.createdAt}</Card.Subtitle>
                <Card.Text>
                  {task.description}
                </Card.Text>
                <Button onClick={() => setShowDetails(task)}>View Details</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
        )}
      </div>

      <Modal show={showNewTask} onHide={() => setShowNewTask(false)} className="bg-black bg-opacity-10" contentClassName="bg-transparent">
        <Modal.Header className="bg-alpha p-12px border-0">
          <Modal.Title>New task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-alpha px-12px">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" onChange={(evt) => updateNewTaskInfo("title", evt.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder="Enter description" onChange={(evt) => updateNewTaskInfo("description", evt.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control as="textarea" placeholder="Enter details" onChange={(evt) => updateNewTaskInfo("details", evt.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-alpha p-12px border-0">
          <Button variant="danger" disabled={adding} onClick={() => setShowNewTask(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            className="d-flex align-items-center gap-4px"
            disabled={adding}
            onClick={() => addTask(newTaskInfo).then(() => { 
              setNewTaskInfo({}); 
              setShowNewTask(false)
            })}
          >
            {adding && (
              <Spinner animation="border" variant="light" size="sm"/>
            )}
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={!!showDetails} onHide={() => setShowDetails(false)} className="bg-black bg-opacity-10" contentClassName="bg-transparent">
        <Modal.Header className="bg-alpha pt-12px px-12px border-0">
          <Modal.Title>Task Title: {showDetails.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-alpha px-12px">
          <p className="text-white text-opacity-50 mb-24px">Created At: {showDetails.createdAt}</p>
          <p className="mb-8px">Description: {showDetails.description}</p>
          <p className="mb-8px">Details: {showDetails.details}</p>
        </Modal.Body>
        <Modal.Footer className="bg-alpha p-12px border-0">
          <Button
            variant="danger"
            className="d-flex align-items-center gap-4px"
            disabled={deleting}
            onClick={() => deleteTask(showDetails).then(() => setShowDetails(false))}
          >
            {deleting && (
              <Spinner animation="border" variant="light" size="sm"/>
            )}
            Delete
          </Button>
          <Button variant="primary" disabled={deleting} onClick={() => setShowDetails(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
