import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import Logo from './Logo';

describe('Logo component', () => {
  test('Renders without crashing', () => {
    const {getByText} = render(<Logo />);
    const logoElement = getByText('Star Wars');
    expect(logoElement).toBeInTheDocument();
  });
});
