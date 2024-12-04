import React from 'react';

function Section({ header, content })
{
  return (
    <section>
      <h2>{header}</h2>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>
    </section>
  );
};

export default Section;