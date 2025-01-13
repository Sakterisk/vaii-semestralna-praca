import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectManager({ back })
{
    const [formData, setFormData] = useState({
        header: '',
        content: '',
        link: ''
    });
    const [projects, setProjects] = useState([]);
    const [action, setAction] = useState('projects');
    const [editId, setEditId] = useState(null);
    
    const getProjects = async () => {
        try {
            const response = await axios.get('/api/projects');
            setProjects(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProjects();
    }, []);


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    

    const addProject = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/projects', formData);
            setFormData({ header: '', content: '', link: '' });
            setAction('projects');
            getProjects();
        }
        catch (error) {
            console.log(error);
        }
    }
    
    const editProject = async (event) => {
        event.preventDefault();
        const confirmEdit = window.confirm("Are you sure you want to edit this project?");
        if (!confirmEdit) return;
        try {
            await axios.put(`/api/projects/${editId}`, formData);
            setFormData({ header: '', content: '' });
            setAction('projects');
            getProjects();
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteProject = async (id) => {
        try {
            await axios.delete(`/api/projects/${id}`);
            setAction('projects');
            getProjects();
        }
        catch (error) {
            console.log(error);
        }
    }

    const editButton = (id) => {
        setAction('edit');
        setEditId(id);
        const project = projects.find(project => project.id === id);
        setFormData({ header: project.header, content: project.content, link: project.link });

    }

    const deleteButton = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;
        setAction('projects');
        deleteProject(id);
    }

    const addButton = () => {
        setFormData({ header: '', content: '', link: '' });
        setAction('add');
    }

    const projectsButton = () => {
        setFormData({ header: '', content: '', link: '' });
        setAction('projects');
    }

  return (
    <>
        <div className="admin-menu">
            <button onClick={() => projectsButton()}>Show projects</button>
            <button onClick={() => addButton()}>Add project</button>
            <button onClick={() => back()}>Back</button>
        </div>
        {(action === 'add' || action === 'edit') ? 
        <form onSubmit={action === 'add' ? addProject : editProject}>
            <div className="form-group">
                <label htmlFor="input-header">Header</label>
                <input onChange={handleChange} type="text" name='header' id="input-header" placeholder="Header..." className="form-control" value={formData.header} />
            </div>
            <div className="form-group">
                <label htmlFor="input-content">Content</label>
                <textarea onChange={handleChange} name='content' id="input-content" rows="3" className="form-control" value={formData.content}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="input-link">Content</label>
                <input onChange={handleChange} type="text" name='link' id="input-link" rows="3" className="form-control" value={formData.link}/>
            </div>
            <button type="submit">{action === 'add' ? 'Add' : 'Edit'}</button>
        </form>
        : 
        <div className="sm-sections">
            {projects.map((project, index) => (
                <div key={index} className="sm-section">
                    <h1>{project.header}</h1>
                    <div className="sm-buttons">
                        <button onClick={() => editButton(project.id)}>Edit</button>
                        <button onClick={() => deleteButton(project.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
        }

    </>
  );
};

export default ProjectManager;