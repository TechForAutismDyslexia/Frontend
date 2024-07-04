import React, { useState, useEffect } from 'react';
import IconsData from './images.json';

export default function Games() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const iconsArray = Object.values(IconsData.icons);
    setIcons(iconsArray);
  }, []);

  return (
    <div className='p-3' style={{ backgroundColor: '#6aa8e6' }}>
      {/* <div className='text-center'>
        <h1>Games</h1>
      </div> */}
      <div className="container">
        <div className="row">
          {icons.slice(0, 14).map((icon, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
              <a href={icon.route}  target='_blank'  className="card-link" style={{textDecoration:'none'}} >
                <div className="card" style={{borderRadius:'30px'}}>
                  <img
                    src={icon.url}
                    className="card-img-top"
                    alt={icon.name}
                    style={{ padding: '40px' }}
                  />
                  <div className="card-body text-center rounded-bottom-4" style={{ backgroundColor: '#f2e4aa'}}>
                    <h5 className="card-title">{icon.name}</h5>
                    <p className="card-text">{icon.description}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
