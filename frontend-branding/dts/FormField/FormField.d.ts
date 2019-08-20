import React from 'react';
declare type Props = {
    id: string;
    label: string;
    value?: string;
    error?: string;
    onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export declare const FormField: React.SFC<Props>;
export {};
