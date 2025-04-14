import { useQuery } from '@tanstack/react-query';
import { useSwaggerApiParams } from '~/hooks/swagger/swagger-api-params';
import { GuessApi, } from '~/lib/client';
import { GET_USER_GUESS_STATS_QUERY_KEY } from '../constants';


export const useUserGuessStats = () => {
    const swaggerApiParams = useSwaggerApiParams();
    const guessApi = new GuessApi(...swaggerApiParams);
    return useQuery({
        queryKey: [GET_USER_GUESS_STATS_QUERY_KEY],
        queryFn: async () => {
            const res =
                await guessApi.guessControllerGetUserGuessStats();

            return res.data;
        },
    });
};