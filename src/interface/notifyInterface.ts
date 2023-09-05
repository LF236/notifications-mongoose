export interface AddNotifyePostRequestInterface {
    msg: string;
    id_addressee: number;
    is_case_especial_case: number;
    action: string;
    complement_action: string;
    id_seender?: number;
    name_module: string;
    msg_to_action?: string;
}