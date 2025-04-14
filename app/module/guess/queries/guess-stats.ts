import { useQuery } from '@tanstack/react-query';
import { useSwaggerApiParams } from '~/hooks/swagger/swagger-api-params';
import { GuessApi, } from '~/lib/client';


export const useUserGuessStats = () => {
    const swaggerApiParams = useSwaggerApiParams();
    const guessApi = new GuessApi(...swaggerApiParams);
    return useQuery({
        queryKey: ['user-guess-stats'],
        queryFn: async () => {
            const res =
                await guessApi.guessControllerGetUserGuessStats();

            return res.data;
        },
    });
};