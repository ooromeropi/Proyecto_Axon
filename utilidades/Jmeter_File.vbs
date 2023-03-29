'----------------------------------------------------------'
'LEE ARCHIVO DE UNA RUTA Y EJECUTA JMETER SIN ENVIAR CORREO'
' Escribe en Input_Hist, Output_Hist y Output              '
'----------------------------------------------------------'
Option Explicit

Dim strDate, strDay, strMonth, strYear, strYearShort, strFechaCorta, strHora, strMinuto, strSegundo, strTime, strDateCorreo, strTimeCorreo
Dim strRutaPrincipal, strFileEstadisticas, strCarpetaInput, strFileInput, strFileNameW, strDescripcion, intContinue, intSiga, intFiles, intRegFile, strCmd   
Dim objFSO, objShell, objEstadisticas, objArgumentos
Dim objEntrada, objLineaEntrada, strCamposEntrada, objFile1, objLineaFile1, strCamposFile1, objFile2
Dim MsgError, MsgA, QRYA, QRYB 
Dim strRutaJmeter, strRutaJmeterInput, strRutaJmeterOutput, strRutaJmeterInputHist, strRutaJmeterOutputHist, strFileJmeter, strProjectJmeter
Dim strInputJmeter, strOutputJmeter, strInputJmeterExe, strOutputJmeterExe, strInputJmeterHist, strOutputJmeterHist   

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
	strDateCorreo = strYearShort & "-" & strMonth & "-" & strDay
End Function

Function GetFormattedTime
	strHora = Hour(Time())
	strMinuto = Minute(Time())
	strSegundo = Second(Time())
	If strMinuto < 10 Then
	   strMinuto = "0" & strMinuto
	End If
	If strSegundo < 10 Then
	   strSegundo = "0" & strSegundo
	End If 
	GetFormattedTime = strHora & strMinuto & strSegundo	
	strTimeCorreo = strHora & ":" & strMinuto & ":" & strSegundo
End Function

Set objFSO = CreateObject("Scripting.FileSystemObject")
Const ForReading = 1
intContinue = 0
intFiles = 0
strFechaCorta = GetFormattedDate
strTime = GetFormattedTime

QRYA =	"SET PAGESIZE 0;                                                                 " & Chr(13) & Chr(10) & _
		"SET SERVEROUTPUT ON SIZE UNLIMITED;                                             " & Chr(13) & Chr(10) & _
		"SET TAB OFF;						                                             " & Chr(13) & Chr(10) & _
		"SET FEEDBACK OFF;                                                               " & Chr(13) & Chr(10) & _
		"SET TRIMSPOOL ON;                                                               " & Chr(13) & Chr(10) & _
		"SET LINESIZE 500;                                                             	 " & Chr(13) & Chr(10) & _
		"SET COLSEP ';';                                                                 " & Chr(13) & Chr(10) & _
		"SPOOL "
QRYB =	"SPOOL OFF                                                                       " & Chr(13) & Chr(10) & _
		"EXIT;                                                                           "  		
MsgError = "NO SE EJECUTO SATISFACTORIAMENTE EL PROCESO. "
MsgA = ""

'---------------
' LEE ARGUMENTOS
'---------------
Set objArgumentos = WScript.Arguments
strDescripcion = objArgumentos.Item(0)
'strDescripcion = "JM_File_Reintento"

'-------------------------
' LEE PARAMETROS GENERALES
'-------------------------
If not objFSO.FileExists("Parametros Generales.txt") then
	MsgA = "NO SE ENCONTRO ARCHIVO DE PARAMETROS GENERALES. " 
	intContinue = 1
Else
	Set objEntrada = objFSO.OpenTextFile("Parametros Generales.txt", ForReading)
	Do While objEntrada.atEndOfStream <> True
		objLineaEntrada = objEntrada.ReadLine
		strCamposEntrada = split(objLineaEntrada,"-->")
		Select Case strCamposEntrada(0)
		Case "RutaPrincipal"
			strRutaPrincipal = strCamposEntrada(1)
		Case "RutaJmeter"
			strRutaJmeter = strCamposEntrada(1)
		Case "RutaJmeterInput"
			strRutaJmeterInput = strCamposEntrada(1)
		Case "RutaJmeterOutput"
			strRutaJmeterOutput = strCamposEntrada(1)			
		Case "RutaJmeterInputHist"
			strRutaJmeterInputHist = strCamposEntrada(1)
		Case "RutaJmeterOutputHist"
			strRutaJmeterOutputHist = strCamposEntrada(1)			
		Case "ArchivoEstadisticas"
			strFileEstadisticas = strRutaPrincipal & strCamposEntrada(1)			
		End Select		
	Loop
	objEntrada.Close()
End If

'----------------------------
' LEE PARAMETROS PARTICULARES
'----------------------------
If not objFSO.FileExists("Parametros Particulares.txt") then
	MsgA = "NO SE ENCONTRO ARCHIVO DE PARAMETROS PARTICULARES. " 
	intContinue = 1
