import { useDispatch, useSelector } from 'react-redux';
import { clearQueue, toggleQueue } from '../../store/queueSlice';
import QueueItem from './QueueItem';

import './Queue.scss';

const Queue = () => {
    const dispatch = useDispatch();
    const { queue, isOpen } = useSelector((state) => state.queue);

    return (
        <div className={`queue ${isOpen ? 'active' : ''}`}>
            <div className="queue-panel">
                <div className="queue-title">Next Up</div>
                <div className="queue-clear">
                    <button className="sc-ir" onClick={() => dispatch(clearQueue())}>
                        Clear
                    </button>
                </div>
                <div className="queue-hide">
                    <button
                        className="sc-ir"
                        onClick={() => dispatch(toggleQueue())}
                        aria-label="Hide queue"
                    >
                        <i className="ion-chevron-down"></i>
                    </button>
                </div>
            </div>
            <ul className="queue-list">
                {queue.map((song) => (
                    <QueueItem key={song.id} {...song} />
                ))}
            </ul>
        </div>
    );
};

export default Queue;
