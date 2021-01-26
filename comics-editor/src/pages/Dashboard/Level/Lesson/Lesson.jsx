import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedLevel } from '../../../../redux/ducks/dashboard';
import './Lesson.scss';
import { NavLink } from 'react-router-dom';

const Lesson = ({ lesson, level, levelIndex, lessonIndex }) => {
  const dispatch = useDispatch();
  const { name, idx } = lesson;

  const lessonLinkButtonHandler = () => {
    dispatch(
      setSelectedLevel({
        lessonIndex,
        levelIndex,
      })
    );
  };

  return (
    <li className="Lesson">
      <div className="Lesson-wrapper">
        <div className="Lesson-info">
          <p className="Lesson-index">{lessonIndex + 1}</p>
          <p className="Lesson-suptitle">урок</p>
          <p className="Lesson-title">{name}</p>
        </div>
        <NavLink
          to={`edit/${level}/${idx}`}
          className="nav-link-reset"
          onClick={lessonLinkButtonHandler}
        >
          <button className="Lesson-btn btn-link">
            <div className="Lesson-btn__no-hover">Редактировать</div>
            <div className="Lesson-btn__hover">Редактировать</div>
          </button>
        </NavLink>
      </div>
    </li>
  );
};

export default Lesson;
