import { ExitItem } from '../model/Exit';
import { jsPDF } from 'jspdf';
import autotable from 'jspdf-autotable';
import { show } from './show';

export function exitBoarding(exits: ExitItem[]) {
  const doc = new jsPDF({
    orientation: 'p',
  });
  const body: any[] = exits.map((e) => [e.sort, e.name, e.city, e.b, e.m, e.s, e.totalAmount()]);
  const lastLine = [
    '',
    '',
    '',
    { content: exits.reduce((p, c) => p + c.b, 0), styles: { fontStyle: 'bold' } },
    { content: exits.reduce((p, c) => p + c.m, 0), styles: { fontStyle: 'bold' } },
    { content: exits.reduce((p, c) => p + c.s, 0), styles: { fontStyle: 'bold' } },
    { content: exits.reduce((p, c) => p + c.totalAmount(), 0), styles: { fontStyle: 'bold' } },
  ];
  body.push(lastLine);
  autotable(doc, {
    theme: 'grid',
    head: [['N', 'Cliente', 'Cidade', 'G', 'M', 'P', 'Total']],
    body,
  });

  show(doc.output());
}
