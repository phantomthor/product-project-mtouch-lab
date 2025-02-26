"use client"

import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';

const useSearch = (searchString, array, key) => {
    const [matchingList, setMatchingList] = useState([])

    useEffect(() => {
        if (searchString == "") {
            setMatchingList(array);
        } else {
            const fuse = new Fuse(array, {
                keys: [key],
            });
            const result = fuse.search(searchString).map((item) => item.item);
            setMatchingList(result);
        }
    }, [searchString, array]);

    return matchingList

};

export default useSearch;