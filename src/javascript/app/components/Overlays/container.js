import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  showProgressLog: !!state.progressLog,
  showInfoBox: state.framesMessage === 1,
  showProgressBox: !!state.progress.gif || !!state.progress.printer,
  showConfirm: !!state.confirm.length,
  showEditForm: !!state.editImage,
  showEditPalette: !!state.editPalette.shortName,
  showVideoForm: !!state.videoParams.imageSelection && !!state.videoParams.imageSelection.length,
  showRGBNImage: !!state.rgbnImages,
  showLightbox: state.lightboxImage !== null,
  showDragOver: !!state.dragover,
  showFilters: !!state.filtersVisible,
  showSortForm: !!state.sortOptionsVisible,
  syncSelect: !!state.syncSelect,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps);
