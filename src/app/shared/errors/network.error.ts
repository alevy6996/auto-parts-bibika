import { AbcpError } from '@shared/errors/abcp.error';

export class NetworkError {
    status?: number;
    data: string | AbcpError | any;

    constructor(error: object | string | AbcpError | NetworkError, code?: number) {
        if (typeof error === 'string') {
            this.data = {
                errorMessage: error,
                errorCode: null
            };
            this.status = code;
        } else if(error?.errorMessage) {
            this.data = error;
        } else if(error?.data && error?.status) {
            this.data = error.data;
            this.status = error.status;
        }
    }
}