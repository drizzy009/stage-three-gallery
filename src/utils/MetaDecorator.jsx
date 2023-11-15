import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const MetaDecorator = ({ title, description }) => {
  return (
    <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
    </HelmetProvider>
  );
};

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default MetaDecorator;
