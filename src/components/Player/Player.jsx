import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { asset } from '../../config';
import { toggleQueue } from '../../store/queueSlice';
import { fetchSong, paused, played, togglePlay } from '../../store/songSlice';
import { changeAlias } from '../../utils/func';
import LinkArtist from '../LinkArtist/LinkArtist';
import PlayerLoad from './PlayerLoad';

import './Player.scss';

const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds) % 60;
    return `${min}:${String(sec).padStart(2, '0')}`;
};

const Player = () => {
    const dispatch = useDispatch();
    const { data: songData, isFetching, isPlaying } = useSelector((state) => state.song);
    const queue = useSelector((state) => state.queue.queue);

    const audioRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Keep the <audio> element in sync with the play/pause state in the store.
    useEffect(() => {
        const audio = audioRef.current;
        if (isPlaying && audio.paused) {
            audio.play().catch((error) => {
                // AbortError just means a new source interrupted this play() call.
                if (error.name !== 'AbortError') dispatch(paused());
            });
        } else if (!isPlaying && !audio.paused) {
            audio.pause();
        }
    }, [isPlaying, dispatch]);

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        setCurrentTime(audio.currentTime);
        if (!isSeeking && audio.duration) {
            setProgress(Math.round((audio.currentTime / audio.duration) * 100));
        }
    };

    const handleSeekChange = (event) => {
        setIsSeeking(true);
        setProgress(Number(event.target.value));
    };

    const commitSeek = () => {
        if (!isSeeking) return;
        const audio = audioRef.current;
        if (audio.duration) {
            audio.currentTime = (progress / 100) * audio.duration;
        }
        setIsSeeking(false);
        dispatch(played());
    };

    const changeSong = (step) => {
        const index = queue.findIndex((song) => song.id === songData.id);
        if (index === -1) return;
        const next = queue[(index + step + queue.length) % queue.length];
        dispatch(fetchSong(next.id));
    };

    return (
        <div className="player">
            <audio
                ref={audioRef}
                autoPlay
                src={songData.source}
                crossOrigin="anonymous"
                onPlay={() => dispatch(played())}
                onPause={() => dispatch(paused())}
                onEnded={() => dispatch(paused())}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={() => setDuration(audioRef.current.duration || 0)}
            />
            <img src={songData.thumbnail} alt="" className="player-song-thumbnail" />
            <div className="player-info">
                <Link
                    to={`/song/${changeAlias(songData.title || '')}/${songData.id}`}
                    className="ellipsis player-song-title"
                >
                    {songData.title}
                </Link>
                <LinkArtist artists={songData.artists} definePath="nghe-si" />
            </div>
            <div className="player-btns">
                <button
                    className="sc-ir player-btn"
                    onClick={() => changeSong(-1)}
                    aria-label="Previous"
                >
                    <i className="ion-ios-rewind"></i>
                </button>
                <button
                    className="sc-ir player-btn"
                    onClick={() => dispatch(togglePlay())}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isFetching ? (
                        <PlayerLoad />
                    ) : (
                        <i className={isPlaying ? 'ion-pause' : 'ion-play'}></i>
                    )}
                </button>
                <button
                    className="sc-ir player-btn"
                    onClick={() => changeSong(1)}
                    aria-label="Next"
                >
                    <i className="ion-ios-fastforward"></i>
                </button>
            </div>
            <div className="player-seek">
                <span>{currentTime > 0 ? formatTime(currentTime) : '0:00'}</span>
                <input
                    type="range"
                    className="player-range"
                    min={0}
                    max={100}
                    value={progress}
                    style={{ '--progress': `${progress}%` }}
                    onChange={handleSeekChange}
                    onPointerUp={commitSeek}
                    onKeyUp={commitSeek}
                    aria-label="Seek"
                />
                <span>{duration > 0 ? formatTime(duration) : '0:00'}</span>
            </div>
            <div className="player-other">
                <button className="sc-ir player-btn" title="Loop">
                    <i className="ion-loop"></i>
                </button>
                <button
                    className="sc-ir player-btn queue-btn"
                    onClick={() => dispatch(toggleQueue())}
                    aria-label="Toggle queue"
                >
                    <span className="queue-circle">{queue.length}</span>
                    <img className="player-icon" src={asset('svg/playlist.svg')} alt="" />
                </button>
            </div>
        </div>
    );
};

export default Player;
