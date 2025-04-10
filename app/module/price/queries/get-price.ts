import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSwaggerApiParams } from '~/hooks/swagger/swagger-api-params';
import { BitcoinPricePeriod, PriceApi } from '~/lib/client';


export const useGetPrice = (period: BitcoinPricePeriod) => {
    const swaggerApiParams = useSwaggerApiParams();
    const priceApi = new PriceApi(...swaggerApiParams);

    return useQuery({
        queryKey: ['price', period],
        queryFn: async () => {
            const res =
                await priceApi.priceControllerGetBitcoinPrice(period);

            return res.data;
        },
    });
};