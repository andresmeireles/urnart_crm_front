import { ExitItem } from '../model/Exit';
import { jsPDF } from 'jspdf';
import { show } from './show';
import { font } from '../fonts/arial';

export function driver(props: { items: ExitItem[]; travelData?: string }) {
  const doc = new jsPDF({
    orientation: 'p',
  });
  let { items } = props;
  doc.addFileToVFS('arial.tff', font);
  doc.addFont('arial.tff', 'arial', 'normal');
  doc.setFont('arial');
  let size = 12;
  const leftPadding = 10;

  doc.setFontSize(25);
  doc.text('Relatório de Viagem', leftPadding, size);
  doc.setFontSize(12);

  size += 10;
  doc.text('Nome do Motorista:', leftPadding, size);
  doc.text('Data de saída:', leftPadding + 75, size);
  size += 10;

  for (const item of items) {
    if (size >= 250) {
      doc.addPage();
      size = 12;
    }
    doc.text(`Cliente: ${item.name}`, leftPadding, size);
    doc.text(`Cidade: ${item.city}`, leftPadding + 120, size);
    size += 7;
    doc.text('Dia chegada:', leftPadding, size);
    doc.text('Hora chegada:', leftPadding + 50, size);
    doc.text('Dia saída:', leftPadding + 100, size);
    doc.text('Hora chegada:', leftPadding + 150, size);
    size += 10;
    doc.text('_'.repeat(76), leftPadding, size);
    size += 10;
    doc.text('_'.repeat(76), leftPadding, size);
    size += 10;
    doc.text('_'.repeat(76), leftPadding, size);
    size += 10;
    doc.text('_'.repeat(76), leftPadding, size);
    size += 10;
  }

  show(doc.output());
}
