import { useCallback, useEffect, useState } from "react";

const BASE_URL = `http://localhost:3001`;

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const fetchTasks = useCallback(() => {
        setLoading(true);
        fetch(`${BASE_URL}/tasks`).then((res) => res.json()).then((tasks) => {
            setTasks(tasks);
            setLoading(false);
        });
    }, []);

    const addTask = useCallback(async (task) => {
        setAdding(true)
        return fetch(`${BASE_URL}/tasks`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        }).then((res) => res.json()).then(() => {
            setAdding(false);
            fetchTasks();
        });
    }, [fetchTasks]);

    const deleteTask = useCallback(async (task) => {
        setDeleting(true)
        return fetch(`${BASE_URL}/tasks/${task._id}`, {
            method: "DELETE"
        }).then((res) => res.json()).then(() => {
            setDeleting(false);
            fetchTasks();
        });
    }, [fetchTasks]);

    useEffect(() => {
        fetchTasks();
    }, []);

    return { tasks, loading, addTask, deleteTask, adding, deleting }
}