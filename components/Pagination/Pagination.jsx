import ReactPaginate from 'react-paginate';
import styles from "./Pagination.module.scss";

const Pagination = ({currentPage, pageCount, onChangePage}) => {
  if (pageCount <= 0) {
    return null;
  }

  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel={'...'}
      nextLabel={'>'}
      previousLabel={'<'}
      onPageChange={onChangePage}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      forcePage={currentPage - 1}
    />
  )
}

export default Pagination;
