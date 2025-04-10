import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerApiParams } from '~/hooks/swagger/swagger-api-params';
import { BitcoinPricePeriod, PriceApi } from '~/lib/client';

export const useGuessPrice = () => {
    const queryClient = useQueryClient();

    const swaggerApiParams = useSwaggerApiParams();
    const priceApi = new PriceApi(...swaggerApiParams);

    return useMutation({
        mutationFn: async (data: BitcoinPricePeriod) => {
            const res = await priceApi.priceControllerGetBitcoinPrice(data);
            return res.data;
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['investor-analysis'] });
        },
    });
};