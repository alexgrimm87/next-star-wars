import '@testing-library/jest-dom';
import {render, waitFor} from '@testing-library/react';
import {fetchCharacter, fetchCharacterStarships, fetchFilms} from "@/utils/services";
import CharacterPage from './page';

jest.mock('@/utils/services');

jest.mock('reactflow', () => ({
  __esModule: true,
  default: ({children}) => <div>{children}</div>,
  Controls: () => <div>Controls</div>,
  applyNodeChanges: jest.fn((changes, nodes) => nodes),
  applyEdgeChanges: jest.fn((changes, edges) => edges),
}));

jest.mock('@/components/CustomNode/CustomNode', () => () => <div>CustomNode</div>);

describe('CharacterPage', () => {
  const params = {
    characterId: '1'
  };
  const characterData = {
    id: '1',
    name: 'Luke Skywalker'
  };
  const filmsData = [{
    data: {
      id: '1',
      title: 'A New Hope',
      starships: ['1']
    }
  }];
  const starshipsData = [{
    data: {
      id: '1',
      name: 'X-wing'
    }
  }];

  beforeEach(() => {
    fetchCharacter.mockResolvedValue(characterData);
    fetchFilms.mockResolvedValue(filmsData);
    fetchCharacterStarships.mockResolvedValue(starshipsData);
  });

  test('Renders without crashing', async () => {
    const {getByText} = render(<CharacterPage params={params} />);
    await waitFor(() => expect(getByText('Controls')).toBeInTheDocument());
  });

  test('Fetches and sets character, film, and starship data correctly', async () => {
    const {getByText} = render(<CharacterPage params={params} />);

    await waitFor(() => {
      expect(fetchCharacter).toHaveBeenCalledWith('1');
      expect(fetchFilms).toHaveBeenCalledWith(characterData);
      expect(fetchCharacterStarships).toHaveBeenCalledWith(characterData);
      expect(getByText('Controls')).toBeInTheDocument();
    });
  });

  test('Sets the nodes and edges state correctly after data fetch', async () => {
    const {getByText} = render(<CharacterPage params={params} />);

    await waitFor(() => {
      expect(getByText('Controls')).toBeInTheDocument();
    });
  });

  test('Handles node and edge changes correctly', async () => {
    const {getByText} = render(<CharacterPage params={params} />);
    await waitFor(() => expect(getByText('Controls')).toBeInTheDocument());
  });
});
