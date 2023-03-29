import { Time } from "@angular/common"
import { Local } from "protractor/built/driverProviders"
import { Timestamp } from "rxjs"

export interface CanceladaSpn {

    Numero_Portado: String
    Tipo_Negocio: String
    Linea_Nativa: String
    FVC: String
    Estado_spn: String
    Estado_Orden: String
    Motivo_Cancelacion: String
    Gestion_Canceladas: String
    UsrCreador: String
    UsrModifica: String
    Observacion: String
    createdAt?: Local
    updatedAt?: String
    _id?: string

}