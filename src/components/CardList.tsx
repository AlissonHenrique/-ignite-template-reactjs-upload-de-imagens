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
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    setUrlImage(url);
  }

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={3} spacing={10}>
        {cards.map(card => (
          <Card
            key={card.id}
            viewImage={() => handleViewImage(card.url)}
            data={card}
          />
        ))}
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
