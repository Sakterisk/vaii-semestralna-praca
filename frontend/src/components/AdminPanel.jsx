import React, { useState } from 'react';
import SectionManager from './SectionManager';
import MessageManager from './MessageManager';
import ProjectManager from './ProjectManager';

function AdminPanel()
{
    const [menu, setMenu] = useState('');

    const back = () => {
        setMenu('');
    }

    const showMenu = () => {
        if (menu === 'sections') {
            return <SectionManager back={back}/>;
        } else if (menu === 'messages') {
            return <MessageManager back={back}/>;
        } else if (menu === 'projects') {
            return <ProjectManager back={back}/>;
        } else {
            return <></>;
        }
    }



  return (
    <>
        <div className="admin-panel">
            {menu === '' ?
            <div className="admin-menu">
                <button onClick={() => setMenu('sections')}>Sections</button>
                <button onClick={() => setMenu('messages')}>Messages</button>
                <button onClick={() => setMenu('projects')}>Projects</button>
            </div>
            : <></>}
            <div className="admin-content">
                {showMenu()}
            </div>
        </div>
    </>
  );
};

export default AdminPanel;