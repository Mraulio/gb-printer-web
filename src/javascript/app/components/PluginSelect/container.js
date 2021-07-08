import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  plugins: state.plugins,
});

const mapDispatchToProps = (dispatch, { hash }) => ({
  toPlugins: (url) => {
    if (hash) {
      dispatch({
        type: 'PLUGIN_IMAGE',
        payload: {
          url,
          hash,
        },
      });
    } else {
      dispatch({
        type: 'PLUGIN_IMAGES',
        payload: {
          url,
        },
      });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
