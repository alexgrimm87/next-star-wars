import {act} from 'react';
import {render} from '@testing-library/react';
import PeopleCard from "@/components/PeopleCard/PeopleCard";

const person = {
  id: '1',
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male'
};

describe('PeopleCard component', () => {
  test('List render', () => {
    let getByText;

    act(() => {
      const component = render(<PeopleCard person={person} />);
      getByText = component.getByText;
    });

    expect(getByText(person.name)).toBeInTheDocument();
    expect(getByText(`Height: ${person.height}`)).toBeInTheDocument();
    expect(getByText(`Mass: ${person.mass}`)).toBeInTheDocument();
    expect(getByText(`Hair Color: ${person.hair_color}`)).toBeInTheDocument();
    expect(getByText(`Skin Color: ${person.skin_color}`)).toBeInTheDocument();
    expect(getByText(`Eye Color: ${person.eye_color}`)).toBeInTheDocument();
    expect(getByText(`Birth Year: ${person.birth_year}`)).toBeInTheDocument();
    expect(getByText(`Gender: ${person.gender}`)).toBeInTheDocument();
  });
});
