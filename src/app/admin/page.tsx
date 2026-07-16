"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  LogOut,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
} from "lucide-react";
import { Appointment, DbEmployee } from "@/lib/booking/types";

type Tab = "appointments" | "employees" | "calendar";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [employees, setEmployees] = useState<DbEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    email: "",
    role_en: "",
    role_es: "",
    specialties: "",
  });

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/admin/auth");
    if (!res.ok) {
      router.push("/admin/login");
      return false;
    }
    return true;
  }, [router]);

  const fetchAppointments = useCallback(async () => {
    const params = statusFilter !== "all" ? `?status=${statusFilter}` : "";
    const res = await fetch(`/api/admin/appointments${params}`);
    if (res.ok) {
      const data = await res.json();
      setAppointments(data.appointments);
    }
  }, [statusFilter]);

  const fetchEmployees = useCallback(async () => {
    const res = await fetch("/api/admin/employees");
    if (res.ok) {
      const data = await res.json();
      setEmployees(data.employees);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const authed = await checkAuth();
      if (!authed) return;
      await Promise.all([fetchAppointments(), fetchEmployees()]);
      setLoading(false);
    })();
  }, [checkAuth, fetchAppointments, fetchEmployees]);

  useEffect(() => {
    if (!loading) fetchAppointments();
  }, [statusFilter, loading, fetchAppointments]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchAppointments();
  };

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newEmployee,
        specialties: newEmployee.specialties.split(",").map((s) => s.trim()),
      }),
    });
    setShowEmployeeForm(false);
    setNewEmployee({ id: "", name: "", email: "", role_en: "", role_es: "", specialties: "" });
    fetchEmployees();
  };

  const toggleEmployeeActive = async (id: string, active: boolean) => {
    await fetch(`/api/admin/employees/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    fetchEmployees();
  };

  const statusColors: Record<string, string> = {
    confirmed: "bg-green-500/20 text-green-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    cancelled: "bg-red-500/20 text-red-400",
    completed: "bg-blue-500/20 text-blue-400",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="text-luxury-gold animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      <header className="border-b border-luxury-border/30 bg-luxury-dark/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold gold-text">LOYALTY</h1>
            <p className="text-luxury-cream/50 text-xs">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { fetchAppointments(); fetchEmployees(); }}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw className="w-4 h-4 text-luxury-cream" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-luxury-cream/70"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {([
            { key: "appointments" as Tab, icon: Calendar, label: "Appointments" },
            { key: "employees" as Tab, icon: Users, label: "Employees" },
            { key: "calendar" as Tab, icon: Clock, label: "Calendar" },
          ]).map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                tab === key
                  ? "bg-luxury-gold text-luxury-black"
                  : "glass text-luxury-cream/70 hover:text-luxury-gold"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total", value: appointments.length, color: "text-luxury-cream" },
            { label: "Confirmed", value: appointments.filter((a) => a.status === "confirmed").length, color: "text-green-400" },
            { label: "Pending", value: appointments.filter((a) => a.status === "pending").length, color: "text-yellow-400" },
            { label: "Employees", value: employees.filter((e) => e.active).length, color: "text-luxury-gold" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-luxury-cream/50 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {tab === "appointments" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-4 h-4 text-luxury-gold" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-luxury-card border border-luxury-border text-luxury-cream text-sm"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="space-y-3">
              {appointments.length === 0 ? (
                <div className="glass-card p-8 text-center text-luxury-cream/50">
                  No appointments found
                </div>
              ) : (
                appointments.map((apt) => (
                  <div key={apt.id} className="glass-card p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-luxury-cream">{apt.customer_name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[apt.status]}`}>
                            {apt.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-luxury-cream/60">
                          <span>{apt.service_name}</span>
                          <span>{apt.employee_name}</span>
                          <span>{apt.appointment_date}</span>
                          <span>{apt.start_time} - {apt.end_time}</span>
                        </div>
                        {apt.notes && (
                          <p className="text-luxury-cream/40 text-xs mt-2">Notes: {apt.notes}</p>
                        )}
                        <div className="flex gap-4 text-xs text-luxury-cream/40 mt-2">
                          <span>{apt.customer_email}</span>
                          <span>{apt.customer_phone}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {apt.status !== "confirmed" && (
                          <button
                            onClick={() => updateStatus(apt.id, "confirmed")}
                            className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors"
                            title="Confirm"
                          >
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </button>
                        )}
                        {apt.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus(apt.id, "cancelled")}
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                            title="Cancel"
                          >
                            <XCircle className="w-4 h-4 text-red-400" />
                          </button>
                        )}
                        {apt.status === "confirmed" && (
                          <button
                            onClick={() => updateStatus(apt.id, "completed")}
                            className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs hover:bg-blue-500/30 transition-colors"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {tab === "employees" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-luxury-cream">Team Members</h2>
              <button
                onClick={() => setShowEmployeeForm(!showEmployeeForm)}
                className="px-4 py-2 rounded-lg bg-luxury-gold text-luxury-black text-sm font-medium"
              >
                {showEmployeeForm ? "Cancel" : "Add Employee"}
              </button>
            </div>

            {showEmployeeForm && (
              <form onSubmit={handleCreateEmployee} className="glass-card p-5 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="ID (e.g. john)" value={newEmployee.id} onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })} className="px-3 py-2 rounded-lg bg-luxury-black/50 border border-luxury-border text-luxury-cream text-sm" required />
                <input placeholder="Name" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} className="px-3 py-2 rounded-lg bg-luxury-black/50 border border-luxury-border text-luxury-cream text-sm" required />
                <input placeholder="Email" type="email" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} className="px-3 py-2 rounded-lg bg-luxury-black/50 border border-luxury-border text-luxury-cream text-sm" required />
                <input placeholder="Role (EN)" value={newEmployee.role_en} onChange={(e) => setNewEmployee({ ...newEmployee, role_en: e.target.value })} className="px-3 py-2 rounded-lg bg-luxury-black/50 border border-luxury-border text-luxury-cream text-sm" required />
                <input placeholder="Role (ES)" value={newEmployee.role_es} onChange={(e) => setNewEmployee({ ...newEmployee, role_es: e.target.value })} className="px-3 py-2 rounded-lg bg-luxury-black/50 border border-luxury-border text-luxury-cream text-sm" required />
                <input placeholder="Specialties (comma separated)" value={newEmployee.specialties} onChange={(e) => setNewEmployee({ ...newEmployee, specialties: e.target.value })} className="px-3 py-2 rounded-lg bg-luxury-black/50 border border-luxury-border text-luxury-cream text-sm" />
                <button type="submit" className="sm:col-span-2 py-2 rounded-lg bg-luxury-gold text-luxury-black font-medium text-sm">Create Employee</button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((emp) => (
                <div key={emp.id} className={`glass-card p-5 ${!emp.active ? "opacity-50" : ""}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-luxury-cream">{emp.name}</h3>
                    <button
                      onClick={() => toggleEmployeeActive(emp.id, emp.active)}
                      className={`px-2 py-0.5 rounded-full text-xs ${emp.active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                    >
                      {emp.active ? "Active" : "Inactive"}
                    </button>
                  </div>
                  <p className="text-luxury-gold text-sm mb-1">{emp.role_en}</p>
                  <p className="text-luxury-cream/50 text-xs">{emp.email}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {emp.specialties.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === "calendar" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-lg font-semibold text-luxury-cream mb-4">Appointment Calendar</h2>
            <div className="glass-card p-4 mb-4">
              <p className="text-luxury-cream/60 text-sm mb-2">Daily Schedule (2 slots, 4 hours each):</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-luxury-gold/10 border border-luxury-gold/20">
                  <p className="text-luxury-gold font-semibold">Slot 1</p>
                  <p className="text-luxury-cream text-sm">10:00 AM - 2:00 PM</p>
                </div>
                <div className="p-3 rounded-lg bg-luxury-gold/10 border border-luxury-gold/20">
                  <p className="text-luxury-gold font-semibold">Slot 2</p>
                  <p className="text-luxury-cream text-sm">3:00 PM - 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(
                appointments
                  .filter((a) => a.status !== "cancelled")
                  .reduce<Record<string, Appointment[]>>((acc, apt) => {
                    if (!acc[apt.appointment_date]) acc[apt.appointment_date] = [];
                    acc[apt.appointment_date].push(apt);
                    return acc;
                  }, {})
              )
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([date, dayApts]) => (
                  <div key={date} className="glass-card p-5">
                    <h3 className="font-semibold text-luxury-gold mb-3">{date}</h3>
                    <div className="space-y-2">
                      {dayApts.map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-luxury-black/30">
                          <div>
                            <p className="text-luxury-cream text-sm font-medium">{apt.start_time} - {apt.end_time}</p>
                            <p className="text-luxury-cream/60 text-xs">{apt.customer_name} &bull; {apt.service_name} &bull; {apt.employee_name}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[apt.status]}`}>{apt.status}</span>
                        </div>
                      ))}
                      {dayApts.length < 2 && (
                        <p className="text-luxury-cream/30 text-xs text-center py-2">
                          {2 - dayApts.length} slot(s) available
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
