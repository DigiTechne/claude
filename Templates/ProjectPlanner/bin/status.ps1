# Shows the current state of all stages in the pipeline.

$Root = Split-Path -Parent $PSScriptRoot

function Show-StageStatus {
    param(
        [string]$Label,
        [string]$Dir,
        [string]$StateFile
    )
    Write-Host "-- $Label " + "-" * (40 - $Label.Length)

    $statePath = Join-Path $Dir $StateFile
    if (Test-Path $statePath) {
        $status = (Select-String -Path $statePath -Pattern "Status:" | Select-Object -First 1).Line
        $status = $status -replace ".*Status:\s*", ""
        Write-Host "  State:   $status"
    } else {
        Write-Host "  State:   not started"
    }

    $outDir = Join-Path $Dir "output"
    if (Test-Path $outDir) {
        $files = Get-ChildItem -Path $outDir -Recurse -File | Where-Object { $_.Name -ne ".gitkeep" }
        if ($files) {
            Write-Host "  Outputs: $($files.Count) file(s)"
            $files | Sort-Object FullName | ForEach-Object {
                Write-Host "    $($_.FullName.Substring($outDir.Length + 1))"
            }
        } else {
            Write-Host "  Outputs: none"
        }
    }
    Write-Host ""
}

Write-Host ""
Write-Host "Pipeline Status"
Write-Host "==============="
Write-Host ""

Show-StageStatus "Stage 0 -- Idea"  (Join-Path $Root "stage-0-idea")  "working/stage-0-state.md"
Show-StageStatus "Stage 1 -- Plan"  (Join-Path $Root "stage-1-plan")  "working/stage-1-state.md"
Show-StageStatus "Stage 2 -- Build" (Join-Path $Root "stage-2-build") "working/build-state.md"
