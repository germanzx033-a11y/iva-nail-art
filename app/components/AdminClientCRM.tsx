"use client";

import { useState, useEffect } from "react";
import {
  Users,
  MessageCircle,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Droplets,
  Crown,
  Sparkles,
  Check,
} from "lucide-react";

export interface ClientProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  preferredShape: "Almond" | "Coffin" | "Square" | "Oval" | "Stiletto";
  service: string;
  lastApptDate: string; // YYYY-MM-DD
  notes: string;
  totalVisits: number;
}

const STORAGE_KEY = "iva_admin_clients_v1";

// Helper to calculate date string for N days ago
function daysAgoDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
}

const DEFAULT_CLIENTS: ClientProfile[] = [
  {
    id: "c1",
    name: "Camila Ramos",
    phone: "9295550182",
    email: "camila@example.com",
    preferredShape: "Almond",
    service: "Builder Gel Manicure (BIAB)",
    lastApptDate: daysAgoDate(22), // 22 days ago -> Due this week!
    notes: "Sensitive cuticles, loves glazed donut chrome and neutral sheer tones.",
    totalVisits: 4,
  },
  {
    id: "c2",
    name: "Sarah Miller",
    phone: "9175550144",
    email: "sarah.m@example.com",
    preferredShape: "Almond",
    service: "Bridal Nail Ritual",
    lastApptDate: daysAgoDate(28), // 28 days ago -> Overdue!
    notes: "Wedding set was stunning! Mentioned she wants a shorter refill for honeymoon.",
    totalVisits: 3,
  },
  {
    id: "c3",
    name: "Jessica Torres",
    phone: "9295550123",
    email: "jess.t@example.com",
    preferredShape: "Coffin",
    service: "Set Completo de Acrílico",
    lastApptDate: daysAgoDate(18), // 18 days ago -> Approaching window
    notes: "Prefers velvet cat-eye or dark emerald tones. Fast grower.",
    totalVisits: 5,
  },
  {
    id: "c4",
    name: "Emily Vance",
    phone: "7185550199",
    email: "emily.v@example.com",
    preferredShape: "Square",
    service: "Russian Dry Manicure",
    lastApptDate: daysAgoDate(6), // 6 days ago -> Fresh set
    notes: "Natural short nails, delicate micro-French lines.",
    totalVisits: 2,
  },
];

