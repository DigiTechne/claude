# Usage: bin\handoff.ps1 <from> <to>
# Copies outputs from one stage into the next stage's inputs.
# Example: bin\handoff.ps1 0 1

param(
    [Parameter(Mandatory=$true)][string]$From,
    [Parameter(Mandatory=$true)][string]$To,
    [switch]$Yes
)

$Root = Split-Path -Parent $PSScriptRoot

function Get-StageDir {
    param([string]$Stage)
    switch ($Stage) {
        "0" { return Join-Path $Root "stage-0-idea" }
        "1" { return Join-Path $Root "stage-1-plan" }
        "2" { return Join-Path $Root "stage-2-build" }
        default { return $null }
    }
}

$FromDir = Get-StageDir $From
$ToDir   = Get-StageDir $To

if (-not $FromDir) { Write-Error "Unknown stage '$From'. Valid: 0, 1, 2"; exit 1 }
if (-not $ToDir)   { Write-Error "Unknown stage '$To'. Valid: 0, 1, 2"; exit 1 }

$FromOutput = Join-Path $FromDir "output"
$ToInput    = Join-Path $ToDir   "inputs"

if (-not (Test-Path $FromOutput)) { Write-Error "$FromOutput does not exist."; exit 1 }
if (-not (Test-Path $ToInput))    { Write-Error "$ToInput does not exist."; exit 1 }

$Files = Get-ChildItem -Path $FromOutput -Recurse -File | Where-Object { $_.Name -ne ".gitkeep" }
if (-not $Files) {
    Write-Host "No output files found in $FromOutput. Has Stage $From been completed?"
    exit 1
}

Write-Host "Copying Stage $From -> Stage $To`:"
$Files | ForEach-Object { Write-Host "  $($_.FullName.Substring($FromOutput.Length + 1))" }
Write-Host ""

if (-not $Yes) {
    $reply = Read-Host "Proceed? (y/n)"
    if ($reply -notmatch '^[Yy]') { Write-Host "Cancelled."; exit 0 }
}

# Copy preserving directory structure
$Files | ForEach-Object {
    $relative = $_.FullName.Substring($FromOutput.Length + 1)
    $dest = Join-Path $ToInput $relative
    $destDir = Split-Path -Parent $dest
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }
    Copy-Item -Path $_.FullName -Destination $dest -Force
}

Write-Host "Done. Stage $To inputs are ready."
