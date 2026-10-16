import { useSelector } from 'react-redux';
import { selectTracks } from '../../store/trackSlice';
import TrackItem from './TrackItem';

import './Track.scss';

const Track = () => {
    const tracks = useSelector(selectTracks);

    return (
        <div className="track-list">
            {tracks.map((track, index) => (
                <TrackItem key={track.id} order={index} {...track} />
            ))}
        </div>
    );
};

export default Track;
