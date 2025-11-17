export interface PaymentMethod {
    id?: string;
    id_user?: string;
    card_holder_name: string;
    card_last_four: string;
    card_number_encrypted?: string;
    card_brand: string;
    card_token?: string;
    identification_type?: string;
    identification_number?: string;
    expiration_month: number;
    expiration_year: number;
    is_default?: boolean;
    created_at?: Date;
    updated_at?: Date;
}
