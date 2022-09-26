import React from 'react';

interface ArrowButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    direction: 'left' | 'right';
}

const angles = {
    left: '0deg',
    right: '180deg'
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, ...other }) => {
    return (
        <button
            className='ArrowButton w-10'
            style={{ transform: `rotate(${angles[direction]})` }}
            {...other}
        >
            <svg
                viewBox='0 0 96 96'
                xmlns='http://www.w3.org/2000/svg'
                className='w-full'
                style={{ transform: 'scale(0.5)' }}
            >
                <path
                    className='fill-text'
                    // style={{ fill: 'currentcolor' }}
                    d='M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z'
                />
            </svg>
        </button>
    );
};
