import { useQuery } from '@tanstack/react-query';
import { useSwaggerApiParams } from '~/hooks/swagger/swagger-api-params';
import { BitcoinPricePeriod, PriceApi } from '~/lib/client';
import { PRICE_QUERY_KEY, PRICE_QUERY_REFETCH_INTERVAL } from '../constant';


export const useGetPrice = (period: BitcoinPricePeriod) => {
    const swaggerApiParams = useSwaggerApiParams();
    const priceApi = new PriceApi(...swaggerApiParams);

    return useQuery({
        queryKey: [PRICE_QUERY_KEY, period],
        refetchOnWindowFocus: true,
        queryFn: async () => {
            const res =
                await priceApi.priceControllerGetBitcoinPrice(period);

            return res.data;
        },
    });
};