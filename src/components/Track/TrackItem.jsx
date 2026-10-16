import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { toggleDropDown } from '../../store/uiSlice';
import { changeAlias } from '../../utils/func';
import Dropdown from '../Dropdown/Dropdown';
import LazyloadImage from '../LazyloadImage/LazyloadImage';
import LinkArtist from '../LinkArtist/LinkArtist';

const TrackItem = ({ title, order, thumbnail, artists, id }) => {
    const dispatch = useDispatch();

    return (
        <li className="track-item">
            <div className="track-position">{order + 1}</div>
            <LazyloadImage lazyPlace="track" id={id} thumbnail={thumbnail} />
            <div className="track-detail">
                <div className="track-title">
                    <Link to={`/song/${changeAlias(title)}/${id}`}>{title}</Link>
                </div>
                <LinkArtist artists={artists} definePath="nghe-si" />
            </div>
            <div className="track-actions">
                <div className="track-toolbar">
                    <button className="sc-ir" aria-label="Download">
                        <i className="ion-android-download"></i>
                    </button>
                    <button className="sc-ir" aria-label="Share">
                        <i className="ion-android-share"></i>
                    </button>
                    <button
                        className="sc-ir"
                        onClick={() => dispatch(toggleDropDown('track', id))}
                        aria-label="More options"
                    >
                        <i className="ion-more"></i>
                    </button>
                </div>
            </div>
            <Dropdown where="track" song={{ id, thumbnail, artists, title }} />
        </li>
    );
};

export default TrackItem;
