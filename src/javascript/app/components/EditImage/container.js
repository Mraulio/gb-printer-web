import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  title: state.editImage.title || '',
  hash: state.editImage.hash,
  hashes: state.editImage.hashes,
  palette: state.editImage.palette ? state.palettes.find(({ shortName }) => (
    shortName === state.editImage.palette
  )) || state.palettes[0] : state.palettes[0],
});

const mapDispatchToProps = (dispatch) => ({
  updateTitle: (title) => {
    dispatch({
      type: 'UPDATE_EDIT_IMAGE',
      payload: { title },
    });
  },
  updatePalette: (palette) => {
    dispatch({
      type: 'UPDATE_EDIT_IMAGE',
      payload: { palette },
    });
  },
  save: () => {
    dispatch({
      type: 'SAVE_EDIT_IMAGE',
    });
  },
  cancel: () => {
    dispatch({
      type: 'CANCEL_EDIT_IMAGE',
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