export default function AdminClientCRM() {
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [filter, setFilter] = useState<"all" | "due" | "overdue" | "recent">("all");
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientProfile | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formShape, setFormShape] = useState<ClientProfile["preferredShape"]>("Almond");
  const [formService, setFormService] = useState("Builder Gel Manicure (BIAB)");
  const [formDate, setFormDate] = useState(new Date().toISOString().split("T")[0]);
  const [formNotes, setFormNotes] = useState("");
  const [formVisits, setFormVisits] = useState(1);

  // Load clients from localStorage or initialize with defaults
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- initial browser-only client sync from localStorage
        setClients(JSON.parse(stored));
      } else {
        setClients(DEFAULT_CLIENTS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CLIENTS));
      }
    } catch {
      setClients(DEFAULT_CLIENTS);
    }
  }, []);

  const saveClients = (updated: ClientProfile[]) => {
    setClients(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage unavailable
    }
  };

  const [nowTimestamp] = useState(() => Date.now());

  const getDaysElapsed = (dateStr: string) => {
    const appt = new Date(dateStr).getTime();
    return Math.max(0, Math.floor((nowTimestamp - appt) / (1000 * 60 * 60 * 24)));
  };

  const getRefillStatus = (days: number) => {
    if (days >= 28) {
      return {
        label: `Refill Vencido (${days} días)`,
        labelEn: `Overdue Refill (${days}d)`,
        badge: "bg-rose-100 text-rose-800 border-rose-300",
        urgency: "high",
        due: true,
      };
    }
    if (days >= 21) {
      return {
        label: `¡Refill Esta Semana! (${days} días)`,
        labelEn: `Due This Week (${days}d)`,
        badge: "bg-amber-100 text-amber-900 border-amber-300 animate-pulse",
        urgency: "medium",
        due: true,
      };
    }
    if (days >= 15) {
      return {
        label: `Aproximándose (${days} días)`,
        labelEn: `Approaching (${days}d)`,
        badge: "bg-blue-50 text-blue-800 border-blue-200",
        urgency: "low",
        due: false,
      };
    }
    return {
      label: `Set Fresco (Día ${days})`,
      labelEn: `Fresh Set (Day ${days})`,
      badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
      urgency: "none",
      due: false,
    };
  };

  const handleOpenAdd = () => {
    setEditingClient(null);
    setFormName("");
    setFormPhone("");
    setFormShape("Almond");
    setFormService("Builder Gel Manicure (BIAB)");
    setFormDate(new Date().toISOString().split("T")[0]);
    setFormNotes("");
    setFormVisits(1);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (c: ClientProfile) => {
    setEditingClient(c);
    setFormName(c.name);
    setFormPhone(c.phone);
    setFormShape(c.preferredShape);
    setFormService(c.service);
    setFormDate(c.lastApptDate);
    setFormNotes(c.notes);
    setFormVisits(c.totalVisits);
    setIsAddModalOpen(true);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingClient) {
      const updated = clients.map((c) =>
        c.id === editingClient.id
          ? {
              ...c,
              name: formName.trim(),
              phone: formPhone.trim(),
              preferredShape: formShape,
              service: formService,
              lastApptDate: formDate,
              notes: formNotes.trim(),
              totalVisits: Number(formVisits) || 1,
            }
          : c
      );
      saveClients(updated);
    } else {
      const newClient: ClientProfile = {
        id: `c_${Date.now()}`,
        name: formName.trim(),
        phone: formPhone.trim(),
        preferredShape: formShape,
        service: formService,
        lastApptDate: formDate,
        notes: formNotes.trim(),
        totalVisits: Number(formVisits) || 1,
      };
      saveClients([newClient, ...clients]);
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteClient = (id: string) => {
    if (confirm("¿Segura que deseas eliminar esta clienta del registro?")) {
      saveClients(clients.filter((c) => c.id !== id));
    }
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddVisit = (c: ClientProfile) => {
    const today = new Date().toISOString().split("T")[0];
    const newCount = (c.totalVisits || 1) + 1;
    const updated = clients.map((item) =>
      item.id === c.id
        ? { ...item, totalVisits: newCount, lastApptDate: today }
        : item
    );
    saveClients(updated);
    setToastMessage(`¡Visita #${newCount} y sello VIP registrado para ${c.name}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // WhatsApp Follow-Up Generator
  const sendWhatsAppRefill = (c: ClientProfile, days: number) => {
    const cleanPhone = c.phone.replace(/\D/g, "");
    const normalized = cleanPhone.length === 10 ? `1${cleanPhone}` : cleanPhone;
    const msg = `¡Hola ${c.name}! 🤍 Espero que estés teniendo una hermosa semana. Ya pasaron ${days} días desde tu último set de ${c.service} en IVA Nail Art. Para mantener tu builder gel nivelado y proteger la salud de tus uñas naturales antes de que se levanten, ¿te gustaría apartar tu cita de refill para esta semana? Aquí puedes ver mis cupos disponibles en Calendly: https://www.ivanailartny.com/es ✨`;
    window.open(`https://wa.me/${normalized}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const sendWhatsAppAftercare = (c: ClientProfile) => {
    const cleanPhone = c.phone.replace(/\D/g, "");
    const normalized = cleanPhone.length === 10 ? `1${cleanPhone}` : cleanPhone;
    const msg = `¡Hola ${c.name}! 🤍 Quería pasar a saludarte y ver cómo van sintiéndose tus uñas y cutículas desde tu cita en el estudio. Recuerda aplicar tu aceite de cutícula a diario para mantener la flexibilidad del gel: https://www.ivanailartny.com/es/aftercare ¡Cualquier duda aquí estoy! ✨`;
    window.open(`https://wa.me/${normalized}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const sendWhatsAppPortalInvitation = (c: ClientProfile) => {
    const cleanPhone = c.phone.replace(/\D/g, "");
    const normalized = cleanPhone.length === 10 ? `1${cleanPhone}` : cleanPhone;
    const portalUrl = `https://www.ivanailartny.com/es/portal?phone=${cleanPhone}`;
    const msg = `¡Hola ${c.name}! ✨ Ya está activo tu nuevo Portal VIP de IVA Nail Art. Desde tu celular puedes ver tus sellos acumulados, elegir tu forma de uña favorita y agendar tu refill en 1 toque. Ingresa aquí con tu teléfono y tu PIN (1234): ${portalUrl} 💅🤍`;
    window.open(`https://wa.me/${normalized}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Filtered clients
  const filteredClients = clients
    .filter((c) => {
      const days = getDaysElapsed(c.lastApptDate);
      if (filter === "due") return days >= 21 && days < 28;
      if (filter === "overdue") return days >= 28;
      if (filter === "recent") return days < 21;
      return true;
    })
    .filter((c) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.service.toLowerCase().includes(q) ||
        c.notes.toLowerCase().includes(q)
      );
    });

  const dueCount = clients.filter((c) => {
    const d = getDaysElapsed(c.lastApptDate);
    return d >= 21 && d < 28;
  }).length;

  const overdueCount = clients.filter((c) => {
    const d = getDaysElapsed(c.lastApptDate);
    return d >= 28;
  }).length;

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="bg-white p-6 rounded-2xl border border-[#EBE8E2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#722F37]" />
            <h2 className="font-serif text-2xl text-[#1A1A1A]">Sanctuary Client CRM &amp; Refills</h2>
          </div>
          <p className="text-xs text-[#7A7A7A] mt-1">
            Seguimiento de clientas, historial de formas y recordatorios automáticos de refill a las 3–4 semanas.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white px-4 py-2.5 text-xs font-semibold shadow-md hover:brightness-110 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Clienta</span>
        </button>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-medium flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[10px] text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded-full uppercase font-bold">
            Actualizado
          </span>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-[#EBE8E2]">
          <p className="text-[10px] uppercase font-semibold text-[#7A7A7A] tracking-wider">Total Registradas</p>
          <p className="font-serif text-2xl text-[#1A1A1A] mt-1">{clients.length}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl border border-amber-200">
          <p className="text-[10px] uppercase font-semibold text-amber-800 tracking-wider">Refills Esta Semana (21-27d)</p>
          <p className="font-serif text-2xl text-amber-700 mt-1">{dueCount}</p>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-white p-4 rounded-xl border border-rose-200">
          <p className="text-[10px] uppercase font-semibold text-rose-800 tracking-wider">Vencidas / Urgentes (28d+)</p>
          <p className="font-serif text-2xl text-rose-700 mt-1">{overdueCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#EBE8E2]">
          <p className="text-[10px] uppercase font-semibold text-[#7A7A7A] tracking-wider">Retención Estimada</p>
          <p className="font-serif text-2xl text-emerald-600 mt-1">94%</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#EBE8E2] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#7A7A7A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, teléfono o notas..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF9F7] border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] text-[#1A1A1A]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: `Todas (${clients.length})` },
            { id: "due", label: `Esta Semana (${dueCount})` },
            { id: "overdue", label: `Vencidas (${overdueCount})` },
            { id: "recent", label: "Recientes" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                filter === tab.id
                  ? "bg-[#722F37] text-white shadow-sm"
                  : "bg-[#FAF9F7] text-[#7A7A7A] hover:text-[#1A1A1A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Client List */}
      <div className="space-y-3.5">
        {filteredClients.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#EBE8E2]">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-[#7A7A7A]">No se encontraron clientas con este filtro.</p>
          </div>
        ) : (
          filteredClients.map((client) => {
            const days = getDaysElapsed(client.lastApptDate);
            const status = getRefillStatus(days);

            return (
              <div
                key={client.id}
                className="bg-white rounded-2xl border border-[#EBE8E2] p-5 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg text-[#1A1A1A] font-medium">{client.name}</h3>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${status.badge}`}
                    >
                      {status.label}
                    </span>
                    <span className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                      Forma: {client.preferredShape}
                    </span>
                    <span className="text-[10px] text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      {client.totalVisits} visitas
                    </span>
                  </div>

                  <p className="text-xs text-[#7A7A7A] flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span><strong>Servicio:</strong> {client.service}</span>
                    <span><strong>Última cita:</strong> {client.lastApptDate}</span>
                    <span><strong>Teléfono:</strong> {client.phone}</span>
                  </p>

                  {client.notes && (
                    <p className="text-xs text-[#4A4A4A] bg-[#FAF9F7] p-2.5 rounded-xl border border-[#EBE8E2] font-light italic">
                      &quot;{client.notes}&quot;
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#EBE8E2]">
                  {/* +1 Visit & Stamp */}
                  <button
                    onClick={() => handleAddVisit(client)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold active:scale-95 transition-all shadow-sm"
                    title="Anotar visita hoy y sumar +1 sello VIP"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-700" />
                    <span>+1 Sello VIP</span>
                  </button>

                  {/* Refill / Aftercare WhatsApp */}
                  {days >= 15 ? (
                    <button
                      onClick={() => sendWhatsAppRefill(client, days)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:brightness-105 active:scale-95 transition-all shadow-sm"
                      title="Enviar recordatorio personalizado de refill por WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Recordar Refill</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => sendWhatsAppAftercare(client)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-medium hover:bg-blue-100 transition-all"
                      title="Enviar check-in de cuidados posteriores"
                    >
                      <Droplets className="w-3.5 h-3.5 text-blue-600" />
                      <span>Check-in Cuidados</span>
                    </button>
                  )}

                  {/* Send Portal VIP Access */}
                  <button
                    onClick={() => sendWhatsAppPortalInvitation(client)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-medium transition-all"
                    title="Enviar acceso a su Portal VIP por WhatsApp"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Portal VIP</span>
                  </button>

                  {/* Edit & Delete Mini-cluster */}
                  <div className="flex items-center gap-1 ml-auto">
                    <button
                      onClick={() => handleOpenEdit(client)}
                      className="p-1.5 rounded-lg border border-[#EBE8E2] text-gray-500 hover:text-[#1A1A1A] hover:bg-[#FAF9F7]"
                      title="Editar datos de clienta"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="p-1.5 rounded-lg border border-[#EBE8E2] text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                      title="Eliminar clienta"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#EBE8E2] animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#EBE8E2] mb-5">
              <h3 className="font-serif text-xl text-[#1A1A1A]">
                {editingClient ? "Editar Clienta" : "Agregar Nueva Clienta"}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7A7A] block mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Camila Ramos"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F7] border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] text-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7A7A] block mb-1">
                    Teléfono (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="e.g. 929-555-0182"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F7] border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7A7A] block mb-1">
                    Forma Preferida
                  </label>
                  <select
                    value={formShape}
                    onChange={(e) => setFormShape(e.target.value as ClientProfile["preferredShape"])}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F7] border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] text-[#1A1A1A]"
                  >
                    <option value="Almond">Almond</option>
                    <option value="Coffin">Coffin</option>
                    <option value="Square">Square</option>
                    <option value="Oval">Oval</option>
                    <option value="Stiletto">Stiletto</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7A7A] block mb-1">
                    Servicio Reciente
                  </label>
                  <input
                    type="text"
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    placeholder="e.g. Builder Gel Manicure"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F7] border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7A7A] block mb-1">
                    Fecha de Cita
                  </label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F7] border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7A7A] block mb-1">
                    Total de Visitas
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formVisits}
                    onChange={(e) => setFormVisits(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F7] border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7A7A] block mb-1">
                  Notas de Preferencias &amp; Cutículas
                </label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Cutículas sensibles, le encanta el efecto cromo glazed, prefiere café con leche de avena."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F7] border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] text-[#1A1A1A]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EBE8E2]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#7A7A7A] hover:text-[#1A1A1A]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#722F37] text-white text-xs font-semibold hover:bg-[#5A252C] transition-colors shadow-md"
                >
                  {editingClient ? "Actualizar Clienta" : "Guardar Clienta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
