import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { toggleModal } from '../../../store/uiSlice';
import CardItem from './CardItem';

import './User.scss';

const PLACEHOLDER_PLAYLISTS = 6;

const User = () => {
    const dispatch = useDispatch();

    return (
        <div className="user">
            <div className="container">
                <div className="panel">
                    <div className="panel-title">
                        <Link to="/playlist/">
                            Playlist
                            <i className="ion-ios-arrow-forward"></i>
                        </Link>
                    </div>
                    <div className="panel-content">
                        <div
                            className="panel-card first-card"
                            onClick={() => dispatch(toggleModal())}
                        >
                            <i className="ion-ios-plus-empty"></i>
                            <p>Tạo playlist mới</p>
                        </div>
                        {Array.from({ length: PLACEHOLDER_PLAYLISTS }, (_, index) => (
                            <CardItem key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
