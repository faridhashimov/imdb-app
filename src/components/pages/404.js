import error404 from '../../resources/img/404.jpg';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div className='pb-10'>
            <img className='w-1/2 mx-auto' src={error404} alt="Error 404" />
            <Link className='block text-center font-bold text-2xl mt-0' to="/">Back to main Page</Link>
        </div>
    )
}

export default Page404;