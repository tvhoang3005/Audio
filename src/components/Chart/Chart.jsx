import { useSelector } from 'react-redux';
import { selectActiveChartSongs } from '../../store/chartSlice';
import ChartFirstItem from './ChartFirstItem';
import ChartItem from './ChartItem';
import ChartPanel from './ChartPanel';

import './Chart.scss';

const Chart = () => {
    const songs = useSelector(selectActiveChartSongs);

    return (
        <div className="chart">
            <ChartPanel />
            <div className="featured-image">
                <div
                    className="bgImageContainer"
                    style={{ backgroundImage: `url(${songs[0].thumbnail})` }}
                ></div>
            </div>
            <ul className="chart-list">
                {songs.map((song, index) => {
                    const Item = index === 0 ? ChartFirstItem : ChartItem;
                    return <Item key={index} order={index + 1} {...song} />;
                })}
            </ul>
        </div>
    );
};

export default Chart;
