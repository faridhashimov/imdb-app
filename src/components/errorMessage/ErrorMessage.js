import img from './error.gif';

const ErrorMessage = () => {
    return (
        <div className='flex-col w-3/5 justify-center items-center text-center mr-28'>
            <img
                style={{
                    display: 'block',
                    width: '250px',
                    height: '250px',
                    objectFit: 'contain',
                    margin: '0 auto',
                }}
                src={img}
                alt="Error"
            />
            <h1 style={{ fontSize: '20px', color: 'red' }}>Movie not found! Please try again...</h1>
        </div>
    );
};

export default ErrorMessage;
