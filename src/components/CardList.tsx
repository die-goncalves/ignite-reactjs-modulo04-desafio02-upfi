import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Image {
  id: string;
  title: string;
  description: string;
  url: string;
  isFavorite: boolean;
  date: string;
}

interface CardsProps {
  cards: Array<Image>;
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImageForView, setSelectedImageForView] = useState('')

  function viewImage(url: string) {
    setSelectedImageForView(url)
    onOpen()
  }

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards?.map((card) => {
          return (
            <Card
              key={card.id}
              data={{
                description: card.description,
                title: card.title,
                url: card.url,
                id: card.id,
                isFavorite: card.isFavorite
              }}
              viewImage={() => viewImage(card.url)}
            />
          )
        })}
      </SimpleGrid>

      <ModalViewImage imgUrl={selectedImageForView} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
