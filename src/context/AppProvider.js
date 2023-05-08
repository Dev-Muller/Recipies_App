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
  const [apiType, setApiType] = useState('');

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
    setLogin,
    setApiData,
    setApiType,
    setIsClicked,
  }), [login, apiType, apiData, isClicked]);

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
