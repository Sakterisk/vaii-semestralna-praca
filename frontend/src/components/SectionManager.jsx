import { useEffect } from 'react';
import React, { useState } from 'react';



function SectionManager()
{
    const [openMenuAdd, setOpenMenuAdd] = useState(false);
    const toggleMenuAdd = () => {
        if (openMenuEdit)
        {
            setOpenMenuEdit(!openMenuEdit);
            document.getElementById('inputEditHeader').value = '';
            document.getElementById('inputEditContent').value = '';
            formData.header = '';
            formData.content = '';
        }
        setOpenMenuAdd(!openMenuAdd);
    };
    const [openMenuEdit, setOpenMenuEdit] = useState(false);
    const toggleMenuEdit = () => {
        if (openMenuAdd)
        {
            setOpenMenuAdd(!openMenuAdd);
        }
        if (!openMenuEdit)
        {
            formData.header = headers[selectedSectionIndex];
            formData.content = contents[selectedSectionIndex];
            document.getElementById('inputEditHeader').value = headers[selectedSectionIndex];
            document.getElementById('inputEditContent').value = contents[selectedSectionIndex];
        } else {
            document.getElementById('inputEditHeader').value = '';
            document.getElementById('inputEditContent').value = '';
            formData.header = '';
            formData.content = '';
        }
        setOpenMenuEdit(!openMenuEdit);
    };

    const [selectedSection, setSelectedSection] = useState(0);
    const [selectedSectionIndex, setSelectedSectionIndex] = useState(-1);

    const selectSection = (event) => {
        setSelectedSection(event.target.id);
        setSelectedSectionIndex(event.target.name);
    }

    const [headers, setHeaders] = useState([]);
    const [ids, setIds] = useState([]);
    const [contents, setContents] = useState([]);

    const sectionsData = () => {
        fetch('http://localhost:8000/api/sections')
        .then(response => response.json())
        .then(data => {
            setHeaders(data.map(section => section.header));
            setIds(data.map(section => section.id));
            setContents(data.map(section => section.content));
        });
    }

    useEffect(() => {
        sectionsData();
    }, []);

    const [formData, setFormData] = useState({
        header: '',
        content: ''
    });

    const [error, setError] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        const pattern = /^[a-zA-Z0-9- ]+$/;

        if (pattern.test(value)) {
            setFormData({
                ...formData,
                [event.target.name]: value
            });
            setError('');
        } else {
            setError('Only alphanumeric characters are allowed');
        }
    }

    

    const addSection = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(formData));
        fetch('http://localhost:8000/api/sections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(formData)  
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('inputAddHeader').value = '';
            document.getElementById('inputAddContent').value = '';
            setOpenMenuAdd(false);
            sectionsData();
        });
        
    }
    
    const editSection = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8000/api/sections/${selectedSection}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('inputEditHeader').value = '';
            document.getElementById('inputEditContent').value = '';
            setOpenMenuEdit(false);
            sectionsData();
        });
    }

    const deleteSection = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8000/api/sections/${selectedSection}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            setSelectedSection(0);
            sectionsData();
        });
    }

  return (
    <>
        <div className="sm-buttons">
            <button onClick={toggleMenuAdd}>Add</button>
            <button disabled={selectedSection === 0} onClick={toggleMenuEdit}>Edit</button>
            <button disabled={selectedSection === 0} onClick={deleteSection}>Delete</button>
        </div>
        <form className={`sm-add-form ${openMenuAdd ? 'active' : ''}`}>
            <div className="form-group">
                <label htmlFor="inputHeader">Header</label>
                <input onChange={handleChange} type="text" name='header' id="inputAddHeader" placeholder="Header..." className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="inputContent">Content</label>
                <textarea onChange={handleChange} name='content' id="inputAddContent" rows="3" className="form-control"></textarea>
            </div>
            <div className="form-group">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className="form-group button-container">
                <button disabled={error} className="form-button" onClick={addSection}>Add</button>
            </div>
        </form>
        <form className={`sm-add-form ${openMenuEdit ? 'active' : ''}`}>
            <div className="form-group">
                <label htmlFor="inputHeader">Header</label>
                <input onChange={handleChange} type="text" name='header' id="inputEditHeader" placeholder="Header..." className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="inputContent">Content</label>
                <textarea onChange={handleChange} name='content' id="inputEditContent" rows="3" className="form-control"></textarea>
            </div>
            <div className="form-group">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className="form-group button-container">
                <button disabled={error} className="form-button" onClick={editSection}>Save</button>
            </div>
        </form>
        <div className="sm-sections">
            {headers.map((header, index) => (
                <button id={ids[index]} name={index} onClick={selectSection} className={`sm-section ${selectedSection == ids[index] ? 'selected' : ''}`}>
                    {index + 1}. {header}
                </button>
            ))}
        </div>

    </>
  );
};

export default SectionManager;