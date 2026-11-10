Add-Type -AssemblyName System.Drawing

function Generate-Icon {
    param (
        [int]$dim,
        [string]$outPath
    )

    $bmp = New-Object System.Drawing.Bitmap($dim, $dim)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $scale = [float]$dim / 64.0
    $rectX = [float](4.0 * $scale)
    $rectY = [float](4.0 * $scale)
    $rectW = [float](56.0 * $scale)
    $rectH = [float](56.0 * $scale)
    $radius = [float](16.0 * $scale)
    $diameter = [float]($radius * 2.0)

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc($rectX, $rectY, $diameter, $diameter, 180.0, 90.0)
    $path.AddArc($rectX + $rectW - $diameter, $rectY, $diameter, $diameter, 270.0, 90.0)
    $path.AddArc($rectX + $rectW - $diameter, $rectY + $rectH - $diameter, $diameter, $diameter, 0.0, 90.0)
    $path.AddArc($rectX, $rectY + $rectH - $diameter, $diameter, $diameter, 90.0, 90.0)
    $path.CloseFigure()

    $p1 = New-Object System.Drawing.PointF(0.0, 0.0)
    $p2 = New-Object System.Drawing.PointF([float]$dim, [float]$dim)
    $c1 = [System.Drawing.ColorTranslator]::FromHtml('#2563eb')
    $c2 = [System.Drawing.ColorTranslator]::FromHtml('#7c3aed')
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($p1, $p2, $c1, $c2)

    $g.FillPath($brush, $path)

    $fontSize = [float](24.0 * $scale)
    $font = New-Object System.Drawing.Font('Arial', $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center

    $offsetY = [float]($scale * 1.5)
    $textRect = New-Object System.Drawing.RectangleF(0.0, $offsetY, [float]$dim, [float]$dim)
    $whiteBrush = [System.Drawing.Brushes]::White
    $g.DrawString('ED', $font, $whiteBrush, $textRect, $sf)

    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $font.Dispose()
    $sf.Dispose()
    $brush.Dispose()
    $path.Dispose()
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated: $outPath ($dim x $dim)"
}

$rootDir = Split-Path -Parent $PSScriptRoot
Generate-Icon 180 (Join-Path $rootDir "apple-touch-icon.png")
Generate-Icon 192 (Join-Path $rootDir "icon-192.png")
Generate-Icon 512 (Join-Path $rootDir "icon-512.png")
Generate-Icon 32 (Join-Path $rootDir "favicon-32x32.png")
