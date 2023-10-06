import React, { useState } from 'react';
import './Card.css'; // Import your CSS file here
import img from './image.png';

function Card() {
  const [isExpanded, setExpanded] = useState(false);
  const [isHoverEnabled, setHoverEnabled] = useState(true);

  const toggleCardExpansion = () => {
    if (!isExpanded) {
      setExpanded(true);
      setHoverEnabled(false);
    } else {
      setExpanded(false);
      setHoverEnabled(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!isHoverEnabled) return;

    const card = e.currentTarget;
    const cardCenterX = card.offsetWidth / 2;
    const cardCenterY = card.offsetHeight / 2;

    const mouseX = e.clientX - card.getBoundingClientRect().left - cardCenterX;
    const mouseY = e.clientY - card.getBoundingClientRect().top - cardCenterY;

    const tiltX = (mouseY / cardCenterY) * 30; // Tilt up or down
    const tiltY = -(mouseX / cardCenterX) * 30; // Tilt left or right

    const translateZ = isExpanded ? 100 : 50;

    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${translateZ}px)`;
    card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease'; // Add smooth transitions

    const shadowX = -tiltY;
    const shadowY = 0;

    card.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.4)`;
  };

  const resetCard = (e) => {
    if (!isExpanded) {
      const card = e.currentTarget;
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.2)';
      card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease'; // Add smooth transitions
    }
  };

  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    card.style.transition = 'none';
  };

  return (
    <div
      className={`container ${isExpanded ? 'expanded' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => resetCard(e)}
      onMouseEnter={handleMouseEnter}
      onClick={toggleCardExpansion}
    >
      <div className="card">
        <img src={img} alt="Card" className="card-image" />
      </div>
    </div>
  );
}

export default Card;
