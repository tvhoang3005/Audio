import { useDispatch, useSelector } from 'react-redux';
import { asset } from '../../config';
import { addSongToQueue } from '../../store/queueSlice';
import { fetchSong } from '../../store/songSlice';
import { toggleDropDown, toggleModal } from '../../store/uiSlice';

import './Dropdown.scss';

/** "More" menu for a song; renders only while it is the open dropdown in its list. */
const Dropdown = ({ where, song }) => {
    const dispatch = useDispatch();
    const dropDown = useSelector((state) => state.ui.dropDown);
    const isQueueEmpty = useSelector((state) => state.queue.queue.length === 0);

    if (!dropDown.show || dropDown.where !== where || dropDown.activeId !== song.id) {
        return null;
    }

    const handleAddToNextUp = () => {
        dispatch(toggleDropDown(where, song.id));
        dispatch(addSongToQueue(song));
        if (isQueueEmpty) {
            dispatch(fetchSong(song.id));
        }
    };

    return (
        <div className="dropdown-box">
            <div className="options-container">
                <div className="option" onClick={handleAddToNextUp}>
                    <img src={asset('svg/queue-add.svg')} alt="add" />
                    <label>Add to next up</label>
                </div>
                <div className="option" onClick={() => dispatch(toggleModal())}>
                    <img src={asset('svg/queue-next.svg')} alt="next" />
                    <label>Add to playlist</label>
                </div>
                <div className="option">
                    <i className="ion-android-share-alt"></i>
                    <label>Share</label>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
