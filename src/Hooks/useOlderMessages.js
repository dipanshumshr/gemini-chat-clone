import { useState } from 'react';

const pageSizes = 20;

const messageCount = 100; 

const dummyOlderMessages = Array.from({length : messageCount}).map((val,index) => ({
    id : `${val} ${index}`,
    author : index % 2 === 0 ? 'ai' : "user",
    text : `This is an older message #${messageCount - index}`,
    ts : new Date(Date.now() - (messageCount - index) * 60000).toLocaleTimeString(),
}));



export function useOlderMessages(pageSize = pageSizes){
    const [page , setPage] = useState(1);

    const loadOlder = () => setPage(prev => prev +1)

    const older = dummyOlderMessages.slice(-page * pageSize);

    const hasMore = older.length < messageCount;

    return { older, loadOlder , hasMore };
}