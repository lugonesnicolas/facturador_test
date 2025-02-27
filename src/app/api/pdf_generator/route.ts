import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // HTML con el formato exacto de la factura
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Factura</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  background-color: #f4f4f4;
              }
              .container {
                  width: 210mm;
                  height: 297mm;
                  margin: auto;
                  background: #fff;
                  padding: 20mm;
                  border-radius: 10px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                  box-sizing: border-box;
              }
              .header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 20px;
              }
              .header h2 {
                  text-align: left;
                  margin: 0;
              }
              .header p {
                  text-align: right;
                  margin: 0;
                  font-size: 14px;
              }
              h3 {
                  text-align: left;
                  color: #333;
              }
              .row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 20px;
                  border-bottom: 2px solid #ddd;
                  padding-bottom: 10px;
              }
              .column {
                  width: 48%;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 10px;
              }
              table, th, td {
                  border: 1px solid black;
              }
              th, td {
                  padding: 10px;
                  text-align: left;
              }
              .total {
                  text-align: right;
                  font-size: 18px;
                  font-weight: bold;
              }
              .footer {
                  text-align: left;
                  margin-top: 20px;
                  font-weight: bold;
                  font-size: 16px;
              }
              @page {
                  size: A4;
                  margin: 0;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2>FACTURA</h2>
                  <p>Factura N°: 01</p>
              </div>
              
              <div class="row">
                  <div class="column">
                      <h3>DATOS DEL CLIENTE</h3>
                      <p><strong>Nombre:</strong> ${data.cliente}</p>
                      <p><strong>Teléfono:</strong> ${data.telefono}</p>
                      <p><strong>Correo:</strong> ${data.email}</p>
                      <p><strong>Dirección:</strong> ${data.direccion}</p>
                  </div>

                  <div class="column">
                      <h3>DATOS DE LA EMPRESA</h3>
                      <p><strong>Nombre:</strong> NDev.</p>
                      <p><strong>Teléfono:</strong> 1126343820</p>
                      <p><strong>Correo:</strong> lugonesnicolas@gmail.com</p>
                      <p><strong>Dirección:</strong> Brasilia 566, Tristan Suarez</p>
                  </div>
              </div>

              <h3>DETALLE DE FACTURA</h3>
              <table>
                  <tr>
                      <th>Detalle</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Total</th>
                  </tr>
                  <tr>
                      <td>${data.producto}</td>
                      <td>1</td>
                      <td>$${data.precio.toFixed(2)}</td>
                      <td>$${data.precio.toFixed(2)}</td>
                  </tr>
              </table>
              <p class="total">IVA 21%: $${(data.precio * 0.21).toFixed(2)}</p>
              <p class="total">TOTAL: $${(data.precio * 1.21).toFixed(2)}</p>

              <h3>INFORMACIÓN DE PAGO</h3>
              <p><strong>Banco:</strong> EjemploBank</p>
              <p><strong>Nombre:</strong> Mi Empresa S.A.</p>
              <p><strong>Número de cuenta:</strong> 123456789</p>

              <p class="footer">www.ndev.com</p>
          </div>
      </body>
      </html>
    `;

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=factura.pdf",
      },
    });
  } catch (error) {
    console.error("Error generando PDF:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
