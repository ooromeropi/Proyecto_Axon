export interface Incident {

    Descripcion: String
    FechaLlamada: String
    HoraLlamada: String
    FechaCorreo: String
    HoraCorreo: String
    NumReq: String
    NumInc: String
    AreaReporte: String
    Aplicacion: String
    Tipologia: String
    Impacto: String
    EscaladoA: String
    FechaEscalamiento: String
    HoraEscalamiento: String
    EscaladoPor: String
    RecibidoPor: String
    Estado: String
    Notas: String
    Observaciones: String
    ProductoAfectado: String
    FechaCp: String
    HoraCp: String
    CausalNoAtencion: String
    Falla: String
    FechaSa: String
    HoraSa: String
    CausalRecInci: String
    FechaDutty: String
    HoraDutty: String
    Excluible: String
    UsrCreador: String
    UsrModifica: String
    Resolucion: String
    FechaCierre: String
    HoraCierre: String
    createdAt?: string
    updatedAt?: string
    _id?: string

}