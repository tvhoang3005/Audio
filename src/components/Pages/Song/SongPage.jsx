import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchSongIfNeeded } from '../../../store/songSlice';
import LinkArtist from '../../LinkArtist/LinkArtist';

import './SongPage.scss';

const SongPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { thumbnail, artists, title } = useSelector((state) => state.song.data);

    useEffect(() => {
        dispatch(fetchSongIfNeeded(id));
    }, [id, dispatch]);

    return (
        <div className="song">
            <div className="song-header">
                <div className="song-header-img">
                    <img src={thumbnail} alt="" />
                </div>
                <div className="song-header-info">
                    <div className="song-header-song-title">
                        <h3>{title}</h3>
                    </div>
                    <div className="song-header-song-artists">
                        <LinkArtist definePath="nghe si" artists={artists} />
                    </div>
                </div>
                <div className="song-header-actions">
                    <button className="sc-ir" aria-label="Download">
                        <i className="ion-ios-download-outline"></i>
                    </button>
                    <button className="sc-ir" aria-label="Add">
                        <i className="ion-ios-plus-empty"></i>
                    </button>
                </div>
            </div>
            <div className="song-body"></div>
        </div>
    );
};

export default SongPage;
