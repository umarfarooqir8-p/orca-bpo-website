' Starts ORCA BPO on all network interfaces so friends on same Wi-Fi can open the Network link.
Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
folder = fso.GetParentFolderName(WScript.ScriptFullName)
sh.CurrentDirectory = folder

ExitCode = sh.Run("cmd /c netstat -ano | findstr :8080 | findstr LISTENING", 0, True)
If ExitCode = 0 Then
  sh.Run "http://localhost:8080/", 1, False
  WScript.Quit
End If

sh.Run "cmd /c title ORCA BPO Website & npm run dev", 7, False
WScript.Sleep 5000
sh.Run "http://localhost:8080/", 1, False
