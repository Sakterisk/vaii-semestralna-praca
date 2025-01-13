import React, { useState, useEffect } from "react";
import axios from 'axios';

function MyWork() {  
    const [activeItem, setActiveItem] = useState(null);
    const [projects, setProjects] = useState([]);

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

    const toggleAccordion = (item) => {
      setActiveItem(activeItem === item ? null : item);
    };
  
    return (

      <div className="accordion">
        {projects.map((project, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${activeItem === index ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleAccordion(index)}
              >
                {project.header}
              </button>
            </h2>
            <div className={`accordion-collapse ${activeItem === index ? 'show' : ''}`}>
              <div className="accordion-body">
                {project.content}
                <br />
                <a href={project.link} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

}

export default MyWork;