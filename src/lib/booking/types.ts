export interface Appointment {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_id: string;
  service_name: string;
  employee_id: string;
  employee_name: string;
  employee_email: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  notes: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  instagram_confirmed: boolean;
  reminder_sent: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbEmployee {
  id: string;
  name: string;
  email: string;
  role_en: string;
  role_es: string;
  image: string;
  specialties: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateAppointmentInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  notes?: string;
  instagramConfirmed?: boolean;
}
