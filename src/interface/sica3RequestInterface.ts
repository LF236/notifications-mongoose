export interface GetInfoEmpleadoInterface {
    matricula: string;
    nombre_completo: string;
}

export interface NombrePacienteRequestInterface {
    message: string;
    nombre_paciente: string;
}

// Generated by https://quicktype.io

export interface ListaEmployesByPermissionRequestInterface {
    message: EmployesInterface[];
}

export interface EmployesInterface {
    name:        string;
    username:    string;
    id_empleado: number;
}
