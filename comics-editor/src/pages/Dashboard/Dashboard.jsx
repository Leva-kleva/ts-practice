import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../../redux/ducks/dashboard';
import Lesson from './Level/Lesson/Lesson';
import Level from './Level/Level';
import { Loader } from '../../components/Loader/Loader';
import { calculateLevelHeight } from '../../utils/utils';
import './Dashboard.scss';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboardReducer);
  const [initialLevelHeight, setInitialLevelHeight] = useState(
    calculateLevelHeight(window.innerWidth)
  );

  const renderLevels = useCallback(
    () =>
      data.map((levelData, levelIndex) => {
        return (
          <Level
            initialLevelHeight={initialLevelHeight}
            levelData={levelData}
            key={levelData.name}
          >
            {levelData.lessons.map((lesson, lessonIndex) => (
              <Lesson
                key={`${lesson.name}${lessonIndex}`}
                levelIndex={levelIndex}
                lessonIndex={lessonIndex}
                level={levelData.level}
                lesson={lesson}
              />
            ))}
          </Level>
        );
      }),
    [data, initialLevelHeight]
  );

  useEffect(() => {
    if (!data) dispatch(fetchData());
    const handleResize = () => {
      setInitialLevelHeight(calculateLevelHeight(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="Dashboard">
      <div className="Dashboard-title">Межгалактический курс по шахматам</div>
      {data ? renderLevels() : <Loader />}
    </div>
  );
};

export default Dashboard;
