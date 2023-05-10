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
    console.log(recomended);
  }, [apiType]);

  useEffect(() => {
    if (apiType === 'Drink') setType('Meal');
    if (apiType === 'Meal') setType('Drink');

    runFetchRecomendation();
  }, [apiType, history.location.pathname, setApiType, runFetchRecomendation]);

  const limit = 6;

  return (
    <div>
      <h1>Recomended</h1>
      {recomendedList.slice(0, limit).map((item, index) => (
        <div
          data-testid={ `${index}-recommendation-card` }
          key={ index }
        >
          <p
            data-testid={ `${index}-recommendation-title` }
          >
            { item[`str${type}`] }

          </p>
        </div>
      ))}
    </div>
  );
}

export default Recomended;
