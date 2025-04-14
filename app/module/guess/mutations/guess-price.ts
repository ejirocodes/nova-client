import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerApiParams } from '~/hooks/swagger/swagger-api-params';
import { GuessApi, type CreateGuessDto } from '~/lib/client';
import { GUESS_QUERY_KEY } from '../constants';

export const useGuessPrice = () => {
    const queryClient = useQueryClient();

    const swaggerApiParams = useSwaggerApiParams();
    const guessApi = new GuessApi(...swaggerApiParams);

    return useMutation({
        mutationFn: async (data: CreateGuessDto) => {
            const res = await guessApi.guessControllerCreateGuess(data);
            return res.data;
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [GUESS_QUERY_KEY] });
        },
    });
};