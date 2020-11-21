import { EntityRepository, Repository } from 'typeorm';

import IAppointmensRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository
    extends Repository<Appointment>
    implements IAppointmensRepository {
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment;
    }
}

export default AppointmentsRepository;
