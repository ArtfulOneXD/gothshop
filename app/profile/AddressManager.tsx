"use client";

import { useState } from "react";
import type { Address } from "@prisma/client";

type AddressManagerProps = {
  initialAddresses: Address[];
};

type AddressFormState = {
  id?: number;
  fullName: string;
  phone?: string | null;
  line1: string;
  line2?: string | null;
  city: string;
  state?: string | null;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

const emptyForm = (): AddressFormState => ({
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  isDefault: false,
});

export default function AddressManager({ initialAddresses }: AddressManagerProps) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [form, setForm] = useState<AddressFormState>(emptyForm());
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setForm(emptyForm());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const payload = {
      fullName: form.fullName.trim(),
      phone: form.phone?.trim() || "",
      line1: form.line1.trim(),
      line2: form.line2?.trim() || "",
      city: form.city.trim(),
      state: form.state?.trim() || "",
      postalCode: form.postalCode.trim(),
      country: form.country.trim(),
      isDefault: form.isDefault,
    };

    const url = form.id ? `/api/addresses/${form.id}` : "/api/addresses";
    const method = form.id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data?.error || "Unable to save address.");
      return;
    }

    const saved: Address = data.address;
    setAddresses((prev) => {
      const others = prev.filter((a) => a.id !== saved.id);
      return [saved, ...others].sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
    });

    setSuccess(form.id ? "Address updated." : "Address added.");
    resetForm();
  };

  const handleEdit = (addr: Address) => {
    setError(null);
    setSuccess(null);
    setForm({
      id: addr.id,
      fullName: addr.fullName,
      phone: addr.phone || "",
      line1: addr.line1,
      line2: addr.line2 || "",
      city: addr.city,
      state: addr.state || "",
      postalCode: addr.postalCode,
      country: addr.country,
      isDefault: addr.isDefault,
    });
  };

  const handleDelete = async (id: number) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    const res = await fetch(`/api/addresses/${id}`, { method: "DELETE" });
    const data = res.ok ? null : await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data?.error || "Unable to delete address.");
      return;
    }

    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setSuccess("Address removed.");
    if (form.id === id) {
      resetForm();
    }
  };

  const handleMakeDefault = (addr: Address) => {
    handleEdit({ ...addr, isDefault: true });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Add / Edit Shipping Address
        </h2>
        <form className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1 text-sm text-[var(--foreground)]">
            Full name
            <input
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-[var(--foreground)]">
            Phone
            <input
              value={form.phone ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-[var(--foreground)] md:col-span-2">
            Address line 1
            <input
              value={form.line1}
              onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))}
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-[var(--foreground)] md:col-span-2">
            Address line 2 (optional)
            <input
              value={form.line2 ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, line2: e.target.value }))}
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-[var(--foreground)]">
            City
            <input
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-[var(--foreground)]">
            State / Region
            <input
              value={form.state ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-[var(--foreground)]">
            Postal code
            <input
              value={form.postalCode}
              onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-[var(--foreground)]">
            Country
            <input
              value={form.country}
              onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              required
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-[var(--foreground)] md:col-span-2">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
              className="h-4 w-4 rounded border-[var(--border)] bg-[var(--panel-soft)] text-[var(--accent)] focus:ring-[var(--accent)]"
            />
            Set as default
          </label>

          {error ? <p className="text-sm text-red-400 md:col-span-2">{error}</p> : null}
          {success ? <p className="text-sm text-green-400 md:col-span-2">{success}</p> : null}

          <div className="flex gap-3 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8c0e1e] disabled:opacity-60"
            >
              {loading ? "Saving..." : form.id ? "Update address" : "Add address"}
            </button>
            {form.id ? (
              <button
                type="button"
                className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
                onClick={resetForm}
              >
                Cancel edit
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="space-y-3">
        {addresses.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No addresses added yet.</p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm text-[var(--foreground)]">
                  <p className="font-semibold">
                    {addr.fullName} {addr.isDefault ? "(Default)" : ""}
                  </p>
                  <p className="text-[var(--muted)]">{addr.line1}</p>
                  {addr.line2 ? <p className="text-[var(--muted)]">{addr.line2}</p> : null}
                  <p className="text-[var(--muted)]">
                    {addr.city}, {addr.state ? `${addr.state}, ` : ""}
                    {addr.postalCode}
                  </p>
                  <p className="text-[var(--muted)]">{addr.country}</p>
                  {addr.phone ? <p className="text-[var(--muted)]">Phone: {addr.phone}</p> : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  {!addr.isDefault ? (
                    <button
                      onClick={() => handleMakeDefault(addr)}
                      className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
                      disabled={loading}
                    >
                      Set default
                    </button>
                  ) : null}
                  <button
                    onClick={() => handleEdit(addr)}
                    className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] text-red-300"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
