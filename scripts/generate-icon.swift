import AppKit

let size = 512
guard let bitmap = NSBitmapImageRep(
  bitmapDataPlanes: nil,
  pixelsWide: size,
  pixelsHigh: size,
  bitsPerSample: 8,
  samplesPerPixel: 4,
  hasAlpha: true,
  isPlanar: false,
  colorSpaceName: .deviceRGB,
  bytesPerRow: 0,
  bitsPerPixel: 0
), let graphics = NSGraphicsContext(bitmapImageRep: bitmap) else {
  fatalError("Unable to create icon canvas")
}

NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = graphics
graphics.imageInterpolation = .high

NSColor(calibratedRed: 0.07, green: 0.13, blue: 0.23, alpha: 1).setFill()
NSBezierPath(roundedRect: NSRect(x: 8, y: 8, width: 496, height: 496), xRadius: 100, yRadius: 100).fill()

let braceStyle: [NSAttributedString.Key: Any] = [
  .font: NSFont.monospacedSystemFont(ofSize: 262, weight: .medium),
  .foregroundColor: NSColor(calibratedRed: 0.93, green: 0.97, blue: 1, alpha: 1)
]
("{" as NSString).draw(at: NSPoint(x: 51, y: 120), withAttributes: braceStyle)
("}" as NSString).draw(at: NSPoint(x: 335, y: 120), withAttributes: braceStyle)

func arrow(from start: CGFloat, to end: CGFloat, y: CGFloat, color: NSColor) {
  color.setStroke()
  color.setFill()
  let shaft = NSBezierPath()
  shaft.lineWidth = 25
  shaft.lineCapStyle = .round
  shaft.move(to: NSPoint(x: start, y: y))
  shaft.line(to: NSPoint(x: end, y: y))
  shaft.stroke()

  let direction: CGFloat = end > start ? 1 : -1
  let tip = NSBezierPath()
  tip.move(to: NSPoint(x: end + direction * 33, y: y))
  tip.line(to: NSPoint(x: end - direction * 7, y: y + 32))
  tip.line(to: NSPoint(x: end - direction * 7, y: y - 32))
  tip.close()
  tip.fill()
}

arrow(from: 179, to: 303, y: 303, color: NSColor(calibratedRed: 0.26, green: 0.87, blue: 0.82, alpha: 1))
arrow(from: 333, to: 209, y: 207, color: NSColor(calibratedRed: 1, green: 0.63, blue: 0.36, alpha: 1))

graphics.flushGraphics()
NSGraphicsContext.restoreGraphicsState()

guard let png = bitmap.representation(using: .png, properties: [:]) else {
  fatalError("Unable to encode icon PNG")
}
try png.write(to: URL(fileURLWithPath: "icon.png"))
