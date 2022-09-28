import React, { useState } from 'react';

import { Calendar, SelectedDate } from './components';

interface AppProps {}

const locale = 'ru-RU';

export const App: React.FC<AppProps> = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className='App flex h-screen flex-col items-center gap-4 bg-text pt-40'>
            <SelectedDate date={selectedDate} locale={locale} />
            <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                locale={locale}
            />
        </div>
    );
};
