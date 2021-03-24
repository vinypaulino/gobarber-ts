import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherialMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter: Transporter = nodemailer.createTransport({
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });
            this.client = transporter;
        });
    }

    public async sendMail(to: string, body: string): Promise<void> {
        await this.client.sendMail({
            from: 'Equipe GoBarner ',
            to,
            subject: 'Recuperação de Senha',
            text: body,
        });
    }
}
