import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Barcode.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Barcode = () => {
  const navigate = useNavigate();

  // Function to download ticket and barcode as PDF
  const handleDownloadTicket = () => {
    // Get the ticket element from the parent component
    const ticketElement = document.querySelector('.left-part');
    const barcodeElement = document.querySelector('.barcode-wrapper');
    
    if (!ticketElement) {
      alert('Ticket content not found.');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // First, convert ticket to image and add to PDF
    html2canvas(ticketElement).then(ticketCanvas => {
      const ticketImgData = ticketCanvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 40; // Adding margins
      const imgHeight = imgWidth * ticketCanvas.height / ticketCanvas.width;
      
      pdf.addImage(ticketImgData, 'PNG', 20, 20, imgWidth, imgHeight);
      
      // Then add the barcode below the ticket
      html2canvas(barcodeElement).then(barcodeCanvas => {
        const barcodeImgData = barcodeCanvas.toDataURL('image/png');
        const barcodeImgWidth = 100;
        const barcodeImgHeight = barcodeImgWidth * barcodeCanvas.height / barcodeCanvas.width;
        
        pdf.addImage(barcodeImgData, 'PNG', (pdfWidth - barcodeImgWidth) / 2, 
          30 + imgHeight, barcodeImgWidth, barcodeImgHeight);
        
        // Add some text
        pdf.setFontSize(12);
        pdf.text('Scan the barcode to view your ticket on any device', pdfWidth / 2, 
          40 + imgHeight + barcodeImgHeight, { align: 'center' });
        
        // Save the PDF
        pdf.save('e-ticket.pdf');
      });
    });
  };

  // Function to print the ticket and barcode
  const handlePrintTicket = () => {
    const printContent = document.createElement('div');
    printContent.style.width = '100%';
    
    // Clone the ticket
    const ticketElement = document.querySelector('.left-part').cloneNode(true);
    
    // Clone the barcode
    const barcodeWrapper = document.querySelector('.barcode-wrapper').cloneNode(true);
    const barcodeText = document.createElement('p');
    barcodeText.textContent = 'Scan the barcode to view your ticket in any device';
    
    // Append elements to print content
    printContent.appendChild(ticketElement);
    printContent.appendChild(document.createElement('hr'));
    printContent.appendChild(barcodeWrapper);
    printContent.appendChild(barcodeText);
    
    // Create print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print E-Ticket</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; padding: 20px; }');
    printWindow.document.write('.left-part { margin-bottom: 20px; }');
    printWindow.document.write('.barcode-wrapper { display: flex; justify-content: center; margin: 20px 0; }');
    printWindow.document.write('hr { margin: 30px 0; border: 1px dashed #ccc; }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.focus();
    
    // Print after resources are loaded
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="barcode-section">
      <div className="barcode-wrapper">
        <img
          src="/barcode.png"
          alt="Barcode"
          className="barcode-image"
        />
      </div>
      <div><p>Scan the barcode to view your ticket in any device</p></div>
      <div className="barcode-buttons">
        <button onClick={handlePrintTicket}>Print E-Ticket</button>
        <button onClick={() => navigate('/tickets')}>Book Another Ticket</button>
        <button onClick={handleDownloadTicket}>Download Ticket</button>
      </div>
    </div>
  );
};

export default Barcode;