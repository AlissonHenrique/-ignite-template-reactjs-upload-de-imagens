import { useMemo } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';

import fauna from 'faunadb';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};
type ResponseImg = {
  data: Image[];
  after: string;
};
export default function Home(): JSX.Element {
  async function fetchProjects({ pageParam = null }): Promise<ResponseImg> {
    const response = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });

    return response.data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchProjects, {
    getNextPageParam: lastPage => lastPage.after,
  });

  const formattedData = useMemo(() => {
    return data?.pages.flatMap(format => {
      return format.data.flat();
    });
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button type="button" onClick={() => fetchNextPage()}>
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
