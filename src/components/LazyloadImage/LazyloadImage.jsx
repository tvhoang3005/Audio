import { useDispatch, useSelector } from 'react-redux';
import { fetchSong, togglePlay } from '../../store/songSlice';
import { pauseLazyloadEffect, playLazyloadEffect } from '../../store/uiSlice';

import './LazyloadImage.scss';

/** Song thumbnail with a play button, or an equalizer animation while that song plays. */
const LazyloadImage = ({ lazyPlace, id, thumbnail }) => {
    const dispatch = useDispatch();
    const { where, activeId } = useSelector((state) => state.ui.lazyloadImage);
    const isPlaying = useSelector((state) => state.song.isPlaying);
    const isActive = isPlaying && where === lazyPlace && activeId === id;

    const handlePlay = () => {
        dispatch(playLazyloadEffect(lazyPlace, id));
        dispatch(fetchSong(id));
    };

    return (
        <div className="lazyload-img" onClick={() => dispatch(togglePlay())}>
            <img src={thumbnail} alt="thumb" />
            {isActive ? (
                <div className="lazyload-loading" onClick={() => dispatch(pauseLazyloadEffect())}>
                    {Array.from({ length: 8 }, (_, index) => (
                        <div key={index} className="obj"></div>
                    ))}
                </div>
            ) : (
                <div className="lazyload-icon" onClick={handlePlay}>
                    <i className="ion-play"></i>
                </div>
            )}
        </div>
    );
};

export default LazyloadImage;
