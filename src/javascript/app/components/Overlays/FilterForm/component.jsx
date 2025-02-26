import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import unique from '../../../../tools/unique';
import { useAvailableTags } from '../../../../hooks/useAvailableTags';
import Lightbox from '../../Lightbox';
import FilterFormTag from './filterFormTag';
import {
  FILTER_NEW,
  FILTER_UNTAGGED,
  FILTER_MONOCHROME,
  FILTER_RGB,
  FILTER_RECENT,
  FILTER_FAVOURITE,
} from '../../../../consts/specialTags';

const FilterForm = (props) => {

  const [activeTags, setActiveTags] = useState(props.activeTags);

  const { availableTags } = useAvailableTags();

  useEffect(() => {
    setActiveTags(props.activeTags);
  }, [props.activeTags]);

  const updateActiveTags = (tag, mode) => {
    setActiveTags(mode === 'add' ? unique([...activeTags, tag]) : activeTags.filter((t) => t !== tag));
  };

  if (!props.visible) {
    return null;
  }

  return (
    <Lightbox
      className="filter-form"
      confirm={() => props.setActiveTags(activeTags)}
      deny={() => props.hideFilters()}
      header="Select Filters"
    >
      <span
        className="filter-form__hint"
      >
        If set, all must be met
      </span>
      <ul
        className="filter-form__tag-list"
      >
        <FilterFormTag
          title="Untagged"
          tagActive={activeTags.includes(FILTER_UNTAGGED)}
          toggleTag={(active) => updateActiveTags(FILTER_UNTAGGED, active)}
        />
        <FilterFormTag
          title="❤️ Favourite"
          tagActive={activeTags.includes(FILTER_FAVOURITE)}
          toggleTag={(active) => updateActiveTags(FILTER_FAVOURITE, active)}
        />
        <FilterFormTag
          title="New"
          tagActive={activeTags.includes(FILTER_NEW)}
          toggleTag={(active) => updateActiveTags(FILTER_NEW, active)}
        />
        <FilterFormTag
          title="Monochrome"
          tagActive={activeTags.includes(FILTER_MONOCHROME)}
          toggleTag={(active) => updateActiveTags(FILTER_MONOCHROME, active)}
        />
        <FilterFormTag
          title="RGB"
          tagActive={activeTags.includes(FILTER_RGB)}
          toggleTag={(active) => updateActiveTags(FILTER_RGB, active)}
        />
        <FilterFormTag
          title="Recent Imports"
          tagActive={activeTags.includes(FILTER_RECENT)}
          toggleTag={(active) => updateActiveTags(FILTER_RECENT, active)}
        />
      </ul>
      <ul
        className="filter-form__tag-list filter-form__tag-list--clear"
      >
        <FilterFormTag
          title="Clear Filters"
          tagActive={false}
          icon="delete"
          toggleTag={() => {
            setActiveTags([]);
          }}
        />
      </ul>
      <span
        className="filter-form__hint"
      >
        If set, one must be met
      </span>
      <ul
        className="filter-form__tag-list"
      >
        {availableTags.map((tag) => (
          <FilterFormTag
            key={tag}
            title={tag}
            tagActive={activeTags.includes(tag)}
            toggleTag={(active) => updateActiveTags(tag, active)}
          />
        ))}
      </ul>
    </Lightbox>
  );
};

FilterForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  activeTags: PropTypes.array.isRequired,
  setActiveTags: PropTypes.func.isRequired,
  hideFilters: PropTypes.func.isRequired,
};

FilterForm.defaultProps = {};

export default FilterForm;
