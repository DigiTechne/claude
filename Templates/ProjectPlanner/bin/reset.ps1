# Usage: bin\reset.ps1 <stage>
# Clears a stage's working/ and output/ directories for a fresh run.
# Stage 2: only clears working/ and output/ — keeps inputs/ (your session plan).

param(
    [Parameter(Mandatory=$true)][string]$Stage,
    [switch]$Yes
)

$Root = Split-Path -Parent $PSScriptRoot

$StageDir = switch ($Stage) {
    "0" { Join-Path $Root "stage-0-idea" }
    "1" { Join-Path $Root "stage-1-plan" }
    "2" { Join-Path $Root "stage-2-build" }
    default { $null }
}

if (-not $StageDir) {
    Write-Error "Unknown stage '$Stage'. Valid stages: 0, 1, 2"
    exit 1
}

$msg = "This will clear Stage $Stage working/ and output/ directories."
if ($Stage -eq "1") { $msg += "`nAlso clears Stage 1 inputs/." }
Write-Host $msg

if (-not $Yes) {
    $reply = Read-Host "Proceed? (y/n)"
    if ($reply -notmatch '^[Yy]') { Write-Host "Cancelled."; exit 0 }
}

function Clear-StageDir {
    param([string]$Path)
    if (Test-Path $Path) {
        Get-ChildItem -Path $Path -Recurse -File |
            Where-Object { $_.Name -ne ".gitkeep" } |
            Remove-Item -Force
        Get-ChildItem -Path $Path -Recurse -Directory |
            Where-Object { (Get-ChildItem $_.FullName -Force | Measure-Object).Count -eq 0 } |
            Remove-Item -Force
    }
}

Clear-StageDir (Join-Path $StageDir "working")
Clear-StageDir (Join-Path $StageDir "output")

if ($Stage -eq "1") {
    Clear-StageDir (Join-Path $StageDir "inputs")
}

Write-Host "Stage $Stage reset. Ready for a new project."
