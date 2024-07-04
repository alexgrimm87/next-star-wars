import {render, waitFor} from '@testing-library/react';
import {fetchPeople} from '@/utils/services';
import PeopleList from './PeopleList';

jest.mock('@/utils/services', () => ({
  fetchPeople: jest.fn()
}));

describe('PeopleList Component', () => {
  beforeEach(() => {
    fetchPeople.mockReset();
  });

  test('Renders loading state initially', async () => {
    fetchPeople.mockResolvedValueOnce({
      results: [],
      count: 0
    });
    const {getByText} = render(<PeopleList />);
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(fetchPeople).toHaveBeenCalled());
  });

  test('Renders error message if fetch fails', async () => {
    fetchPeople.mockRejectedValueOnce(new Error('Failed to fetch'));
    const {getByText} = render(<PeopleList />);
    await waitFor(() => expect(getByText('Error fetching people')).toBeInTheDocument());
  });

  test('Renders fetched people data', async () => {
    const mockData = {
      results: [{
        name: 'Luke Skywalker'
      },
      {
        name: 'Darth Vader'
      }],
      count: 2
    };
    fetchPeople.mockResolvedValueOnce(mockData);
    const {getByText} = render(<PeopleList />);
    await waitFor(() => {
      expect(getByText('Luke Skywalker')).toBeInTheDocument();
      expect(getByText('Darth Vader')).toBeInTheDocument();
    });
  });
});
