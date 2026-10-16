import Chart from '../../Chart/Chart';
import Track from '../../Track/Track';
import Choices from './Choices';

import './HomePage.scss';

const HomePage = () => (
    <div className="homepage home-container">
        <div className="track-wrapper">
            <Choices />
            <Track />
        </div>
        <div className="chart-wrapper">
            <Chart />
        </div>
    </div>
);

export default HomePage;
