import { Link, NavLink } from 'react-router-dom';
import './appHeader.css';
import logo from '../../resources/img/logo.png';

const AppHeader = () => {

    return (
        <>
            <div className="w-11/12 border-2 mb-7 border-lime-500 shadow-around rounded-lg mx-auto flex justify-between items-center p-4">
                <div className="el-width flex justify-start items-center border-2 border-lime-500 rounded overflow-hidden shadow-md">
                   <Link  to="/"><img className="h-14 w-14 mr-32" src={logo} alt="Logo" /></Link> 
                    <h2 className="text-lime-500 font-bold">
                        Don't know what to watch tonight ? &nbsp; Don't worry...
                    </h2>
                </div>
                <nav >
                    <ul className='flex justify-between'>
                        <li className='mr-2 text-lime-500 hover:text-red-500 font-bold'>
                            <NavLink exact activeClassName="text-red-500" to="/">Search by movie name</NavLink>
                        </li>
                        /
                        <li className='ml-2 text-lime-500 hover:text-red-500 font-bold'>
                            <NavLink exact activeClassName="text-red-500" to="/random">Random Movie</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            
        </>
    );

}

export default AppHeader;
