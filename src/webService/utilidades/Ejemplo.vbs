Dim bullet
Dim response, strConfirmacion
Dim objFSO,objFile1
Dim arrayJmeter (35,1)

strMargen = Chr(10) & "   " '& Chr(149) & " "

strFileProyectos = "Proyectos_Jmeter.txt"

Set objFSO = CreateObject("Scripting.FileSystemObject")
Const ForReading = 1

strLista = ""
i = 0
	
Set objFile1 = objFSO.OpenTextFile("Proyectos_Jmeter.txt", ForReading)
Do While objFile1.atEndOfstream <> True
	objLineaFile1 = objFile1.ReadLine
	strCamposFile1 = split(objLineaFile1,".")
	If Len(objLineaFile1) > 0 Then
		strLista = strLista & strMargen & objLineaFile1
		arrayJmeter(i,0) = strCamposFile1(0)
		arrayJmeter(i,1) = strCamposFile1(1)
		i = i + 1
	End If
Loop
objFile1.Close()

intTope = i

'For i = 0 to 4
'	msgbox i & "-" & arrayJmeter(i,0) & "-" & arrayJmeter(i,1)
'Next

siga = 0

Do While siga = 0
'   response = InputBox(strMargen & "1. Baja" & strMargen & "2. Alta" & strMargen & "3. Decremento" & _
	response = InputBox(strLista & Chr(10), "PROYECTOS JMETER")
    If response = "" Then 
		WScript.Quit
	Else
		If IsNumeric(response) Then
			res = cDbl(response)
			tope = cDbl(intTope)
			If res > tope or res < 1 Then 
				MsgBox "Ingrese un valor valido!", 48, "Invalid Entry"  
			Else 
				strConfirmacion = MsgBox ("Desea confirmar el proyecto " & response & "." & arrayJmeter(res-1,1) & " ", 305, "CONFIRMACION DE PROYECTO") '1:si 2:no
				If strConfirmacion = 1 Then
					siga = 1
				End If
			End If
		Else
			MsgBox "Ingrese un valor numerico!", 48, "Invalid Entry"
		End If
	End If	
Loop
MsgBox "Termine"
