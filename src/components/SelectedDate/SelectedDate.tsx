import React from 'react';

interface SelectedDateProps {
    date: Date;
    locale?: string;
}

export const SelectedDate: React.FC<SelectedDateProps> = ({ date, locale = 'default' }) => {
    return (
        <span className='mb-6 rounded-3xl bg-bg-calendar bg-placeholder p-8 pb-2 pt-2 text-xl text-bg-calendar'>
            {new Intl.DateTimeFormat(locale, {
                weekday: 'long',
                year: 'numeric',
                day: 'numeric'
            }).format(date)}
        </span>
    );
};
