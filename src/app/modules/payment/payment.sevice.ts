// import { join } from 'path';
// import { verifyPayment } from './payment.utils';
// import { readFileSync } from 'fs';
// import { Gardening } from '../gardening/gardening.model';
// import { TGardening } from '../gardening/gardening.interface';

// const confirmationService = async (transactionID: string) => {
//   const verifyResponse = await verifyPayment(transactionID); // Verify payment

//   let message = '';
//   let gardeningData: TGardening | null = null;

//   // Find gardening data using transactionID (assuming you store transactionID in a related collection)
//   gardeningData = await Gardening.findOne({ transactionID })
//     .populate('category')
//     .populate('userId');

//   if (!gardeningData) {
//     return `<h1 class='failed-payment'>Error retrieving gardening details!</h1>`;
//   }

//   const { title, content, isPremium, tag } = gardeningData;

//   if (verifyResponse && verifyResponse.pay_status === 'Successful') {
//     gardeningData = await Gardening.findOneAndUpdate(
//       { transactionID },
//       { isPremium: true },
//       { new: true },
//     );

//     message = ` <h1 class='success-payment'>Thank You!</h1>
//                 <h2>Your gardening purchase is confirmed and payment is successful</h2>
//                 <p>You will receive a confirmation email with your gardening details shortly.</p>
//                 <h2>Gardening Details:</h2>
//                 <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
//                 <tr>
//                     <th style="border: 1px solid #ddd; padding: 8px;">Title</th>
//                         <td style="border: 1px solid #ddd; padding: 8px;">${title}</td>
//                 </tr>
//                 <tr>
//                     <th style="border: 1px solid #ddd; padding: 8px;">Content</th>
//                         <td style="border: 1px solid #ddd; padding: 8px;">${content}</td>
//                 </tr>
//                 <tr>
//                     <th style="border: 1px solid #ddd; padding: 8px;">Tag</th>
//                         <td style="border: 1px solid #ddd; padding: 8px;">${tag}</td>
//                 </tr>
//                 <tr>
//                     <th style="border: 1px solid #ddd; padding: 8px;">Premium</th>
//                         <td style="border: 1px solid #ddd; padding: 8px;">${isPremium ? 'Yes' : 'No'}</td>
//                 </tr>
//                 </table>
//                 <a href="" class="button">Go to Home</a>
//                 <p style='text-align: center'><strong>Thank you for choosing our gardening services!</strong></p>`;
//   } else {
//     message = `<h1 class='failed-payment'>Payment Failed!</h1>
//                 <h3>Oops! Something went wrong with your payment.
//                 <span class="bold">Please verify your payment information and try again</span>!</h3>
//                 <p>If you need assistance, our support team is here to help.</p>
//                 <a href="" class="button">Go to Home</a>`;
//   }

//   const filePath = join(__dirname, '../../../../public/confirmation.html');
//   let template = readFileSync(filePath, 'utf8');
//   template = template.replace('{{message}}', message);
//   return template;
// };

// export const PaymentService = {
//   confirmationService,
// };
