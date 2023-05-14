import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRecomendation } from '../../services/fetchs_functions';
import AppContext from '../../context/AppContext';

function Recomended() {
  const { apiType, setApiType } = useContext(AppContext);
  const [recomendedList, setRecomendedList] = useState([]);
  const history = useHistory();

  const runFetchRecomendation = useCallback(async () => {
    const recomended = await fetchRecomendation(apiType);
    setRecomendedList(recomended);
  }, [apiType]);

  useEffect(() => {
    runFetchRecomendation();
  }, [apiType, history.location.pathname, setApiType, runFetchRecomendation]);

  const limit = 6;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
  };
  const newRecomended = recomendedList.slice(0, limit);

  return (
    <div>
      <Slider { ...settings }>
        {newRecomended.map((item, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <img
              className="foods-img"
              data-testid={ `${index}-card-img` }
              height="150"
              width="150"
              src={ item[`str${apiType === 'Meal' ? 'Drink' : 'Meal'}Thumb`] }
              alt={ item[`st${apiType === 'Meal' ? 'Drink' : 'Meal'}`] }
            />
            <p
              data-testid={ `${index}-recommendation-title` }
            >
              { item[`str${apiType === 'Meal' ? 'Drink' : 'Meal'}`] }
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Recomended;
