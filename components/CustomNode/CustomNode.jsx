import {memo} from 'react';
import {Handle, Position} from 'reactflow';
import {Card, CardBody, Heading, Image, Stack} from "@chakra-ui/react";

function CustomNode({data}) {
  const getImageUrl = () => {
    const baseUrl = "https://starwars-visualguide.com/assets/img";

    switch (data.type) {
      case 'character':
        return `${baseUrl}/characters/${data.id}.jpg`;
      case 'film':
        return `${baseUrl}/films/${data.id}.jpg`;
      case 'starship':
        return `${baseUrl}/starships/${data.id}.jpg`;
      default:
        return `${baseUrl}/assets/img/placeholder.jpg`;
    }
  };

  return (
    <Card maxW='sm' borderRadius='0' marginBottom='30px' width='210px'>
      <CardBody padding='3'>
        <Image
          height='220'
          width='100%'
          objectFit='cover'
          src={getImageUrl()}
          alt={data.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
          }}
        />
        <Stack mt='6' spacing='3'>
          <Heading size='sm'>{data.title}</Heading>
        </Stack>
      </CardBody>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
}

export default memo(CustomNode);
