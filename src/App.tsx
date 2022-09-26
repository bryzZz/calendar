import React, { useState } from 'react';

import { Calendar } from './components/Calendar/Calendar';

interface AppProps {}

const locale = 'ru-RU';

export const App: React.FC<AppProps> = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className='App flex h-screen flex-col items-center bg-text pt-40'>
            <span className='App__date mb-6 rounded-3xl bg-bg-calendar bg-placeholder p-8 pb-2 pt-2 text-xl text-bg-calendar'>
                {new Intl.DateTimeFormat(locale, {
                    weekday: 'long',
                    year: 'numeric',
                    day: 'numeric'
                }).format(selectedDate)}
            </span>
            <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                locale={locale}
            />
        </div>
    );
};