Else
	Set objEntrada = objFSO.OpenTextFile("Parametros Particulares.txt", ForReading)
	Do While objEntrada.atEndOfStream <> True
		objLineaEntrada = objEntrada.ReadLine
		strCamposEntrada = split(objLineaEntrada,"-->")
		Select Case strCamposEntrada(0)
		Case strDescripcion & "_CarpetaInput"
			strCarpetaInput = strCamposEntrada(1)
		Case strDescripcion & "_FileJmeter"
			strFileJmeter = strCamposEntrada(1)
			strFileNameW = strFileJmeter & "_" & strFechaCorta & "_" & strTime & "_" 
			strProjectJmeter = strRutaJmeter & strFileJmeter & ".jmx"
			strInputJmeterExe = strRutaJmeter & strFileJmeter & "_input.csv"
			strOutputJmeterExe = strRutaJmeter & strFileJmeter & "_output.csv"
		End Select		
	Loop
	objEntrada.Close()
End If

'--------------
' PROCESAMIENTO
'--------------
If intContinue = 0 Then

	For each strFileInput in objFSO.GetFolder(strRutaJmeterInput & strCarpetaInput).Files
		intFiles = 1
		intRegFile = 0
		intSiga = 0
		strInputJmeter = strRutaJmeterInput & strCarpetaInput & strFileInput.name
		strInputJmeterHist = strRutaJmeterInputHist & strFileNameW & strFileInput.name
		strOutputJmeter = strRutaJmeterOutput & strFileNameW & objFSO.GetBaseName(strFileInput) & "_output.csv"
		strOutputJmeterHist = strRutaJmeterOutputHist & strFileNameW & objFSO.GetBaseName(strFileInput) & "_output.csv"
		
		objFSO.CopyFile strInputJmeter, strInputJmeterHist
		
		If (objFSO.FileExists(strInputJmeterExe)) Then
			objFSO.DeleteFile (strInputJmeterExe)
		End If
		If (objFSO.FileExists(strOutputJmeterExe)) Then
			objFSO.DeleteFile (strOutputJmeterExe)
		End If
	
		'----------------------
		' GENERA ARCHIVO JMeter
		'----------------------
		Set objFile1 = objFSO.OpenTextFile(strInputJmeter, ForReading)
		Set objFile2 = objFSO.CreateTextFile(strInputJmeterExe, True)
		Do While objFile1.atEndOfstream <> True
			objLineaFile1 = objFile1.ReadLine
			strCamposFile1 = split(objLineaFile1,";")
			If Left(strCamposFile1(0),3) = "SP2" OR Left(strCamposFile1(0),3) = "ORA" OR Left(strCamposFile1(0),5) = "ERROR" OR Trim(strCamposFile1(0)) = "  "   Then
				MsgA = strCamposFile1(0) 
				intSiga = 1
			Else	
				intRegFile = intRegFile + 1
				objFile2.WriteLine(Trim(strCamposFile1(0)))
			End If	
		Loop
		objFile1.Close()
		objFile2.Close()
		objFSO.DeleteFile (strInputJmeter)

		'---------------
		' EJECUTA JMeter
		'---------------
		If intSiga = 0 AND intRegFile > 0  Then
			Set objShell = WScript.CreateObject( "WScript.Shell" )
			objShell.CurrentDirectory = strRutaJmeter
			strCmd = strRutaJmeter & "bin\jmeter.bat -n -t " & strProjectJmeter 
			objShell.Run strCmd,0,True
			Set objShell = Nothing
		Else
			Set objFile1 = objFSO.CreateTextFile(strOutputJmeterExe, True)
			objFile1.Close()
		End If

		objFSO.CopyFile strOutputJmeterExe, strOutputJmeter
		objFSO.CopyFile strOutputJmeterExe, strOutputJmeterHist

		'-----------------------------------------------------
		' GENERA ARCHIVO DE ESTADISTICAS POR ARCHIVO PROCESADO
		'-----------------------------------------------------
		Set objEstadisticas = objFSO.OpenTextFile(strFileEstadisticas,8,True)
		If intSiga = 0 Then
			objEstadisticas.WriteLine(strDescripcion & ";" & Now & ";Total Procesados;" & intRegFile & ";" & MsgA)
		Else
			objEstadisticas.WriteLine(strDescripcion & ";" & Now & ";Proceso Incorrecto; ;" & MsgA)
		End If	
		objEstadisticas.Close()
	next

End If

'------------------------------------------------------------------
' GENERA ARCHIVO DE ESTADISTICAS SI NO ENCONTRO ARCHIVOS EN LA RUTA 
'------------------------------------------------------------------
If intFiles = 0 Then
	Set objEstadisticas = objFSO.OpenTextFile(strFileEstadisticas,8,True)
	objEstadisticas.WriteLine(strDescripcion & ";" & Now & ";No hay archivos para procesar; ;" & MsgA)
	objEstadisticas.Close()
End If

'-----------------
' FINALIZA PROCESO
'-----------------
Set objFSO = Nothing