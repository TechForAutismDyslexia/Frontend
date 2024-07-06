import React, { useState, useEffect } from 'react';
import GameData from './gameData.json';

export default function Games() {
  const [icons, setIcons] = useState([]);


  useEffect(() => {
    const loadIcons = async () => {
      const iconsArray = await Promise.all(
        (GameData).map(async icon => {
          const imageUrl = await import(`../assets/icons/${icon.img}.jpg`);
          return { ...icon, url: imageUrl.default };
        })
      );
      setIcons(iconsArray);
    };
    loadIcons();
  }, []);

  const setGameId = (id) =>{
    sessionStorage.setItem('gameId',id);
  }

  return (
    <div className='p-3'>
      <div className="container">
        <div className="row">
          {icons.slice(0, 13).map((icon, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
              <a href={icon.route} target='_blank' className="card-link"  style={{textDecoration:'none'}}>
                <div className="card" style={{borderRadius:'30px'}} onClick={()=>setGameId(icon.gameId)}>
                  <img
                    src={icon.url}  
                    className="card-img-top"
                    alt={icon.name}
                    style={{ padding: '40px' }}
                  />
                  <div className="card-body text-center rounded-bottom-4" style={{ backgroundColor: 'rgb(100, 150, 200)' }}>
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
