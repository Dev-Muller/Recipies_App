import React from 'react';
import PropTypes from 'prop-types';

function ComponentImage({ icon, alt, testId }) {
  return (
    <img
      src={ icon }
      alt={ alt }
      data-testid={ testId }
    />
  );
}

ComponentImage.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};
export default ComponentImage;
