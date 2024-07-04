'use client';

import {useState, useEffect} from 'react';
import {fetchPeople} from "@/utils/services";
import Pagination from "@/components/Pagination/Pagination";
import PeopleCard from "@/components/PeopleCard/PeopleCard";
import styles from './PeopleList.module.scss';

const PeopleList = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPeople(currentPage);
        setPeople(data.results);
        setPageCount(Math.ceil(data.count / itemsPerPage));
        setLoading(false);
      } catch (error) {
        setError('Error fetching people');
        setLoading(false);
      }
    })();
  }, [currentPage]);

  const onChangePage = (data) => {
    setCurrentPage(data.selected + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className={styles.grid}>
        {people.map((person, index) => (
          <PeopleCard key={index} person={person} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default PeopleList;
