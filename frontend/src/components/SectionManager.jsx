import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SectionManager({ back })
{
    const [formData, setFormData] = useState({
        header: '',
        content: ''
    });
    const [sections, setSections] = useState([]);
    const [action, setAction] = useState('sections');
    const [editId, setEditId] = useState(null);
    
    const getSections = async () => {
        try {
            const response = await axios.get('/api/sections');
            setSections(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSections();
    }, []);


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    

    const addSection = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/sections', formData);
            setFormData({ header: '', content: '' });
            setAction('sections');
            getSections();
        }
        catch (error) {
            console.log(error);
        }
    }
    
    const editSection = async (event) => {
        event.preventDefault();
        const confirmEdit = window.confirm("Are you sure you want to edit this section?");
        if (!confirmEdit) return;
        try {
            await axios.put(`/api/sections/${editId}`, formData);
            setFormData({ header: '', content: '' });
            setAction('sections');
            getSections();
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteSection = async (id) => {
        try {
            await axios.delete(`/api/sections/${id}`);
            setAction('sections');
            getSections();
        }
        catch (error) {
            console.log(error);
        }
    }

    const editButton = (id) => {
        setAction('edit');
        setEditId(id);
        const section = sections.find(section => section.id === id);
        setFormData({ header: section.header, content: section.content });

    }

    const deleteButton = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this section?");
        if (!confirmDelete) return;
        setAction('sections');
        deleteSection(id);
    }

    const addButton = () => {
        setFormData({ header: '', content: '' });
        setAction('add');
    }

    const sectionsButton = () => {
        setFormData({ header: '', content: '' });
        setAction('sections');
    }

  return (
    <>
        <div className="admin-menu">
            <button onClick={() => sectionsButton()}>Show sections</button>
            <button onClick={() => addButton()}>Add section</button>
            <button onClick={() => back()}>Back</button>
        </div>
        {(action === 'add' || action === 'edit') ? 
        <form onSubmit={action === 'add' ? addSection : editSection}>
            <div className="form-group">
                <label htmlFor="input-header">Header</label>
                <input onChange={handleChange} type="text" name='header' id="input-header" placeholder="Header..." className="form-control" value={formData.header} />
            </div>
            <div className="form-group">
                <label htmlFor="input-content">Content</label>
                <textarea onChange={handleChange} name='content' id="input-content" rows="3" className="form-control" value={formData.content}></textarea>
            </div>
            <button type="submit">{action === 'add' ? 'Add' : 'Edit'}</button>
        </form>
        : 
        <div className="sm-sections">
            {sections.map((section, index) => (
                <div key={index} className="sm-section">
                    <h1>{section.header}</h1>
                    <div className="sm-buttons">
                        <button onClick={() => editButton(section.id)}>Edit</button>
                        <button onClick={() => deleteButton(section.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
        }

    </>
  );
};

export default SectionManager;