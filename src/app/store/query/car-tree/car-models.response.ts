import {IdentifyNamedModel} from '@shared/models/identify-named.model';

export type CarModelsResponse = CarModel[];

export type CarModel = IdentifyNamedModel & {
    yearFrom: string;
    yearTo: string;
}
