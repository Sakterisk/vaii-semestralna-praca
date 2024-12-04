import React, { useState } from "react";

function MyWork() {  
    const [activeItem, setActiveItem] = useState(null);

    const toggleAccordion = (item) => {
      setActiveItem(activeItem === item ? null : item);
    };
  
    return (
      <div className="accordion">
        {accordionData.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${activeItem === index ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleAccordion(index)}
              >
                {item.title}
              </button>
            </h2>
            <div className={`accordion-collapse ${activeItem === index ? 'show' : ''}`}>
              <div className="accordion-body">
                <strong>{item.strongText}</strong> {item.content}
                <br />
                <a href={item.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

}
const accordionData = [
    {
      title: 'Werehouse Wreckage',
      strongText: 'This is my first project in Unreal Engine.',
      content: 'It is a simple game where you have to navigate through a warehouse and avoid obstacles. The game features simple controls and a variety of levels to keep you entertained. I am currently working on adding new features and improving the overall experience.',
      githubLink: 'https://github.com/Sakterisk/warehouse-wreckage'
    },
    {
      title: "Don't Hit The Corner",
      strongText: 'This is my first project in C#.',
      content: 'It is a simple game where you have to navigate through a maze and avoid hitting the walls. The game features simple controls and a variety of levels to keep you entertained. I am currently working on adding new features and improving the overall experience.',
      githubLink: 'https://github.com/Sakterisk/don-t-hit-the-corner'
    },
    {
      title: 'VAII - school project',
      strongText: 'This is the web page you are currently on.',
      content: 'It is a simple web page that showcases my work as a game developer. The page features information about me, my skills, and my projects. I am currently working on adding new features and improving the overall experience.',
      githubLink: 'https://github.com/Sakterisk/vaii-semestralna-praca'
    }
  ];

export default MyWork;