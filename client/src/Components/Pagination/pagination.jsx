import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./pagination.module.css";

function Pagination({
  quantity,
  start,
  setStart,
  currentPage,
  setCurrentPage,
}) {
  const [pageButtons, setPageButtons] = useState([]);
  const videogames = useSelector((state) => state.videogames);

  const total = Math.ceil(videogames.length / quantity);
  const pages = [];

  for (let index = 1; index <= total; index++) {
    pages.push(index);
  }

  const handlePrev = () => {
    start && setCurrentPage(currentPage - 1);
    start && setStart(start - quantity);
  };

  const handleNext = () => {
    currentPage < pages.at(-1) && setCurrentPage(currentPage + 1);
    currentPage < pages.at(-1) && setStart(start + quantity);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
    const current = page - 1;
    setStart(quantity * current);
  };

  useEffect(() => {
    let numberOfPages = [...pages];

    const dotsRight = ' ...'
    const dotsLeft = '... '

    if (pages.length <= 5) {
      numberOfPages = [...pages];

    } else if (pages.length > 5) {
      if (currentPage < 3) {
        numberOfPages = [1, 2, 3, dotsRight, pages.at(-1)];

      } else if (currentPage === 3 ) {
        pages.at(-2) - (currentPage) > 2
        ? (numberOfPages = [1, 2, 3, 4, dotsRight, pages.at(-1)])
        : (numberOfPages = [...pages]);

      } else if (currentPage === 4) {
        pages.at(-2) - currentPage > 2
        ? (numberOfPages = [1, 2, 3, 4, 5, dotsRight, pages.at(-1)])
        : (numberOfPages = [...pages]);

      } else if (currentPage > 4 && currentPage < pages.at(-4)) {
        numberOfPages = [1, dotsLeft, currentPage -1, currentPage, currentPage +1, dotsRight, pages.at(-1)]  

      } else if (currentPage === pages.at(-3)){
        numberOfPages = [1, dotsLeft, pages.at(-4), pages.at(-3), pages.at(-2), pages.at(-1)]

      } else if (currentPage > pages.at(-3)) {
        numberOfPages = [1, dotsLeft, pages.at(-3), pages.at(-2), pages.at(-1)]

      } else if (currentPage === pages.at(-4)) {
        numberOfPages = [1, dotsLeft, pages.at(-5), pages.at(-4), pages.at(-3), pages.at(-2), pages.at(-1)]

      } else if (currentPage === dotsRight){
        const page = pageButtons.at(-3) +1
        setCurrentPage(page)
        setStart(quantity * (page -1))

      } else if (currentPage === dotsLeft){
        const page = pageButtons.at(2) -1
        setCurrentPage(page)
        setStart(quantity * (page -1))
      }
    }
    setPageButtons(numberOfPages);
  }, [currentPage, total]);


  return (
    <>
      <div className={style.paginate}>
        <a onClick={handlePrev} className={style.prev}>Prev</a>
        {pageButtons.map((page, i) => {
          return (
            <a
              key={i}
              className={[
                style.page,
                page === currentPage && style.active,
              ].join(" ")}
              onClick={() => handleChangePage(page)}
            >
              {page}
            </a>
          );
        })}
        <a onClick={handleNext} className={style.next} >Next</a>
      </div>
    </>
  );
}

export default Pagination;
