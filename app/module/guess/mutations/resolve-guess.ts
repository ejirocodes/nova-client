
import { useMutation } from '@tanstack/react-query';
import { useSwaggerApiParams } from '~/hooks/swagger/swagger-api-params';
import { GuessApi, } from '~/lib/client';


export const resolveGuess = (guessId: string) => {
    const swaggerApiParams = useSwaggerApiParams();
    const guessApi = new GuessApi(...swaggerApiParams);

    return useMutation({
        mutationFn: async () => {
            const res =
                await guessApi.guessControllerResolveGuess(guessId);
            return res.data;
        },
    });
};