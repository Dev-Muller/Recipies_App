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

  useEffect(() => {
    const verifyApiData = () => {
      if (apiData === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };
    verifyApiData();
  });

  const values = useMemo(() => ({
    login,
    apiData,
    apiType,
    isClicked,
    apiCategory,
    isFiltered,
    setLogin,
    setApiData,
    setApiType,
    setIsClicked,
    setApiCategory,
    setIsFiltered,
  }), [login, apiType, apiData, isClicked, apiCategory, isFiltered]);

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
