$pagesDir = ".\src\pages"
$files = Get-ChildItem -Path $pagesDir -Filter *.tsx -Recurse

$pattern = '(?s)<button[^>]*onClick=\{\(\)\s*=>\s*navigate\(-1\)\}[^>]*>.*?<\/button>'
$utf8NoBom = New-Object System.Text.UTF8Encoding($False)

foreach ($file in $files) {
    try {
        $content = Get-Content -Path $file.FullName -Raw
        if ($content -match $pattern) {
            $content = $content -replace $pattern, '<BackButton />'
            
            if ($content -notmatch 'import \{ BackButton \}') {
                $absPagesDir = (Resolve-Path $pagesDir).Path
                $relPath = $file.FullName.Replace($absPagesDir, "")
                $depth = 0
                if ($relPath.Length -gt 0) {
                    $parts = $relPath.Split('\', [System.StringSplitOptions]::RemoveEmptyEntries)
                    $depth = $parts.Length - 1
                }
                
                $up = ""
                for ($i = 0; $i -lt $depth; $i++) { $up += "../" }
                $importStr = "import { BackButton } from '${up}components/BackButton';`r`n"
                
                $lastImportIndex = $content.LastIndexOf("import ")
                if ($lastImportIndex -ge 0) {
                    $endOfLine = $content.IndexOf("`n", $lastImportIndex)
                    if ($endOfLine -ge 0) {
                        $content = $content.Insert($endOfLine + 1, $importStr)
                    } else {
                        $content = $content + "`r`n" + $importStr
                    }
                } else {
                    $content = $importStr + $content
                }
            }
            
            [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
            Write-Host "Modified $($file.Name)"
        }
    } catch {
        Write-Host "Error modifying $($file.Name): $_"
    }
}
Write-Host "Done"
