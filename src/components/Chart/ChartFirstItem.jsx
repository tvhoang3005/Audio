import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { toggleDropDown } from '../../store/uiSlice';
import { changeAlias } from '../../utils/func';
import Dropdown from '../Dropdown/Dropdown';
import LazyloadImage from '../LazyloadImage/LazyloadImage';
import LinkArtist from '../LinkArtist/LinkArtist';

const ChartFirstItem = ({ title, order, id, artists, thumbnail }) => {
    const dispatch = useDispatch();

    return (
        <li className="chart-item">
            <div className="chart-item-detail detail-first">
                <div className="chart-item-detail-left">
                    <div className="chart-item-order order-first">
                        <LazyloadImage lazyPlace="chart" id={id} thumbnail={thumbnail} />
                        {order}
                    </div>
                    <div className="chart-item-info">
                        <div className="chart-item-title ellipsis">
                            <Link to={`/song/${changeAlias(title)}/${id}`}>{title}</Link>
                        </div>
                        <LinkArtist artists={artists} definePath="nghe si" />
                    </div>
                </div>
                <div className="chart-item-detail-right">
                    <button className="sc-ir" aria-label="Download">
                        <i className="ion-android-download"></i>
                    </button>
                    <button
                        className="sc-ir"
                        onClick={() => dispatch(toggleDropDown('chart', id))}
                        aria-label="More options"
                    >
                        <i className="ion-more"></i>
                    </button>
                </div>
            </div>
            <Dropdown where="chart" song={{ id, thumbnail, artists, title }} />
        </li>
    );
};

export default ChartFirstItem;
