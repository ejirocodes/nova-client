import { useQuery } from '@tanstack/react-query';
import { useSwaggerApiParams } from '~/hooks/swagger/swagger-api-params';
import { GuessApi, } from '~/lib/client';
import { GUESS_STATUS_QUERY_KEY } from '../constants';


export const useGuessStatus = (guessId: string) => {
    const swaggerApiParams = useSwaggerApiParams();
    const guessApi = new GuessApi(...swaggerApiParams);
    return useQuery({
        queryKey: [GUESS_STATUS_QUERY_KEY, guessId],
        enabled: !!guessId,
        queryFn: async () => {
            if (!guessId) return null;

            const res =
                await guessApi.guessControllerGetGuessStatus(guessId);

            return res.data;
        },
    });
};