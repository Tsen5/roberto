import { PdfReader } from 'pdfreader';

export const getPDFContent = async (filePath: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const content: string[] = ['----- START OF PDF CONTENT-----\n'];

    new PdfReader().parseFileItems(filePath, (err, item) => {
      if (err) {
        reject(err);
        return;
      }

      if (!item) {
        content.push('\n----- END OF PDF CONTENT-----');
        resolve(content.join(' '));
        return;
      }

      if (item.text) {
        content.push(item.text);
      }
    });
  });
