Option Explicit

Dim strDate, strDay, strMonth, strYear, strYearShort, strFechaCorta, strTime, strContents7
Dim strRutaPrincipal, strRutaConsultas, strRutaResultados, strFileConexiones, strFileEstadisticas, strBD1, strBD2, strConexion1, strConexion2
Dim strDescripcion, strWFileQry1, strWFileQry2, strQryOutput1, strQryOutput2, strCmd, strQry1, strQry2, strContents1 , strContents2
Dim objFSO, objShell, objConsulta, objEstadisticas, objArgumentos, dep, cru, spn, listLines, objFilec1, agre, esc, lm, lm2, objFilec2 , objFilec3 , objFilec4, objFilec7 
Dim objEntrada, objLineaEntrada, objConexionBD, objBuscarBD, strCamposEntrada, objFile1, objLineaFile1, strCamposFile1, strFileBuscar, portNok, listLinesnok 
Dim strFileConexion, intRegFile1, strCadena , intRegFile1c3 , tempLine, strLineBuffer, intRegFile1c5, existenok, intRegFile1c6, objFilec6, strContents6
Dim QRYA, QRYB, x , strContents3, existe, intRegFile1c4, strContents4, objFilec5, strContents5, poknok, poknok2, portlog, spnlog, plog, plog2, existelog, listLineslog
Dim MsgError, MsgA, MsgB, MsgC, MsgD, MsgE, MsgX, MsgY , MsgOS, portok, pok, pok2, MsgOS2, MsgOSnok,MsgOSlog,spnNok, MsgOSas, portas, spnas, listLinesas, pas, pas2
Dim iMsg, iConf, Flds, strCorreo, strPWS, strDestino, strCopia, intContinue, intContador, intLineas, intRegFile1c7, existeas, intRegFile1c8, objFilec8, strContents8
Dim portcan, spncan, listLineascan, pcan, pcan2, existecan, intRegFile1c9, objFilec9, strContents9, MsgOScan, MsgW

Function GetFormattedDate
  strDate = CDate(Date)
  strDay = DatePart("d", strDate)
  strMonth = DatePart("m", strDate)
  strYear = DatePart("yyyy", strDate)
  strYearShort = Right(strYear,2)
  If strDay < 10 Then
    strDay = "0" & strDay
  End If
  If strMonth < 10 Then
    strMonth = "0" & strMonth
  End If
  GetFormattedDate = strYearShort & strMonth & strDay
  strTime = Hour(Now)
End Function

Set objFSO = CreateObject("Scripting.FileSystemObject")
Const ForReading = 1
intContinue = 0
intRegFile1 = 0
strFechaCorta = GetFormattedDate




'---------------
' LEE ARGUMENTOS
'---------------
Set objArgumentos = WScript.Arguments
strDescripcion = objArgumentos.Item(0)


msgbox strDescripcion
