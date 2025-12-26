"use client";

import { useState } from "react";
import { X, Calculator, Plus, Minus, Sparkles } from "lucide-react";
import { Service, SERVICES, CONFIG } from "../constants";

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "es";
}

interface SelectedService {
  service: Service;
  quantity: number;
}

export default function PriceCalculator({ isOpen, onClose, lang }: CalculatorProps) {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);

  const t = {
    en: {
      title: "Price Calculator",
      subtitle: "Estimate your total",
      addService: "Add Service",
      total: "Estimated Total",
      deposit: "Deposit Required",
      note: "Final price may vary based on complexity",
      clear: "Clear All",
      close: "Close",
    },
    es: {
      title: "Calculadora de Precios",
      subtitle: "Estima tu total",
      addService: "Agregar Servicio",
      total: "Total Estimado",
      deposit: "Depósito Requerido",
      note: "El precio final puede variar según la complejidad",
      clear: "Limpiar Todo",
      close: "Cerrar",
    },
  };

  const text = t[lang];

  const addService = (service: Service) => {
    const existing = selectedServices.find((s) => s.service.id === service.id);
    if (existing) {
      setSelectedServices(
        selectedServices.map((s) =>
          s.service.id === service.id ? { ...s, quantity: s.quantity + 1 } : s
        )
      );
    } else {
      setSelectedServices([...selectedServices, { service, quantity: 1 }]);
    }
  };

  const removeService = (serviceId: string) => {
    setSelectedServices(selectedServices.filter((s) => s.service.id !== serviceId));
  };

  const updateQuantity = (serviceId: string, delta: number) => {
    setSelectedServices(
      selectedServices
        .map((s) =>
          s.service.id === serviceId ? { ...s, quantity: Math.max(0, s.quantity + delta) } : s
        )
        .filter((s) => s.quantity > 0)
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((sum, { service, quantity }) => {
      const price = service.priceMax ? (service.price + service.priceMax) / 2 : service.price;
      return sum + price * quantity;
    }, 0);
  };

  if (!isOpen) return null;

  const total = calculateTotal();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-[#4A0404]/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#FDF8F6] w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#FDF8F6] z-10 px-6 py-4 border-b border-[#4A0404]/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl text-[#4A0404] flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                {text.title}
              </h2>
              <p className="text-sm text-[#4A0404]/60">{text.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#4A0404]/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#4A0404]/60" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh] px-6 py-6">
          {/* Add Services */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#4A0404] mb-3">{text.addService}</h3>
            <div className="grid grid-cols-2 gap-2">
              {SERVICES.slice(0, 8).map((service) => (
                <button
                  key={service.id}
                  onClick={() => addService(service)}
                  className="p-3 rounded-xl bg-white border border-[#4A0404]/10 hover:border-[#4A0404]/30 transition-all text-left"
                >
                  <div className="text-xs font-medium text-[#4A0404]">
                    {lang === "en" ? service.name : service.nameEs}
                  </div>
                  <div className="text-xs text-[#4A0404]/50 mt-1">
                    ${service.price}
                    {service.priceMax && `-$${service.priceMax}`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Services */}
          {selectedServices.length > 0 && (
            <div className="space-y-2">
              {selectedServices.map(({ service, quantity }) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#4A0404]/10"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#4A0404]">
                      {lang === "en" ? service.name : service.nameEs}
                    </div>
                    <div className="text-xs text-[#4A0404]/50">
                      ${service.price}
                      {service.priceMax && ` - $${service.priceMax}`} each
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(service.id, -1)}
                      className="p-1 rounded-full bg-[#4A0404]/10 hover:bg-[#4A0404]/20 transition-colors"
                    >
                      <Minus className="w-3 h-3 text-[#4A0404]" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-[#4A0404]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(service.id, 1)}
                      className="p-1 rounded-full bg-[#4A0404]/10 hover:bg-[#4A0404]/20 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-[#4A0404]" />
                    </button>
                    <button
                      onClick={() => removeService(service.id)}
                      className="ml-2 p-1 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedServices.length === 0 && (
            <div className="text-center py-12 text-[#4A0404]/40">
              <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select services to calculate total</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#FDF8F6] border-t border-[#4A0404]/10 px-6 py-4">
          {selectedServices.length > 0 && (
            <>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#4A0404]">{text.total}</span>
                  <span className="font-serif text-2xl text-[#4A0404]">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#4A0404]/60">{text.deposit}</span>
                  <span className="font-medium text-[#D4AF37]">${CONFIG.deposit}</span>
                </div>
              </div>
              <p className="text-xs text-[#4A0404]/40 mb-3">{text.note}</p>
            </>
          )}
          <div className="flex gap-3">
            {selectedServices.length > 0 && (
              <button
                onClick={() => setSelectedServices([])}
                className="flex-1 py-3 rounded-xl border border-[#4A0404]/20 text-[#4A0404] font-medium hover:bg-[#4A0404]/5 transition-colors"
              >
                {text.clear}
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-[#4A0404] text-white font-medium hover:bg-[#4A0404]/90 transition-colors"
            >
              {text.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
