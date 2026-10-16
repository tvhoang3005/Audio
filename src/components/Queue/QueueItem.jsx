import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { removeFromQueue } from '../../store/queueSlice';
import { changeAlias } from '../../utils/func';
import LazyloadImage from '../LazyloadImage/LazyloadImage';
import LinkArtist from '../LinkArtist/LinkArtist';

const QueueItem = ({ id, thumbnail, artists, title }) => {
    const dispatch = useDispatch();

    return (
        <li className="list-item">
            <LazyloadImage lazyPlace="queue" id={id} thumbnail={thumbnail} />
            <div className="queue-list-info">
                <div className="queue-track-title ellipsis">
                    <Link to={`/song/${changeAlias(title)}/${id}`}>{title}</Link>
                </div>
                <LinkArtist artists={artists} definePath="nghe si" />
            </div>
            <div className="queue-track-actions">
                <i className="ion-android-download"></i>
                <i className="ion-trash-b" onClick={() => dispatch(removeFromQueue(id))}></i>
            </div>
        </li>
    );
};

export default QueueItem;
