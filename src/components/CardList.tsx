import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [urlImage, setUrlImage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleViewImage(url: string): void {
    setUrlImage(url);
    onOpen();
  }
  return (
    <>
      <SimpleGrid columns={3} spacing={10}>
        {cards.map(card => (
          <Card
            key={card.id}
            viewImage={() => handleViewImage(card.url)}
            data={card}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={urlImage} />
    </>
  );
}
