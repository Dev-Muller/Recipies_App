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
  const [type, setType] = useState('');
  const history = useHistory();

  const runFetchRecomendation = useCallback(async () => {
    const recomended = await fetchRecomendation(apiType);
    setRecomendedList(recomended);
  }, [apiType]);

  useEffect(() => {
    if (apiType === 'Drink') setType('Meal');
    if (apiType === 'Meal') setType('Drink');

    runFetchRecomendation();
  }, [apiType, history.location.pathname, setApiType, runFetchRecomendation]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider { ...settings }>
        {recomendedList.slice(0, settings.slidesToShow).map((item, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <img
              className="foods-img"
              data-testid={ `${index}-card-img` }
              height="150"
              width="150"
              src={ item[`str${apiType}Thumb`] }
              alt={ item[`str${apiType}`] }
            />
            <p
              data-testid={ `${index}-recommendation-title` }
            >
              { item[`str${type}`] }
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Recomended;
