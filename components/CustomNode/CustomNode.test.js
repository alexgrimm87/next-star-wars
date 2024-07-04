import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import CustomNode from './CustomNode';

jest.mock('reactflow', () => ({
  Handle: ({type, position}) => <div data-testid={`${type}-${position}`} />,
  Position: {
    Top: 'top',
    Bottom: 'bottom',
  },
}));

describe('CustomNode component', () => {
  const data = {
    id: '1',
    type: 'character',
    title: 'Luke Skywalker'
  };

  test('Renders without crashing', () => {
    render(<CustomNode data={data} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  test('Displays the correct image based on data type', () => {
    render(<CustomNode data={data} />);
    const image = screen.getByAltText('Luke Skywalker');
    expect(image).toHaveAttribute('src', 'https://starwars-visualguide.com/assets/img/characters/1.jpg');
  });

  test('Handles image load error', () => {
    render(<CustomNode data={data} />);
    const image = screen.getByAltText('Luke Skywalker');
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg');
  });

  test('Displays the correct handle for the data type', () => {
    render(<CustomNode data={data} />);
    expect(screen.getByTestId('target-top')).toBeInTheDocument();
    expect(screen.getByTestId('source-bottom')).toBeInTheDocument();
  });
});
