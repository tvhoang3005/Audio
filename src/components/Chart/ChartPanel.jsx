import { useDispatch, useSelector } from 'react-redux';
import { selectActiveChart, setActiveChart } from '../../store/chartSlice';

const CHART_PANELS = [
    { popType: 'pop', title: 'Top 10 Billboard' },
    { popType: 'kpop', title: 'K-Pop Chart' },
    { popType: 'vpop', title: 'V-Pop Chart' },
];

const ChartPanel = () => {
    const dispatch = useDispatch();
    const activeChart = useSelector(selectActiveChart);

    return (
        <div className="chart-panel">
            {CHART_PANELS.map(({ popType, title }) => (
                <button
                    key={popType}
                    className={`sc-ir chart-panel-btn ${activeChart === popType ? 'active' : ''}`}
                    onClick={() => dispatch(setActiveChart(popType))}
                >
                    {title}
                </button>
            ))}
        </div>
    );
};

export default ChartPanel;
