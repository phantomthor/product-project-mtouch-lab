import { useState, useEffect } from "react";

const usePagination = (list, perPageItem) => {
  const [items, setItems] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    if (list?.length) {
      setNumPages(() => {
        let res = Math.floor(list.length / perPageItem);
        if (list.length % perPageItem) {
          res++;
        }
        return res;
      });
      setItems(() => {
        const startIndex = currentPageIndex * perPageItem;
        const endIndex = startIndex + perPageItem;
        return list.slice(startIndex, endIndex);
      });
      // console.log(list);
    } else {
      setItems([]);
      setNumPages(1)
    }
    // resetPageIndex();
  }, [list, perPageItem, currentPageIndex]);

  return {
    items,
    numPages,
    currentPageIndex,
    setCurrentPageIndex,
  };
};

export default usePagination;




// const {
//   items,
//   numPages,
//   currentPageIndex,
//   setCurrentPageIndex,
//   resetPageIndex,
// } = usePagination(dataToPopulate, 18);
