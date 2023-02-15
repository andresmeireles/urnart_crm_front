import { jsPDF } from "jspdf";
import { show } from "./show";

export interface TagInterface {
  name: string,
  city: string,
  amount: number,
  single: boolean,
  hash: string,
}

export default function tag(props: { tags: TagInterface[] }) {
  const doc = new jsPDF({
    orientation: 'p',
  });
  const { tags } = props;

  const defaultFontSize = 30;
  doc.setFontSize(defaultFontSize);
  let space = 12;
  for (const tag of tags) {
    for (let a = 1; a <= tag.amount; a++) {
      if (space > 300) {
        doc.addPage();
        space = 12
      }
      const subspace = space + 12;
      const lineHeight = subspace + 5;
      doc.text('ibagem', 2, space);
      const name = tag.name.substring(0, 34);
      doc.setFontSize(tag.name.length > 20 ? 21 : defaultFontSize);
      doc.text(name, 40, space);
      doc.setFontSize(defaultFontSize);
      doc.text(tag.city, 40, subspace);
      doc.text(a.toString(), 175, space);
      doc.text(`VOL. ${tag.amount}`, 160, subspace);
      doc.text('_'.repeat(150), 0, lineHeight);
      space = space + 30;
    }
  }

 show(doc.output()); 
}
