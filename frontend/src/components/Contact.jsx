import React from 'react';

function Contact() {
  return (
      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="inputName">Name</label>
            <input type="text" id="inputName" placeholder="Name..." className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="inputSurname">Surname</label>
            <input type="text" id="inputSurname" placeholder="Surname..." className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input type="email" id="inputEmail" placeholder="Email..." className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="inputSubject">Subject</label>
          <input type="text" id="inputSubject" placeholder="Subject..." className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="inputContent">Content</label>
          <textarea id="inputContent" rows="3" className="form-control"></textarea>
        </div>
        <div className="form-group button-container">
          <button type="submit" className="form-button">Send</button>
        </div>
      </form>
  );
}

export default Contact;