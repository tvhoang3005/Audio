import { useId, useState } from 'react';
import './Choices.scss';

const TRACKS = [
    'Nhạc Phổ biến',
    'Nhạc Việt Bất Hủ',
    'Nhạc Bất Hủ Âu Mỹ',
    'Nhạc Không Lời',
    'Nhạc Thư Giãn',
];

const Choices = () => {
    const idPrefix = useId();
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Nhạc Phổ Biến');

    const handleSelect = (label) => {
        setSelected(label);
        setIsOpen(false);
    };

    return (
        <div className="select-box">
            <div className={`options-container ${isOpen ? 'active' : ''}`}>
                {TRACKS.map((label, index) => (
                    <div key={label} className="option" onClick={() => handleSelect(label)}>
                        <input
                            type="radio"
                            className="radio"
                            id={`${idPrefix}-${index}`}
                            name="category"
                        />
                        <label htmlFor={`${idPrefix}-${index}`}>{label}</label>
                    </div>
                ))}
            </div>
            <div className="selected" onClick={() => setIsOpen((open) => !open)}>
                {selected} <i className="ion-chevron-down"></i>
            </div>
        </div>
    );
};

export default Choices;
