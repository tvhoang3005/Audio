import { Route, Routes } from 'react-router';
import Modal from './components/Modal/Modal';
import Navbar from './components/Navbar/Navbar';
import AlbumPage from './components/Pages/Albums/AlbumPage';
import ArtistPage from './components/Pages/Artists/ArtistPage';
import Authen from './components/Pages/Authen/Authen';
import ChartPage from './components/Pages/Charts/ChartPage';
import HomePage from './components/Pages/Home/HomePage';
import NotFoundPage from './components/Pages/NotFound/NotFoundPage';
import SongPage from './components/Pages/Song/SongPage';
import User from './components/Pages/User/User';
import Player from './components/Player/Player';
import Queue from './components/Queue/Queue';
import RequireAuth from './components/RequireAuth';

const App = () => (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artists/*" element={<ArtistPage />} />
            <Route path="/albums/*" element={<AlbumPage />} />
            <Route path="/charts/*" element={<ChartPage />} />
            <Route path="/song/:name/:id" element={<SongPage />} />
            <Route path="/login" element={<Authen />} />
            <Route
                path="/mymusic/*"
                element={
                    <RequireAuth>
                        <User />
                    </RequireAuth>
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Queue />
        <Player />
        <Modal />
    </div>
);

export default App;
