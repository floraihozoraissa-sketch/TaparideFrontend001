import { jsPDF } from 'jspdf'

export interface TicketData {
  bookingRef: string
  passenger: string
  carrier: string
  depTime: string
  depPlace: string
  arrTime: string
  arrPlace: string
  date: string
  seats: string
  amountPaid: string
}

const INK: [number, number, number] = [16, 7, 92]
const FLAME: [number, number, number] = [234, 88, 12]

/** Generates and downloads a branded TapaRide e-ticket as a PDF. */
export function downloadTicket(t: TicketData) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const margin = 48
  const cardW = pageW - margin * 2
  let y = margin

  // Header band
  doc.setFillColor(...INK)
  doc.roundedRect(margin, y, cardW, 70, 10, 10, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text('TapaRide', margin + 20, y + 32)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text('Bus E-Ticket', margin + 20, y + 50)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text(t.bookingRef, margin + cardW - 20, y + 42, { align: 'right' })

  y += 70 + 28

  // Route
  doc.setTextColor(...INK)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text(t.depTime, margin, y)
  doc.text(t.arrTime, margin + cardW, y, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(120, 120, 140)
  doc.text(t.depPlace, margin, y + 16)
  doc.text(t.arrPlace, margin + cardW, y + 16, { align: 'right' })

  // Arrow line
  doc.setDrawColor(...FLAME)
  doc.setLineWidth(1.5)
  doc.line(margin + 90, y - 6, margin + cardW - 90, y - 6)

  y += 48
  doc.setDrawColor(220, 220, 230)
  doc.setLineWidth(1)
  doc.setLineDashPattern([3, 3], 0)
  doc.line(margin, y, margin + cardW, y)
  doc.setLineDashPattern([], 0)

  y += 28

  // Details grid
  const rows: [string, string][] = [
    ['Passenger', t.passenger],
    ['Carrier', t.carrier],
    ['Date', t.date],
    ['Seats', t.seats],
    ['Amount paid', t.amountPaid],
    ['Booking reference', t.bookingRef],
  ]
  const colW = cardW / 2
  rows.forEach(([label, value], i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const x = margin + col * colW
    const ry = y + row * 52
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(150, 150, 165)
    doc.text(label.toUpperCase(), x, ry)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(...INK)
    doc.text(value, x, ry + 18)
  })

  y += Math.ceil(rows.length / 2) * 52 + 16

  // Footer note
  doc.setDrawColor(220, 220, 230)
  doc.setLineDashPattern([3, 3], 0)
  doc.line(margin, y, margin + cardW, y)
  doc.setLineDashPattern([], 0)
  y += 24
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(120, 120, 140)
  doc.text('Please arrive at the terminal at least 30 minutes before departure.', margin, y)
  doc.text('Show this e-ticket and a valid ID when boarding. Safe travels with TapaRide.', margin, y + 16)

  doc.save(`taparide-ticket-${t.bookingRef}.pdf`)
}
