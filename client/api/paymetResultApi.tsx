import request from '@/lib/axios';
import { IParamsPaymentResult, IPaymentResultResponseRaw } from '@/types/payment.type';

export const validatePaymentResult = (userId: string, params: IParamsPaymentResult) => {
    return request.post<IPaymentResultResponseRaw>(`/v1/payment/payment-result/${userId}`, undefined, {
        params,
    });
};
