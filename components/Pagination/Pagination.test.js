import '@testing-library/jest-dom';
import {render, fireEvent} from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
  const currentPage = 1;
  const pageCount = 10;
  const onChangePage = jest.fn();

  test('Renders without crashing', () => {
    const {getByText} = render(
      <Pagination currentPage={currentPage} pageCount={pageCount} onChangePage={onChangePage} />
    );

    expect(getByText('...')).toBeInTheDocument();
    expect(getByText('>')).toBeInTheDocument();
    expect(getByText('<')).toBeInTheDocument();
  });

  test('Calls onChangePage with correct page number when a page is clicked', () => {
    const {getByText} = render(
      <Pagination currentPage={currentPage} pageCount={pageCount} onChangePage={onChangePage} />
    );

    fireEvent.click(getByText('2'));
    expect(onChangePage).toHaveBeenCalledWith(expect.objectContaining({selected: 1}));
  });

  test('Displays the correct number of pages', () => {
    const {container} = render(
      <Pagination currentPage={currentPage} pageCount={pageCount} onChangePage={onChangePage} />
    );

    const pages = container.querySelectorAll('li');
    expect(pages.length).toBeGreaterThanOrEqual(pageCount);
  });

  test('Displays the previous and next buttons', () => {
    const {getByText} = render(
      <Pagination currentPage={currentPage} pageCount={pageCount} onChangePage={onChangePage} />
    );

    expect(getByText('>')).toBeInTheDocument();
    expect(getByText('<')).toBeInTheDocument();
  });
});
