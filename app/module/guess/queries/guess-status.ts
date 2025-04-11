import { useQuery } from '@tanstack/react-query';
import { useSwaggerApiParams } from '~/hooks/swagger/swagger-api-params';
import { GuessApi, } from '~/lib/client';


export const useGuessStatus = (guessId: string) => {
    const swaggerApiParams = useSwaggerApiParams();
    const guessApi = new GuessApi(...swaggerApiParams);
    return useQuery({
        queryKey: ['guess-status', guessId],
        enabled: !!guessId,
        queryFn: async () => {
            if (!guessId) return null;

            const res =
                await guessApi.guessControllerGetGuessStatus(guessId);

            return res.data;
        },
    });
};