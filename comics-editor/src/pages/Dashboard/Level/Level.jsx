import React, { useState, createRef, useEffect } from 'react';
import './Level.scss';

const Level = ({ levelData, children, initialLevelHeight }) => {
  const [currentStyles, setCurrentStyles] = useState({
    height: `${initialLevelHeight}px`,
  });
  const [isActive, setActiveState] = useState(false);

  const ulRef = createRef();
  const { level, name, description } = levelData;

  const buttonClickHandler = () => {
    let styles = { height: `${initialLevelHeight}px` };
    if (!isActive) {
      styles = {
        height: `${
          initialLevelHeight + ulRef.current.getBoundingClientRect().height
        }px`,
      };
    }
    setActiveState(!isActive);
    setCurrentStyles(styles);
  };

  useEffect(() => {
    setCurrentStyles({ height: `${initialLevelHeight}px` });
  }, [initialLevelHeight]);

  return (
    <div style={currentStyles} className="Level">
      <div className="Level-wrapper">
        <div className="Level__flex-wrapper">
          <div className="Level__info">
            <img
              className="Level__img"
              alt="level"
              src={require(`./assets/Level_${level}.png`)}
            />
            <div className="level__info-wrapper">
              <p className="Level__title">{`Уровень ${level}: ${name}`}</p>
              <p className="Level__description">{description}</p>
            </div>
          </div>
          <button
            onClick={buttonClickHandler}
            className="Level__button"
            type="button"
          >
            {isActive ? 'Скрыть' : 'Приступить'}
          </button>
        </div>
        <div className="Level__list-wrapper">
          <ul ref={ulRef} className="Level__list">
            {children}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Level;
