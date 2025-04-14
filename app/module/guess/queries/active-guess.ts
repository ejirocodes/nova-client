import { useQuery } from "@tanstack/react-query";
import { useSwaggerApiParams } from "~/hooks/swagger/swagger-api-params";
import { GuessApi } from "~/lib/client";
import { USER_ACTIVE_GUESS_QUERY_KEY } from "../constants";

export const useUserActiveGuess = (enabled: boolean) => {
    const swaggerApiParams = useSwaggerApiParams();
    const guessApi = new GuessApi(...swaggerApiParams);
    return useQuery({
        queryKey: [USER_ACTIVE_GUESS_QUERY_KEY],
        enabled,
        queryFn: async () => {
            const res = await guessApi.guessControllerGetUserActiveGuess();
            return res.data;
        },
    });
}