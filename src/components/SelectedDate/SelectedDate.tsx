import React from 'react';

interface SelectedDateProps {
    date: Date;
    locale?: string;
}

export const SelectedDate: React.FC<SelectedDateProps> = ({ date, locale = 'default' }) => {
    return (
        <span className='rounded-lg bg-primary p-8 pb-2 pt-2 text-xl text-title'>
            {new Intl.DateTimeFormat(locale, {
                weekday: 'long',
                year: 'numeric',
                day: 'numeric'
            }).format(date)}
        </span>
    );
};
