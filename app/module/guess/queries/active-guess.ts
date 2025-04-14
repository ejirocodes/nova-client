import { useQuery } from "@tanstack/react-query";
import { useSwaggerApiParams } from "~/hooks/swagger/swagger-api-params";
import { GuessApi } from "~/lib/client";


export const useUserActiveGuess = (enabled: boolean) => {
    const swaggerApiParams = useSwaggerApiParams();
    const guessApi = new GuessApi(...swaggerApiParams);
    return useQuery({
        queryKey: ['user-active-guess'],
        enabled,
        queryFn: async () => {
            const res = await guessApi.guessControllerGetUserActiveGuess();
            return res.data;
        },
    });
}