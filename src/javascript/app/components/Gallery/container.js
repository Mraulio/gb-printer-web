import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  images: state.images,
  currentView: state.galleryView,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps);
