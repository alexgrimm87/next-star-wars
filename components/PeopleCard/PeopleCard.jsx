import Link from 'next/link'
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';

const PeopleCard = ({person}) => {
  return (
    <Card maxW='sm' borderRadius='0' marginBottom={{base: '15px', md: '0'}}>
      <CardBody>
        <Link href={`${person.id}`}>
          <Image
            src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`}
            alt={person.name}
          />
        </Link>
        <Stack mt='6' spacing='3'>
          <Link href={`${person.id}`}>
            <Heading size='md'>{person.name}</Heading>
          </Link>
          <UnorderedList>
            {person.height !== 'unknown' && <ListItem>Height: {person.height}</ListItem>}
            {person.mass !== 'unknown' && <ListItem>Mass: {person.mass}</ListItem>}
            {person.hair_color !== 'none' && person.hair_color !== 'n/a' && <ListItem>Hair Color: {person.hair_color}</ListItem>}
            {person.skin_color !== 'unknown' && <ListItem>Skin Color: {person.skin_color}</ListItem>}
            {person.eye_color !== 'unknown' && <ListItem>Eye Color: {person.eye_color}</ListItem>}
            {person.birth_year !== 'unknown' && <ListItem>Birth Year: {person.birth_year}</ListItem>}
            {person.gender !== 'none' && person.gender !== 'n/a' && <ListItem>Gender: {person.gender}</ListItem>}
          </UnorderedList>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default PeopleCard;
