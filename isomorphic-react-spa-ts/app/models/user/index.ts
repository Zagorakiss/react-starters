export interface IDevice {
    browser: IBrowser;
    isMobile: boolean;
}

export interface IBrowser {
    name: string;
    version: string;
}

export interface IUserModule {
    device: IDevice;
}

export interface IRates {
    rates: ICurrencies;
}

export interface ICurrencies {
    usd: IRate[];
    eur: IRate[];
    gbp: IRate[];
}

export interface IRate {
    currency: string;
    name: string;
    symbol: string;
    rate: number;
}
