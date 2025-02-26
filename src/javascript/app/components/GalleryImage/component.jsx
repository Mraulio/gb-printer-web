import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import classnames from 'classnames';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import GalleryImageButtons from '../GalleryImageButtons';
import RGBNSelect from '../RGBNSelect';
import { dateFormat } from '../../defaults';
import dateFormatLocale from '../../../tools/dateFormatLocale';
import ImageRender from '../ImageRender';
import { FILTER_FAVOURITE } from '../../../consts/specialTags';

dayjs.extend(customParseFormat);

const GalleryImage = ({
  hideDate,
  created,
  updateImageSelection,
  isSelected,
  page,
  editImage,
  lockFrame,
  invertPalette,
  palette,
  frame,
  title,
  tags,
  isFavourite,
  hash,
  hashes,
  type,
  preferredLocale,
}) => {

  const getDateSpan = (className) => {
    if (hideDate || !created) {
      return null;
    }

    return (
      <span className={className}>
        { dateFormatLocale(dayjs(created, dateFormat), preferredLocale) }
      </span>
    );
  };

  const handleCellClick = (ev) => {
    if (ev.ctrlKey || ev.shiftKey) {
      ev.preventDefault();
      updateImageSelection(isSelected ? 'remove' : 'add', ev.shiftKey, page);
    } else {
      editImage();
    }
  };

  return type === 'default' ? (
    <li
      className={
        classnames('gallery-image', {
          'gallery-image--selected': isSelected,
        })
      }
      onClick={handleCellClick}
      role="presentation"
    >
      <div className="gallery-image__image">
        <ImageRender
          lockFrame={lockFrame}
          invertPalette={invertPalette}
          palette={palette.palette || palette}
          frame={frame}
          hash={hash}
          hashes={hashes}
        />
      </div>
      {title ? (
        <span
          className="gallery-image__title"
        >
          {title}
        </span>
      ) : null}
      <ul className="gallery-image__tags">
        {tags.map((tag) => (
          <li
            key={tag}
            title={tag === FILTER_FAVOURITE ? 'Favourite' : tag}
            className="gallery-image__tag"
          >
            {tag === FILTER_FAVOURITE ? '❤️' : tag}
          </li>
        ))}
      </ul>
      {getDateSpan('gallery-image__created')}
      <GalleryImageButtons
        isFavourite={isFavourite}
        hash={hash}
        buttons={['select', 'favourite', 'download', 'delete', 'view', 'share', 'plugins']}
      />
    </li>
  ) : (
    <tr
      className={
        classnames('gallery-list-image', {
          'gallery-list-image--selected': isSelected,
        })
      }
      onClick={handleCellClick}
      role="presentation"
    >
      <td className="gallery-list-image__cell-image">
        <div className="gallery-list-image__image">
          <div className="gallery-list-image__image--scale">
            <ImageRender
              lockFrame={lockFrame}
              invertPalette={invertPalette}
              palette={palette.palette || palette}
              frame={frame}
              hash={hash}
              hashes={hashes}
            />
          </div>
        </div>
      </td>

      <td className="gallery-list-image__cell-description">
        <div className="gallery-list-image__description">
          <span className="gallery-list-image__title">
            {title}
          </span>
          {getDateSpan('gallery-list-image__created')}
        </div>
      </td>

      <td className="gallery-list-image__cell-rgbn">
        { hashes ? null : (
          <RGBNSelect hash={hash} />
        )}
      </td>

      <td className="gallery-list-image__cell-buttons">
        <GalleryImageButtons
          isFavourite={isFavourite}
          hash={hash}
          buttons={['select', 'favourite', 'download', 'delete', 'view', 'plugins']}
        />
      </td>
    </tr>
  );
};

GalleryImage.propTypes = {
  created: PropTypes.string,
  hash: PropTypes.string.isRequired,
  hashes: PropTypes.object,
  palette: PropTypes.object.isRequired,
  invertPalette: PropTypes.bool.isRequired,
  frame: PropTypes.string,
  lockFrame: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFavourite: PropTypes.bool.isRequired,
  editImage: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['list', 'default']).isRequired,
  isSelected: PropTypes.bool.isRequired,
  updateImageSelection: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  hideDate: PropTypes.bool.isRequired,
  preferredLocale: PropTypes.string,
};

GalleryImage.defaultProps = {
  created: null,
  hashes: null,
  frame: null,
  preferredLocale: null,
};

export default GalleryImage;
