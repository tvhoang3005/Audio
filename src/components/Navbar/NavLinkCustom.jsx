import { Link, useMatch } from 'react-router';
import { asset } from '../../config';

const NavLinkCustom = ({ label, to, end = false, srcImg, style }) => {
    const match = useMatch({ path: to, end });

    return (
        <li className={match ? 'active' : ''} style={style}>
            <Link to={to}>
                <span>{label}</span>
                {srcImg && <img src={asset(srcImg)} alt="" />}
            </Link>
        </li>
    );
};

export default NavLinkCustom;
