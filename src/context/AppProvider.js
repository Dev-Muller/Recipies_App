import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [apiData, setApiData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [apiType, setApiType] = useState('');
  const [apiCategory, setApiCategory] = useState('');
  const [recipeId, setRecipeId] = useState('');

  useEffect(() => {
    const verifyApiData = () => {
      if (apiData === null) {
        console.log('alert');
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };
    verifyApiData();
  }, [apiData]);

  const values = useMemo(() => ({
    login,
    apiData,
    apiType,
    isClicked,
    apiCategory,
    isFiltered,
    recipeId,
    setLogin,
    setApiData,
    setApiType,
    setIsClicked,
    setApiCategory,
    setIsFiltered,
    setRecipeId,
  }), [login, apiType, apiData, isClicked, apiCategory, isFiltered, recipeId]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default AppProvider;
