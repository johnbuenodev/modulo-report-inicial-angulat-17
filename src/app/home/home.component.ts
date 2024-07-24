import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild,  } from '@angular/core';

import jsPDF from 'jspdf';

interface dadosInterface {
  pagina: number;
  dados: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})

export class HomeComponent {
  email: string = 'johnbuenodevnew@gmail.com';

  items: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80,
  ];

  pages: number = 20;
  dados: dadosInterface[] = [];

  cont = 0;
  pageValue = 0;
  arrayPage: number[] = [];

  rel = 'rel';

  pdfObject: any[] = null!;

  @ViewChild('report', { static: false }) report!: ElementRef<any>;

  dateCurrent: Date = null!;

  constructor() {
    this.dateCurrent = new Date();
    this.arrayPage.push(0);
    this.items.forEach((element) => {
      if (this.pageValue == 0) {
        if (this.cont < 8) {
          //6
          let newDados = {
            pagina: this.pageValue,
            dados: this.items[element - 1],
          };
          this.dados.push(newDados as dadosInterface);
          this.cont++;
        }

        if (this.cont == 8) {
          this.pageValue++;
          this.arrayPage.push(this.pageValue);
          this.cont = 0;
          return;
          //ta quebrando por aqui
          // let newDados = { pagina: this.pageValue, dados: this.items[element- 1] };
          // this.dados.push(newDados as dadosInterface);
        }
      }

      console.log(this.items[element] == 15);

      if (this.pageValue > 0) { //entender porq ele cria uma pagina a mais IMPORTANTE
        if (this.cont <= 12) {
          let newDados = {
            pagina: this.pageValue,
            dados: this.items[element - 1],
          };
          this.dados.push(newDados as dadosInterface);
          this.cont++;
        }

        if (this.cont == 12) {
          //10
          this.pageValue++;
          this.arrayPage.push(this.pageValue);
          this.cont = 0;
          return;
          // let newDados = { pagina: this.pageValue, dados: this.items[element] };
          // this.dados.push(newDados as dadosInterface);
        }
      }
    });

    // for (let index = 0; index < this.items.length; index++) {
    //   if (this.pageValue == 0) {
    //     if (this.cont < 6) {
    //       let newDados = { pagina: this.pageValue, dados: this.items[index] };
    //       this.dados.push(newDados as dadosInterface);
    //       this.cont++;
    //     }

    //     if(this.cont >= 6) {
    //       this.pageValue++;
    //       this.arrayPage.push(this.pageValue);
    //       this.cont = 0;
    //       //ta quebrando por aqui
    //       let newDados = { pagina: this.pageValue, dados: this.items[index] };
    //       this.dados.push(newDados as dadosInterface);
    //     }
    //   }

    //   console.log(this.items[index] == 15);

    //   if (this.pageValue > 0) {
    //     if (this.cont < 8) {
    //       let newDados = { pagina: this.pageValue, dados: this.items[index] };
    //       this.dados.push(newDados as dadosInterface);
    //       this.cont++;
    //     }

    //     if(this.cont >= 8) {
    //       this.pageValue++;
    //       this.arrayPage.push(this.pageValue);
    //       this.cont = 0;
    //       let newDados = { pagina: this.pageValue, dados: this.items[index] };
    //       this.dados.push(newDados as dadosInterface);
    //     }
    //   }
    // }

    console.log(this.dados);
    console.log(this.arrayPage);
  }

  async button() {
    const input = document.getElementById('report');
    var clientHeight = input?.clientHeight;
    var clientWidth = input?.clientWidth;

    //var merger = new PDFMerger();

    //this.generatePdfList("pdf");

    // let makepdf = document.getElementById("makepdf")!;

    //     let mywindow = window.open("", "PRINT",
    //             "height=400,width=600")!;

    //     mywindow.document.write(makepdf.innerHTML);

    //     mywindow.document.close();
    //     mywindow.focus();

    //     mywindow.print();
    //     mywindow.close();

    // const doc = new jsPDF({
    //   orientation: "landscape",
    //   unit: "in",
    //   format: [4, 2]
    // });

    //tipo da folha portrait - landscape
    //unidade de medida pdf pt / px /in /ex ...
    //tipo da folha

    // let pdf = new jsPDF('landscape', 'pt', 'a4');
    // pdf.html(this.report.nativeElement, {
    //   callback: (pdfGen) => {
    //     pdfGen.save('novo-relatorio.pdf');
    //   },
    // });

    //new jsPDF('p', 'px', [clientWidth, clientHeight]);
    let pdf = new jsPDF('l', 'pt', [clientWidth!, clientHeight!]); //landscape  portrait //a4

    // console.log(this.report);
    // for (let index = 0; index < this.report.length; index++) {
    //   pdf.html(this.report[index].nativeElement, {
    //     callback: (pdfGen) => {
    //       pdfGen.save(`novo-relatorio${this.report[index]}.pdf`);
    //     },
    //   });
    // }

    //anteriormente 0
    // for (let index = 0; index < this.arrayPage.length; index++) {
    //   let elem: HTMLElement /*ElementRef<any>*/ = await document.getElementById(`rel${index}`)!;

    //   pdf.html(elem, {
    //     callback: async (pdfGen) => {

    //       //await merger.add();
    //       //pdfGen.save(`novo-relatorio${index+1}.pdf`);
    //      let pdf = pdfGen.save(`novo-relatorio${index+1}.pdf`)
    //      //await merger.add(pdf.);
    //     },
    //   })

    // }

    // (async () => {
    //   await merger.add('pdf1.pdf');  //merge all pages. parameter is the path to file and filename.
    //   await merger.add('pdf2.pdf', 2); // merge only page 2
    //   await merger.add('pdf2.pdf', [1, 3]); // merge the pages 1 and 3
    //   await merger.add('pdf2.pdf', '4, 7, 8'); // merge the pages 4, 7 and 8
    //   await merger.add('pdf3.pdf', '3 to 5'); //merge pages 3 to 5 (3,4,5)
    //   await merger.add('pdf3.pdf', '3-5'); //merge pages 3 to 5 (3,4,5)

    //   // Set metadata
    //   await merger.setMetadata({
    //     producer: "pdf-merger-js based script",
    //     author: "John Doe",
    //     creator: "John Doe",
    //     title: "My live as John Doe"
    //   });

    //   await merger.save('merged.pdf'); //save under given name and reset the internal document

    // Export the merged PDF as a nodejs Buffer
    // const mergedPdfBuffer = await merger.saveAsBuffer();
    // fs.writeSync('merged.pdf', mergedPdfBuffer);
    // })();

    pdf.html(this.report.nativeElement, {
      callback: (pdfGen) => {
        pdfGen.save('novo-relatorio.pdf');
      },
    });
  }

  // private async generatePdfList(type: string, page = 1) {
  //   console.log('STEP 1:', new Date());
  //   //const elements = document.querySelectorAll('report');
  //   let elements: NodeListOf<Element> = null!;

  //   for (let index = 0; index < this.arrayPage.length; index++) {
  //     elements /*ElementRef<any>*/ = await document.querySelectorAll('.report')!;
  //   }

  //   console.log(elements);

  //   const elementArray = Array.from(elements);
  //   const bufferPromises: Promise<any>[] = elementArray
  //     .filter(element => !!element)
  //     .map(element =>

  //       this.elementToPdfBuffer(type, element, page)

  //       );
  //   const pdfArrayBuffers = await Promise.all(bufferPromises);
  //   console.log('STEP 2:', new Date());
  //   const mergedPdf = await this.mergePdfs(pdfArrayBuffers);
  //   const pdfUrl = URL.createObjectURL(
  //     new Blob([mergedPdf], { type: 'application/pdf' }),
  //   );

  //   console.log(pdfUrl);
  // }

  // async elementToPdfBuffer(type: any, element: any, page: any) {
  //   // option 1:
  //   // const pdf: jsPDF = html2pdf().from(element).toPdf().get("pdf");
  //   // option 2:
  //   //new jsPDF().html(element);
  //   const pdfBuffer = await new jsPDF().html(element);
  //   return pdfBuffer;
  // }

  // async mergePdfs(pdfsToMerges: ArrayBuffer[]) {
  //   const mergedPdf = await PDFDocument.create();
  //   const actions = pdfsToMerges.map(async pdfBuffer => {
  //     const pdf = await PDFDocument.load(pdfBuffer);
  //     const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
  //     copiedPages.forEach((page) => {
  //       // console.log('page', page.getWidth(), page.getHeight());
  //       //page.setWidth(210);
  //       mergedPdf.addPage(page);
  //     });
  //   });
  //   await Promise.all(actions);
  //   const mergedPdfFile = await mergedPdf.save();
  //   return mergedPdfFile;
  // }
}

